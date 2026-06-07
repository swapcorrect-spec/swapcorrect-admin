import { Box, Image, Text, Flex } from "@chakra-ui/react";
import { CircleArrowRight, Dot } from "lucide-react";
import { Link } from "react-router-dom";
import { PATHS } from "~/modules/_constants/paths";
import { Star } from "~/assets/images";
import user from "~/assets/images/user.png";
import { createImageErrorHandler, getImageSrcWithFallback } from "~/modules/util";
import type { SwapDetailsProps } from "~/types/base";
import { useState } from "react";

interface iSwapDetails {
  detail: SwapDetailsProps;
  showStats?: boolean;
}

const ProfileInfo: React.FC<iSwapDetails> = ({ detail, showStats = true }) => {
  const [imageError, setImageError] = useState(false);
  const missingAvatar = !detail.ownerAvatar?.trim();

  return (
    <Flex
      border="1px solid #E9E9E9"
      py="21px"
      px="12px"
      borderRadius={"lg"}
      mb={4}
      alignItems="center"
      gap={4}
      bg="#fff"
    >
      <Box display="flex" borderRadius="full" overflow="hidden">
        <Image
          src={getImageSrcWithFallback(
            detail.ownerAvatar,
            imageError || missingAvatar,
            user
          )}
          alt={`${detail.owner || "User"} avatar`}
          borderRadius="full"
          height="100%"
          width="100%"
          onError={createImageErrorHandler(setImageError)}
        />
      </Box>
      <Box width="full">
        <Text
          fontSize="16px"
          color="#222222"
          fontWeight="500"
          mb={showStats ? "12px" : 0}
        >
          {detail.owner}
        </Text>
        {showStats && (
          <Text
            fontSize="14px"
            color="#737373"
            display="flex"
            alignItems="center"
            gap={2}
          >
            {detail.rating} <Star /> <Dot size={"4px"} />
            {detail.swap.total} swaps
          </Text>
        )}
      </Box>
      <Link
        to={detail.ownerId ? `${PATHS.PROFILE}/${detail.ownerId}` : "#"}
        style={{
          pointerEvents: detail.ownerId ? "auto" : "none",
          opacity: detail.ownerId ? 1 : 0.5,
        }}
      >
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
  );
};

export default ProfileInfo;
