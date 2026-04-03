import { Box, Text, Image, Flex, Skeleton, Spinner } from "@chakra-ui/react";
import MomentAgo from "~/components/moment-ago";
import { getStatusStyles, createImageErrorHandler, getImageSrcWithFallback } from "~/modules/util";
import type { ListingItem } from "~/hooks/queries/listing/listing.type";
import swapitem from "~/assets/images/swap_item.png";
import { useGetListings } from "~/hooks/queries/listing/listing";
import { useState } from "react";

interface iList {
  item: ListingItem;
}

export const List: React.FC<iList> = ({ item }) => {
  const [imageError, setImageError] = useState(false);
  
  // Map reviewStage to status
  const statusMap: Record<string, string> = {
    Pending: "pending",
    Published: "active",
    Negotiation: "pending",
    Swapped: "completed",
  };
  const status = statusMap[item.reviewStage] || item.reviewStage?.toLowerCase() || "pending";

  const { borderColor, bg, textColor } = getStatusStyles(status);

  // Get first media item
  const firstMedia = item.media?.[0];
  const mediaUrl = firstMedia?.url || swapitem;
  const isVideo = firstMedia?.mediaType === "Video";
  const isDocument = firstMedia?.mediaType === "Document";

  return (
    <Box
      borderRadius="12px"
      width="100%"
      py="12px"
      px="16px"
      border="1px solid #EAEAEA"
    >
      <Box display="flex" gap="24px" mb="16px">
        <Box h="100px" w="100px" borderRadius="8px" overflow="hidden" flexShrink={0}>
          {isVideo ? (
            <Box
              as="video"
              width="100%"
              height="100%"
              style={{ objectFit: "cover" }}
              {...({ src: mediaUrl, controls: false, muted: true } as any)}
            />
          ) : isDocument ? (
            <Box
              w="100%"
              h="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="#F4F4F4"
              border="1px solid #EAEAEA"
            >
              <Text fontSize="10px" color="#737373">
                Document
              </Text>
            </Box>
          ) : (
            <Image
              width="100%"
              height="100%"
              src={getImageSrcWithFallback(mediaUrl, imageError, swapitem)}
              borderRadius="8px"
              alt={item.itemName}
              onError={createImageErrorHandler(setImageError)}
            />
          )}
        </Box>
        <Box flex={1}>
          <Flex justifyContent="space-between" alignItems="flex-start" mb="8px">
            <Text fontSize="16px" color="#222222" fontWeight="500">
              {item.itemName}
            </Text>
            <Text fontSize="16px" color="#007AFF" fontWeight="600">
              {item.estimatedCurrency} {item.estimatedAmount}
            </Text>
          </Flex>
          <Box mb="8px" display="flex" gap={4} flexWrap="wrap">
            <Text
              fontSize="13px"
              color="#222222"
              border="1px solid #E9E9E9"
              p="7.5px 9px"
              borderRadius="37.74px"
            >
              {item.categoryName}
            </Text>
            <Text
              fontSize="13px"
              border="1px solid"
              p="7.5px 9px"
              borderColor={borderColor}
              bg={bg}
              color={textColor}
              borderRadius="37.74px"
            >
              {item.reviewStage}
            </Text>
            {item.itemCondition && (
              <Text
                fontSize="13px"
                color="#737373"
                border="1px solid #E9E9E9"
                p="7.5px 9px"
                borderRadius="37.74px"
              >
                {item.itemCondition}
              </Text>
            )}
          </Box>
          {item.itemDescription && (
            <Text fontSize="14px" color="#737373" mb="8px" >
              {item.itemDescription}
            </Text>
          )}
          {item.swapListRequest && item.swapListRequest.length > 0 && (
            <Box>
              <Text fontSize="12px" color="#737373" mb="4px">
                Requested in Exchange:
              </Text>
              <Flex gap={2} flexWrap="wrap">
                {item.swapListRequest.slice(0, 3).map((request: string, idx: number) => (
                  <Text
                    key={idx}
                    fontSize="12px"
                    color="#222222"
                    bg="#F7F7F7"
                    px="8px"
                    py="4px"
                    borderRadius="4px"
                  >
                    {request}
                  </Text>
                ))}
                {item.swapListRequest.length > 3 && (
                  <Text fontSize="12px" color="#737373" px="8px" py="4px">
                    +{item.swapListRequest.length - 3} more
                  </Text>
                )}
              </Flex>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

interface UserListingsProps {
  userId?: any;
}

const UserListings: React.FC<UserListingsProps> = ({ userId }) => {
  const { data: listingsData, isLoading } = useGetListings({
    enabler: !!userId,
    listingUserId: userId?.toString(),
    pageNumber: 1,
    pageSize: 20,
  });

  const listings = listingsData?.items || [];

  return (
    <Box>
      <Text color="#222222" fontWeight={500} mb={5} fontSize={"14px"}>
        Active Listing ({listings.length})
      </Text>
      {isLoading ? (
        <Box>
          {Array.from({ length: 3 }).map((_, idx) => (
            <Box key={idx} mb={4}>
              <Skeleton height="120px" borderRadius="12px" />
            </Box>
          ))}
        </Box>
      ) : listings.length > 0 ? (
        <Flex direction="column" gap={4}>
          {listings.map((item: ListingItem) => (
            <List key={item.listingId} item={item} />
          ))}
        </Flex>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minH="200px"
          color="#737373"
        >
          <Text fontSize="sm">No listings found</Text>
        </Box>
      )}
    </Box>
  );
};

export default UserListings;
