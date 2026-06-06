import { Box, Flex, Image, Text, Skeleton } from "@chakra-ui/react";
import { ListingMediaCarousel } from "./listing-media-carousel";
import { FlaggedBadge } from "./flagged-badge";
import {
  CircleQuestionMark,
  Tag,
  Dot,
  CircleArrowRight,
  Check,
  X,
} from "lucide-react";
import { Link } from "react-router";
import { Star } from "~/assets/images";
import {
  formatCurrency,
  getStatusStyles,
  createImageErrorHandler,
  getImageSrcWithFallback,
  isReviewPending,
} from "~/modules/util";
import user from "~/assets/images/user.png";
import { Button, EmptyState, ErrorState } from "~/modules/shared";
import { useState } from "react";
import { useGetListingDetails } from "~/hooks/queries/listing/listing";
import { PATHS } from "~/modules/_constants/paths";
import type { ListingReviewSummary } from "./listing-review-confirm";

interface iListingDetails {
  listingId: string;
  onClose?: () => void;
  onReviewAction?: (
    mode: "approve" | "reject",
    summary?: ListingReviewSummary
  ) => void;
}

const MODAL_PADDING = { pt: 8, px: 6, pb: 8 };

const CloseButton: React.FC<{ onClose?: () => void }> = ({ onClose }) => (
  <Flex justify="flex-end" mb={6}>
    <Box
      as="button"
      aria-label="Close listing details"
      onClick={onClose}
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="36px"
      h="36px"
      borderRadius="full"
      border="1px solid #EAEAEA"
      cursor="pointer"
      bg="white"
      _hover={{ bg: "#F7F7F7" }}
    >
      <X size={18} color="#222222" />
    </Box>
  </Flex>
);

const ListingDetails: React.FC<iListingDetails> = ({
  listingId,
  onClose,
  onReviewAction,
}) => {
  const [profileImageError, setProfileImageError] = useState(false);

  const {
    data: listingData,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetListingDetails({
    enabler: !!listingId,
    listingId,
  });

  if (isLoading || isFetching) {
    return (
      <Box {...MODAL_PADDING}>
        <CloseButton onClose={onClose} />
        <Skeleton
          height="412px"
          width="full"
          maxW="586px"
          borderRadius="lg"
          mb={6}
          border="1px solid #EAEAEA"
        />
        <Skeleton height="8" width="48" mb={4} />
        <Skeleton height="6" width="32" />
      </Box>
    );
  }

  if (isError) {
    return (
      <ErrorState
        minH="400px"
        title="Could not load listing"
        error={error}
        onRetry={() => refetch()}
      />
    );
  }

  if (!listingData) {
    return (
      <EmptyState
        minH="400px"
        title="Listing not found"
        description="This listing may have been removed or is no longer available."
      />
    );
  }

  const { borderColor, bg, textColor } = getStatusStyles(
    listingData.reviewStage?.toLowerCase() || "pending"
  );

  const reviewSummary: ListingReviewSummary = {
    listingId: listingData.listingId,
    itemName: listingData.itemName,
    categoryName: listingData.categoryName,
    listType: listingData.listType,
    estimatedAmount: listingData.estimatedAmount,
    estimatedCurrency: listingData.estimatedCurrency,
    owner: listingData.fullName || listingData.username,
    isFlagged: listingData.isFlagged ?? false,
  };

  return (
    <Box {...MODAL_PADDING}>
      <CloseButton onClose={onClose} />
      <ListingMediaCarousel
        media={listingData.media ?? []}
        itemName={listingData.itemName}
      />
      <Flex
        justify="space-between"
        align="flex-start"
        gap={4}
        mb={6}
        flexWrap="wrap"
      >
        <Flex align="center" gap={2} flexWrap="wrap">
          <Text fontSize="xl" fontWeight="medium" color="#222222">
            {listingData.itemName || "Item Name"}
          </Text>
          {listingData.isFlagged && <FlaggedBadge />}
        </Flex>
        <Text
          fontSize="xl"
          fontWeight="medium"
          color="#007AFF"
          whiteSpace="nowrap"
        >
          {formatCurrency(
            listingData.estimatedAmount,
            listingData.estimatedCurrency
          )}{" "}
          Est.
        </Text>
      </Flex>
      <Box my={8} display="flex" gap={4} alignItems="center" flexWrap="wrap">
        <Tag size={16} />
        <Text
          textAlign="center"
          fontWeight={500}
          fontSize={"13px"}
          border={"1px solid #E9E9E9"}
          color={"#222222"}
          py="5px"
          px="17px"
          borderRadius="37.74px"
        >
          {listingData.categoryName || "N/A"}
        </Text>
        <Text
          textAlign="center"
          fontWeight={500}
          fontSize={"13px"}
          border={"1px solid #E9E9E9"}
          color={"#222222"}
          py="5px"
          px="17px"
          borderRadius="37.74px"
        >
          {listingData.listType || "N/A"}
        </Text>
        <Text
          textAlign="center"
          fontWeight={500}
          fontSize={"13px"}
          borderColor={borderColor}
          border="1px solid"
          bg={bg}
          color={textColor}
          py="5px"
          px="17px"
          borderRadius="37.74px"
        >
          {listingData.reviewStage || "N/A"}
        </Text>
      </Box>
      <Text fontSize="16px" color="#222222" fontWeight="500" mb="16px">
        Description
      </Text>
      <Text fontSize="14px" color="#737373" mb={6}>
        {listingData.itemDescription || "No description available"}
      </Text>
      <Flex
        border="1px solid #E9E9E9"
        py="22px"
        px="45px"
        borderRadius={3}
        mb={6}
      >
        <Box width="full">
          <Text fontSize="16px" color="#222222" fontWeight="500" mb="16px">
            Condition
          </Text>
          <Text fontSize="14px" color="#737373">
            {listingData.itemCondition || "N/A"}
          </Text>
        </Box>
        <Box width="full">
          <Text fontSize="16px" color="#222222" fontWeight="500" mb="16px">
            Category
          </Text>
          <Text fontSize="14px" color="#737373">
            {listingData.categoryName || "N/A"}
          </Text>
        </Box>
        <Box width="full">
          <Text fontSize="16px" color="#222222" fontWeight="500" mb="16px">
            List Type
          </Text>
          <Text fontSize="14px" color="#737373">
            {listingData.listType || "N/A"}
          </Text>
        </Box>
      </Flex>
      <Box bg="#F7F7F7" p={2} mb={6}>
        <Text fontSize="13px" fontWeight="500" mb={3}>
          Requested in Exchange
        </Text>
        <Flex gap={4} flexDirection="column">
          {listingData.swapListRequest && listingData.swapListRequest.length > 0 ? (
            listingData.swapListRequest.map((item: string, index: number) => (
              <Text
                color="#737373"
                fontSize="12px"
                key={index}
                display="flex"
                alignItems="center"
                gap={2}
              >
                <CircleQuestionMark size={14} color="#222222" />
                {item}
              </Text>
            ))
          ) : (
            <Text color="#737373" fontSize="12px">
              No items requested
            </Text>
          )}
        </Flex>
      </Box>
      <Text fontSize="16px" color="#222222" fontWeight="500" mb="16px">
        Owner
      </Text>

      <Flex
        border="1px solid #E9E9E9"
        py="21px"
        px="12px"
        borderRadius={"lg"}
        mb={6}
        alignItems="center"
        gap={4}
      >
        <Box
          w="fit-content"
          display="flex"
          height="62px"
          width="62px"
          borderRadius="full"
          overflow="hidden"
        >
          <Image
            src={getImageSrcWithFallback(
              listingData.profilePicture || "",
              profileImageError || !listingData.profilePicture,
              user
            )}
            alt="Owner Avatar"
            borderRadius="full"
            height="100%"
            width="100%"
            onError={createImageErrorHandler(setProfileImageError)}
          />
        </Box>
        <Box width="full">
          <Text fontSize="16px" color="#222222" fontWeight="500" mb="12px">
            {listingData.fullName || listingData.username || "Unknown User"}
          </Text>
          <Text
            fontSize="14px"
            color="#737373"
            display="flex"
            alignItems="center"
            gap={2}
          >
            {listingData.rating || 0} <Star /> <Dot size={"4px"} />
            {listingData.swapCount || 0} swaps
          </Text>
        </Box>
        <Link to={`${PATHS.PROFILE}/${listingData.userId || ""}`}>
          <Text
            w="fit-content"
            textAlign="center"
            fontWeight={500}
            fontSize={"13px"}
            border={"1px solid #E9E9E9"}
            color={"#222222"}
            py="5px"
            px="17px"
            borderRadius="37.74px"
            display="flex"
            alignItems="center"
            gap={2}
            whiteSpace="nowrap"
          >
            View Profile
            <CircleArrowRight size={24} color="#ffffff" fill="#222222" />
          </Text>
        </Link>
      </Flex>
      {isReviewPending(listingData.reviewStage) && onReviewAction && (
        <Flex alignItems="center" gap="24px" width="full">
          <Button
            rounded="2xl"
            bg="#222222"
            width="50%"
            handleClick={() => onReviewAction("approve", reviewSummary)}
          >
            <Check />
            <Text fontSize="14px" color="#ffffff" ml={2}>
              Approve
            </Text>
          </Button>
          <Button
            rounded="2xl"
            bg="#FFF0EF"
            width="50%"
            handleClick={() => onReviewAction("reject", reviewSummary)}
          >
            <X color="#E42222" size={16} />
            <Text fontSize="14px" color="#E42222">
              Reject
            </Text>
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default ListingDetails;
