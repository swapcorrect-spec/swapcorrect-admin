import { Box, Text, Image, Flex } from "@chakra-ui/react";
import MomentAgo from "~/components/moment-ago";
import { getStatusStyles } from "~/modules/util";
import type { SwapDetailsProps } from "~/types/base";
import swapitem from "~/assets/images/swap_item.png";
import { mockListings } from "~/modules/_constants";

interface iList {
  item: SwapDetailsProps;
}

export const List: React.FC<iList> = ({ item }) => {
  const { borderColor, bg, textColor } = getStatusStyles(
    item.status?.toLowerCase()
  );

  return (
    <Box
      borderRadius="12px"
      width="100%"
      py="10px"
      px="10px"
      border="1px solid #EAEAEA"
    >
      <Box display="flex" gap="24px">
        <Box h="100px" w="100px">
          <Image width="100%" height="100%" src={swapitem} borderRadius="8px" />
        </Box>
        <Box>
          <Text fontSize="16px" color="#222222" fontWeight="500" mb="14px">
            {item.name}
          </Text>
          <Box mb="8px" display="flex" gap={4}>
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
              border="1px solid "
              p="7.5px 9px"
              borderColor={borderColor}
              bg={bg}
              color={textColor}
              borderRadius="37.74px"
            >
              {item.status}
            </Text>
          </Box>
          <Text fontSize="14px" color="#737373">
            <MomentAgo createdAt={item.dateListed} />
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

const UserListings = () => {
  return (
    <Box>
      <Text color="#222222" fontWeight={500} mb={5} fontSize={"14px"}>
        Active Listing
      </Text>
      <Flex direction="column" gap={4}>
        {mockListings.map((list: SwapDetailsProps, idx) => (
          <List key={idx} item={list} />
        ))}
      </Flex>
    </Box>
  );
};

export default UserListings;
