import { Box, Text, Flex } from "@chakra-ui/react";
import { Flag } from "lucide-react";
import { Button } from "~/modules/shared";

const UserReports = () => {
  return (
    <Box>
      <Text color="#222222" fontWeight={500} mb={5} fontSize={"14px"}>
        Reports & Flags
      </Text>
      <Flex gap={4} flexDirection="column">
        {Array.from({ length: 3 }).map((_: any, index) => (
          <Box bg="#FFF4F4" py={3} px={2.5} borderRadius={"lg"}>
            <Box
              key={index}
              display={"flex"}
              gap={3}
              alignItems={"center"}
              mb={2.5}
            >
              <Flag color="#E42222" size={20} />
              <Text fontSize="13px" fontWeight="500" mr="auto" color="#E42222">
                {_?.title || "Scam attempt"}
              </Text>
              <Text color="#737373" fontSize="13px">
                Apr 30, 2025
              </Text>
            </Box>
            <Text color="#737373" fontSize="13px" mb={2.5}>
              {_?.description || "This user violated our community guidelines."}
            </Text>
            <Text color="#737373" fontSize="13px" mb={2.5}>
              Reported By:
              <span style={{ color: "#222222", fontWeight: 500 }}>
                {_?.reportedBy || "Sandra Nwakwo"}
              </span>
            </Text>
            <Button variant="outline" bg="transparent" width={"fit-content"}>
              Dismiss
            </Button>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default UserReports;
