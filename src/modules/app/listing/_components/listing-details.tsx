import { Box, Flex, Image, Text, Skeleton } from "@chakra-ui/react";
import {
  ChevronLeft,
  CircleQuestionMark,
  Tag,
  Dot,
  CircleArrowRight,
  Check,
  X,
} from "lucide-react";
import { Link } from "react-router";
import { Star } from "~/assets/images";
import { getStatusStyles, createImageErrorHandler, getImageSrcWithFallback } from "~/modules/util";
import swapitem from "~/assets/images/swap_item.png";
import user from "~/assets/images/user.png";
import { Button, Input } from "~/modules/shared";
import { useState } from "react";
import { useGetListingDetails } from "~/hooks/queries/listing/listing";
import { PATHS } from "~/modules/_constants/paths";

interface iListingDetails {
  listingId: string;
}

const ListingDetails: React.FC<iListingDetails> = ({ listingId }) => {
  const [imageError, setImageError] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);

  const { data: listingData, isLoading, isFetching } = useGetListingDetails({
    enabler: !!listingId,
    listingId,
  });

  if (isLoading || isFetching) {
    return (
      <Box p={6}>
        <Skeleton height="6" width="48" mb={6} />
        <Skeleton height="412px" width="586px" borderRadius="lg" mb={8} />
        <Skeleton height="20" width="full" mb={6} />
      </Box>
    );
  }

  if (!listingData) {
    return (
      <Box p={6} display="flex" alignItems="center" justifyContent="center" minH="400px">
        <Text color="#737373">No listing details found</Text>
      </Box>
    );
  }

  const firstMedia = listingData.media?.[0];
  const isVideo = firstMedia?.mediaType === "Video";
  const isDocument = firstMedia?.mediaType === "Document";
  const mediaUrl = firstMedia?.url || "";

  const { borderColor, bg, textColor } = getStatusStyles(
    listingData.reviewStage?.toLowerCase() || "pending"
  );

  const statusMap: Record<string, string> = {
    Pending: "Pending",
    Published: "Active",
    Negotiation: "Pending",
    Swapped: "Completed",
  };
  const status = statusMap[listingData.reviewStage] || listingData.reviewStage || "Pending";

  return (
    <Box>
      <Flex gap={1} alignItems="center" mb={6}>
        <ChevronLeft size={14} color="#737373" />
        <Text fontSize="xl" fontWeight="medium" color="#222222">
          {listingData.itemName || "Item Name"}
        </Text>
        <Text fontSize="xl" fontWeight="medium" color="#007AFF" ml="auto">
          {listingData.estimatedCurrency} {listingData.estimatedAmount || 0} Est.
        </Text>
      </Flex>
      <Box height={412} width={586} borderRadius="lg" overflow="hidden" mb={4}>
        {isVideo ? (
          <Box
            as="video"
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
            {...({ src: mediaUrl || swapitem, controls: true, muted: false } as any)}
          />
        ) : isDocument ? (
          <Flex
            w="100%"
            h="100%"
            alignItems="center"
            justifyContent="center"
            bg="#F4F4F4"
            border="1px solid #EAEAEA"
            borderRadius="lg"
          >
            <Text fontSize="sm" color="#737373">
              Document
            </Text>
          </Flex>
        ) : (
          <Image
            height={412}
            width={586}
            borderRadius="lg"
            src={getImageSrcWithFallback(mediaUrl, imageError || !mediaUrl, swapitem)}
            alt={listingData.itemName}
            onError={createImageErrorHandler(setImageError)}
          />
        )}
      </Box>
      <Box my={8} display="flex" gap={4} alignItems="center">
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
          {listingData.categoryName || "Category"}
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
          {status}
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
            Location
          </Text>
          <Text fontSize="14px" color="#737373">
            N/A
          </Text>
        </Box>
        <Box width="full">
          <Text fontSize="16px" color="#222222" fontWeight="500" mb="16px">
            Date Listed
          </Text>
          <Text fontSize="14px" color="#737373">
            N/A
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
      <Flex flexDirection="column" gap={6}>
        <Box width="full" mb={5}>
          <Text fontSize="16px" color="#222222" fontWeight="500" mb="16px">
            Admin note (Optional)
          </Text>
          <Input
            type="textarea"
            name="note"
            handleChange={() => console.log("Holla world!")}
            placeholder="Additional note"
            value="note"
          />
        </Box>
        {listingData.reviewStage === "Pending" && (
          <Box display="flex" alignItems="center" gap="24px" width="full">
            <Button rounded="2xl" bg="#222222" width="50%">
              <Check />
              <Text fontSize="14px" color="#ffffff" ml={2}>
                Approve
              </Text>
            </Button>
            <Button rounded="2xl" bg="#FFF0EF" width="50%">
              <X color="#E42222" size={16} />
              <Text fontSize="14px" color="#E42222">
                Reject
              </Text>
            </Button>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default ListingDetails;
