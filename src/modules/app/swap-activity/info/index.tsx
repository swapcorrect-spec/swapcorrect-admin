import { Box, Text, Flex } from "@chakra-ui/react";
import { useState } from "react";
import PageLayout from "~/modules/layout/page-layout";
import { Button, PageHeaderWithBack, QueryState } from "~/modules/shared";
import ProfileInfo from "~/modules/shared/widgets/profile_info";
import { ArrowLeft, ArrowRight, Flag } from "lucide-react";
import { formatDateTime, getSwapStatusStyles } from "~/modules/util";
import { useParams } from "react-router";
import { useGetSwapProceeding } from "~/hooks/queries/swap-activity/swap-activity";
import type { SwapDetailsProps } from "~/types/base";
import { FlaggedBadge } from "~/modules/app/listing/_components/flagged-badge";
import {
  SwapFlagConfirm,
  type SwapFlagSummary,
} from "../_components/swap-flag-confirm";

const emptyProfileDetail = (): SwapDetailsProps => ({
  listingId: "",
  name: "",
  condition: "",
  price: 0,
  itemUrl: "",
  category: "",
  status: "",
  description: "",
  location: "",
  dateListed: "",
  datePosted: "",
  edited: "",
  requestedInExchange: [],
  owner: "",
  ownerAvatar: "",
  rating: "—",
  swap: { total: "—" },
});

const toProfileDetail = (
  name: string,
  avatar: string | null | undefined,
  userId: string
): SwapDetailsProps => ({
  ...emptyProfileDetail(),
  owner: name || "—",
  ownerAvatar: avatar || "",
  ownerId: userId,
});

const normalizeItems = (
  value: string | string[] | null | undefined,
): string[] => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (!value) return [];
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const ItemCard = ({ label, items }: { label: string; items: string[] }) => (
  <Box border="1px solid #E9E9E9" p={2.5} borderRadius="lg" bg="#fff">
    <Text fontWeight={500} mb={2.5}>
      {label}
    </Text>
    <Text fontWeight={500} color="#222222">
      {items.length > 0 ? items.join(", ") : "—"}
    </Text>
  </Box>
);

const ParticipantBlock = ({
  roleLabel,
  profileDetail,
  itemLabel,
  items,
}: {
  roleLabel: string;
  profileDetail: SwapDetailsProps;
  itemLabel: string;
  items: string[];
}) => (
  <Box
    bg="#F7F7F7"
    w="100%"
    p={2}
    border="1px solid #E9E9E9"
    borderRadius="md"
  >
    <Text fontWeight={500} mb={3}>
      {roleLabel}
    </Text>
    <ProfileInfo detail={profileDetail} showStats={false} />
    <ItemCard label={itemLabel} items={items} />
  </Box>
);

export const SwapActivityInfo = () => {
  const { swapId: swapProceedId } = useParams<{ swapId: string }>();
  const [flagOpen, setFlagOpen] = useState(false);
  const [selectedSwap, setSelectedSwap] = useState<SwapFlagSummary | null>(null);
  const {
    data: swap,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetSwapProceeding({
    swapProceedId: swapProceedId || "",
    enabler: !!swapProceedId,
  });

  const { borderColor, bg, textColor } = getSwapStatusStyles(swap?.status);

  const swapperProfile = swap
    ? toProfileDetail(swap.swapperName, swap.swapperImage, swap.swapperUserId)
    : emptyProfileDetail();

  const visitorProfile = swap
    ? toProfileDetail(swap.visitorName, swap.visitorImage, swap.visitorUserId)
    : emptyProfileDetail();

  const listedItems = normalizeItems(swap?.listedItem);
  const requestItems = normalizeItems(swap?.swapperRequestItem);

  const openFlag = () => {
    if (!swap) return;

    setSelectedSwap({
      swapProceedId: swap.swapProceedId,
      ownerName: swap.visitorName,
      swapperName: swap.swapperName,
      ownerItem: listedItems.join(", ") || "N/A",
      swapperItem: requestItems.join(", ") || "N/A",
      status: swap.status,
      isFlagged: swap.isFlagged ?? false,
    });
    setFlagOpen(true);
  };

  const closeFlag = () => {
    setFlagOpen(false);
    setSelectedSwap(null);
  };

  return (
    <PageLayout>
      <Flex
        justify="space-between"
        align="flex-start"
        gap={4}
        mb={6}
        flexWrap="wrap"
      >
        <PageHeaderWithBack
          title="Swap Details"
          description={
            swap ? `Initiated on ${formatDateTime(swap.createdOn)}` : undefined
          }
        />
        {swap && (
          <Button bg="#FFF0EF" width="fit-content" handleClick={openFlag}>
            <Flag color="#E42222" size={16} />
            <Text fontSize="14px" color="#E42222">
              {swap.isFlagged ? "Unflag Swap" : "Flag Swap"}
            </Text>
          </Button>
        )}
      </Flex>
      <QueryState
        isLoading={isLoading || isFetching}
        isError={isError}
        error={error}
        onRetry={() => refetch()}
        isEmpty={!isLoading && !isFetching && !isError && !swap}
        emptyProps={{
          title: "Swap not found",
          description: "This swap could not be loaded or no longer exists.",
        }}
        errorProps={{
          title: "Could not load swap details",
          description: "We had trouble fetching this swap. Please try again.",
        }}
      >
        {swap && (
          <>
            <Flex mt={2} alignItems="center" gap={10}>
              <ParticipantBlock
                roleLabel="Swapper"
                profileDetail={swapperProfile}
                itemLabel="Listed Item"
                items={listedItems}
              />
              <Box gap={4} display="flex" flexShrink={0}>
                <ArrowLeft size={40} color="#737373" />
                <ArrowRight size={40} color="#737373" />
              </Box>
              <ParticipantBlock
                roleLabel="Visitor"
                profileDetail={visitorProfile}
                itemLabel="Swapper Request Item(s)"
                items={requestItems}
              />
            </Flex>
            <Box
              border="1px solid #E9E9E9"
              p={2.5}
              borderRadius="lg"
              bg="#fff"
              my={8}
            >
              <Flex align="center" gap={2} mb={2.5} flexWrap="wrap">
                <Text fontWeight={500}>Swap Status</Text>
                {swap.isFlagged && <FlaggedBadge />}
              </Flex>
              <Text
                border="1px solid"
                borderColor={borderColor}
                bg={bg}
                color={textColor}
                py="5px"
                px="17px"
                borderRadius="37.74px"
                width="fit-content"
                mb={2.5}
                fontWeight={500}
                fontSize="13px"
              >
                {swap.status}
              </Text>
              <Box
                alignItems="center"
                justifyContent="space-between"
                display="flex"
                mb={2}
              >
                <Text fontWeight={500} fontSize="13px" color="#737373">
                  Initiated on:
                </Text>
                <Text fontWeight={500} fontSize="13px" color="#222222">
                  {formatDateTime(swap.createdOn)}
                </Text>
              </Box>
              <Box
                alignItems="center"
                justifyContent="space-between"
                display="flex"
              >
                <Text fontWeight={500} fontSize="13px" color="#737373">
                  Last Activity
                </Text>
                <Text fontWeight={500} fontSize="13px" color="#222222">
                  {formatDateTime(swap.lastActivity)}
                </Text>
              </Box>
            </Box>

            <SwapFlagConfirm
              open={flagOpen}
              swap={selectedSwap}
              onClose={closeFlag}
            />
          </>
        )}
      </QueryState>
    </PageLayout>
  );
};
