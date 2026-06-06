import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { BadgeInfo, Flag, UserRound, X } from "lucide-react";
import { Approve } from "~/assets/images";
import { Dialog, Menu, MenuItem } from "~/modules/shared";
import {
  getStatusStyles,
  createImageErrorHandler,
  getImageSrcWithFallback,
  isReviewApproved,
  isReviewPending,
} from "~/modules/util";
import type { SwapDetailsProps } from "~/types/base";
import swapitem from "~/assets/images/swap_item.png";
import user from "~/assets/images/user.png";
import ListingDetails from "./listing-details";
import { FlaggedBadge } from "./flagged-badge";
import {
  ListingReviewConfirm,
  type ListingActionMode,
  type ListingReviewSummary,
} from "./listing-review-confirm";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

interface iList {
  item: SwapDetailsProps;
}

const List: React.FC<iList> = ({ item }) => {
  const navigate = useNavigate();
  const [openSwapDetails, setOpenSwapDetails] = useState<boolean>(false);
  const [imageError, setImageError] = useState(false);
  const [ownerImageError, setOwnerImageError] = useState(false);
  const [reviewMode, setReviewMode] = useState<ListingActionMode | null>(null);
  const [reviewListing, setReviewListing] =
    useState<ListingReviewSummary | null>(null);

  const onOpenChange = () => {
    setOpenSwapDetails((prev) => !prev);
  };

  const handleViewOwnerProfile = () => {
    if (item.ownerId) {
      navigate(`/profile/${item.ownerId}`);
    }
  };

  const reviewStyles = getStatusStyles(
    item.reviewStage?.toLowerCase() || "pending"
  );

  const defaultReviewSummary: ListingReviewSummary = {
    listingId: item.listingId || "",
    itemName: item.name,
    categoryName: item.category,
    listType: item.listType,
    estimatedAmount: Number(item.price) || 0,
    estimatedCurrency: item.estimatedCurrency,
    owner: item.owner,
    isFlagged: item.isFlagged ?? false,
  };

  const openAction = (
    mode: ListingActionMode,
    summary?: ListingReviewSummary
  ) => {
    setReviewListing(summary ?? defaultReviewSummary);
    setReviewMode(mode);
  };

  const MENULIST = useMemo(() => {
    const items = [
      {
        label: "Swap Details",
        icon: <BadgeInfo size={20} />,
        onClick: () => onOpenChange(),
        value: "details",
        style: { color: "#007AFF" },
      },
      {
        label: "View Owner's profile",
        icon: <UserRound size={20} />,
        onClick: () => handleViewOwnerProfile(),
        value: "view",
        style: { color: "#222222" },
      },
    ];

    if (isReviewApproved(item.reviewStage)) {
      items.push({
        label: item.isFlagged ? "Unflag Listing" : "Flag Listing",
        icon: <Flag size={20} />,
        onClick: () => openAction("flag"),
        value: "flag",
        style: { color: "#E42222" },
      });
    }

    return items;
  }, [item]);

  return (
    <Box
      borderRadius="12px"
      width="100%"
      py="12px"
      px="16px"
      border="1px solid #EAEAEA"
    >
      <Box display="flex" gap="24px">
        <Box
          h="100px"
          w="100px"
          position="relative"
          borderRadius="8px"
          overflow="hidden"
          flexShrink={0}
        >
          {item.isVideo ? (
            <Box
              as="video"
              width="100%"
              height="100%"
              style={{ objectFit: "cover" }}
              {...({
                src: item.itemUrl || swapitem,
                controls: false,
                muted: true,
              } as any)}
            />
          ) : item.mediaType === "Document" ? (
            <Box
              width="100%"
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="#F4F4F4"
              borderRadius="8px"
              border="1px solid #EAEAEA"
            >
              <Text fontSize="10px" color="#737373" textAlign="center" px={2}>
                Document
              </Text>
            </Box>
          ) : (
            <Image
              width="100%"
              height="100%"
              src={getImageSrcWithFallback(
                item.itemUrl || "",
                imageError || !item.itemUrl,
                swapitem
              )}
              borderRadius="8px"
              alt={item.name}
              onError={createImageErrorHandler(setImageError)}
            />
          )}
        </Box>
        <Box flex={1}>
          <Flex align="center" gap={2} flexWrap="wrap" mb="8px">
            <Text fontSize="16px" color="#222222" fontWeight="500">
              {item.name}
            </Text>
            {item.isFlagged && <FlaggedBadge />}
          </Flex>
          <Box display="flex" alignItems="center" gap="12px" mb="8px">
              <Box
                h="32px"
                w="32px"
                borderRadius={"full"}
                bg="#CCC1F0"
                overflow="hidden"
              >
                <Image
                  width="100%"
                  height="100%"
                  src={getImageSrcWithFallback(
                    item.ownerAvatar || "",
                    ownerImageError || !item.ownerAvatar,
                    user
                  )}
                  alt={item.owner}
                  onError={createImageErrorHandler(setOwnerImageError)}
                />
              </Box>
              <Text fontSize="14px" color="#737373" fontWeight={500}>
                {item.owner}
              </Text>
            </Box>
          <Box display="flex" gap="12px" flexWrap="wrap">
            <Text
              fontSize="13px"
              color="#222222"
              border="1px solid #E9E9E9"
              p="7.5px 9px"
              borderRadius="37.74px"
            >
              {item.category}
            </Text>
            <Text
            fontSize="13px"
            fontWeight={500}
            border="1px solid"
            borderColor={reviewStyles.borderColor}
            bg={reviewStyles.bg}
            color={reviewStyles.textColor}
            py="5px"
            px="17px"
            borderRadius="37.74px"
            w="fit-content"
          >
            {item.reviewStage || "N/A"}
          </Text>
          </Box>
       
        </Box>
        <Box ml="auto" alignSelf="flex-start">
          <Menu>
            <Box>
              {MENULIST.map((menuItem) => (
                <MenuItem
                  key={menuItem.value}
                  icon={menuItem.icon}
                  onClick={menuItem.onClick}
                  value={menuItem.value}
                  label={menuItem.label}
                  styleProps={menuItem.style}
                />
              ))}
            </Box>
          </Menu>
        </Box>
      </Box>

      {isReviewPending(item.reviewStage) && (
        <Box
          width="100%"
          borderTop="1px solid #EAEAEA"
          p="20px"
          mt="10px"
          display="flex"
          alignItems="center"
          gap="38px"
        >
          <Box
            as="button"
            display="flex"
            alignItems="center"
            gap="16px"
            cursor="pointer"
            bg="transparent"
            border="none"
            onClick={() => openAction("approve")}
          >
            <Approve />
            <Text fontSize="14px" color="#68CC58">
              Approve
            </Text>
          </Box>
          <Box
            as="button"
            display="flex"
            alignItems="center"
            gap="16px"
            cursor="pointer"
            bg="transparent"
            border="none"
            onClick={() => openAction("reject")}
          >
            <X color="#E42222" size={16} />
            <Text fontSize="14px" color="#E42222">
              Reject
            </Text>
          </Box>
        </Box>
      )}

      <Dialog
        open={openSwapDetails}
        onOpenChange={onOpenChange}
        size="lg"
        style={{
          right: 0,
          left: "auto",
          top: 0,
          bottom: 0,
          position: "fixed",
          height: "100vh",
          margin: 0,
          display: "flex",
          alignItems: "stretch",
          justifyContent: "flex-end",
        }}
      >
        <ListingDetails
          listingId={item.listingId || ""}
          onClose={onOpenChange}
          onReviewAction={(mode, summary) => {
            setOpenSwapDetails(false);
            openAction(mode, summary);
          }}
        />
      </Dialog>

      <ListingReviewConfirm
        open={!!reviewMode}
        mode={reviewMode}
        listing={reviewListing}
        onClose={() => {
          setReviewMode(null);
          setReviewListing(null);
        }}
      />
    </Box>
  );
};

export default List;
