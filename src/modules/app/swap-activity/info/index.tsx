import { Box, Text, Flex, Image } from "@chakra-ui/react";
import PageLayout from "~/modules/layout/page-layout";
import { Button, PageHeaderWithBack, QueryState } from "~/modules/shared";
import ProfileInfo from "~/modules/shared/widgets/profile_info";
import swapitem from "~/assets/images/swap_item.png";
import { ArrowLeft, ArrowRight, Flag, X } from "lucide-react";
import { formatDateTime, getStatusStyles } from "~/modules/util";
import { useNavigate, useParams } from "react-router";
import { useGetSwapProceeding } from "~/hooks/queries/swap-activity/swap-activity";
import type { SwapDetailsProps } from "~/types/base";
import { PATHS } from "~/modules/_constants/paths";

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

const ItemCard = ({ label, itemName }: { label: string; itemName: string }) => (
  <Box
    border="1px solid #E9E9E9"
    p={2.5}
    borderRadius="lg"
    bg="#fff"
  >
    <Text fontWeight={500} mb={2.5}>
      {label}
    </Text>
    <Flex alignItems="center" gap={4}>
      <Box display="flex" height="61px" width="61px" borderRadius="md" overflow="hidden">
        <Image
          src={swapitem}
          alt={itemName}
          height="100%"
          width="100%"
          objectFit="cover"
        />
      </Box>
      <Text fontWeight={500} color="#222222">
        {itemName || "—"}
      </Text>
    </Flex>
  </Box>
);

const ParticipantBlock = ({
  roleLabel,
  profileDetail,
  itemLabel,
  itemName,
}: {
  roleLabel: string;
  profileDetail: SwapDetailsProps;
  itemLabel: string;
  itemName: string;
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
    <ProfileInfo detail={profileDetail} />
    <ItemCard label={itemLabel} itemName={itemName} />
  </Box>
);

export const SwapActivityInfo = () => {
  const navigate = useNavigate();
  const { swapId: swapProceedId } = useParams<{ swapId: string }>();
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

  const statusKey = swap?.status?.toLowerCase() || "pending";
  const { borderColor, bg, textColor } = getStatusStyles(statusKey);

  const swapperProfile = swap
    ? toProfileDetail(swap.swapperName, swap.swapperImage, swap.swapperUserId)
    : emptyProfileDetail();

  const visitorProfile = swap
    ? toProfileDetail(swap.visitorName, swap.visitorImage, swap.visitorUserId)
    : emptyProfileDetail();

  const listedItem =
    Array.isArray(swap?.listedItem)
      ? swap.listedItem.join(", ")
      : swap?.listedItem || "";

  const requestItems =
    Array.isArray(swap?.swapperRequestItem)
      ? swap.swapperRequestItem.join(", ")
      : swap?.swapperRequestItem || "";

  return (
    <PageLayout>
      <PageHeaderWithBack
        title="Swap Details"
        description={
          swap ? `Initiated on ${formatDateTime(swap.createdOn)}` : undefined
        }
      />
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
                itemName={listedItem}
              />
              <Box gap={4} display="flex" flexShrink={0}>
                <ArrowLeft size={40} color="#737373" />
                <ArrowRight size={40} color="#737373" />
              </Box>
              <ParticipantBlock
                roleLabel="Visitor"
                profileDetail={visitorProfile}
                itemLabel="Swapper Request Item(s)"
                itemName={requestItems}
              />
            </Flex>
            <Box
              border="1px solid #E9E9E9"
              p={2.5}
              borderRadius="lg"
              bg="#fff"
              my={8}
            >
              <Text fontWeight={500} mb={2.5}>
                Swap Status
              </Text>
              <Text
                borderColor={borderColor}
                bg={bg}
                color={textColor}
                py="5px"
                px="17px"
                borderRadius="37.74px"
                width="fit-content"
                mb={2.5}
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
            <Box display="flex" alignItems="center" gap={5} justifyContent="end">
              <Button
                bg="#F6F6F6"
                width="fit-content"
                handleClick={() => navigate(PATHS.SWAPACTIVITY)}
              >
                <X color="#1C274C" />
                <Text fontSize="14px" color="#737373">
                  Close
                </Text>
              </Button>
              <Button bg="#FFF0EF" width="fit-content">
                <Flag color="#E42222" size={16} />
                <Text fontSize="14px" color="#E42222">
                  Flag Users
                </Text>
              </Button>
            </Box>
          </>
        )}
      </QueryState>
    </PageLayout>
  );
};
