import { Box, Text } from "@chakra-ui/react";
import { ProgressUp, ProgressDown } from "~/assets/images";

interface iInfoCardProps {
  icon: React.ReactNode;
  title: string;
  count: number;
  progress: boolean;
}
const InfoCard: React.FC<iInfoCardProps> = ({
  icon,
  title,
  count,
  progress,
}) => {
  return (
    <Box
      borderRadius="12px"
      width="100%"
      py="12px"
      px="16px"
      border="1px solid #EAEAEA"
    >
      <Box display="flex" alignItems="center" gap="12px" mb="16px">
        <Box>{icon}</Box>
        <Text fontSize="14px" color="#222222" fontWeight="500">
          {title}
        </Text>
      </Box>
      <Text fontSize="24px" color="#222222" fontWeight="600" mb="16px">
        {count}
      </Text>
      <Box
        width="100%"
        borderTop="1px solid #EAEAEA"
        p="10px"
        pb="0px"
        display="flex"
        alignItems="center"
        gap="9px"
      >
        <Box
          bg={progress ? "#DFFFDF" : "#FFE7E7"}
          borderRadius="3px"
          h="20px"
          w="20px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {progress ? <ProgressUp /> : <ProgressDown />}
        </Box>
        <Text fontSize="12px" color="#737373">
          {progress ? "+" : "-"}12% from last month
        </Text>
      </Box>
    </Box>
  );
};

export default InfoCard;
