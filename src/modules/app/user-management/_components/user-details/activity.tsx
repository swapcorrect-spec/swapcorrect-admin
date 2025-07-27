import { Box, Text, Flex } from "@chakra-ui/react";
import { BoxIcon } from "lucide-react";

const UserActivity = () => {
  return (
    <Box>
      <Text color="#222222" fontWeight={500} mb={5} fontSize={"14px"}>
        Recent Activity
      </Text>
      <Flex gap={4} flexDirection="column">
        {Array.from({ length: 3 }).map((_: any, index) => (
          <Box
            key={index}
            display={"flex"}
            gap={4}
            bg="#F7F7F7"
            py={3}
            px={2.5}
            borderRadius={"lg"}
          >
            <BoxIcon color="#007AFF" size={16} />
            <Box mr="auto">
              <Text fontSize="13px" fontWeight="500" mb={2}>
                {_?.title || "Completed a swap"}
              </Text>
              <Text color="#737373" fontSize="12px">
                {_?.description || "Swapped item with Adebayo Johnson"}
              </Text>
            </Box>
            <Text color="#737373" fontSize="13px">
              Apr 30, 2025
            </Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default UserActivity;
