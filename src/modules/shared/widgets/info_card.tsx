import { Box, Text } from "@chakra-ui/react";
import { ProgressUp, ProgressDown } from "~/assets/images";

interface iInfoCardProps {
  icon: React.ReactNode;
  title: string;
  count?: number;
  progress?: boolean;
  showFooter?: boolean;
  description?: string;
  percentageChange?: number;
  compact?: boolean;
}
const InfoCard: React.FC<iInfoCardProps> = ({
  icon,
  title,
  count,
  progress,
  showFooter = true,
  description,
  percentageChange,
  compact = false,
}) => {
  return (
    <Box
      borderRadius={compact ? "10px" : "12px"}
      width="100%"
      minW={0}
      py={compact ? "10px" : "12px"}
      px={compact ? "14px" : "16px"}
      border="1px solid #EAEAEA"
    >
      <Box
        display="flex"
        alignItems="center"
        gap={compact ? "8px" : "12px"}
        mb={compact ? "8px" : "16px"}
      >
        <Box flexShrink={0}>{icon}</Box>
        <Text
          fontSize={compact ? "13px" : "14px"}
          color="#737373"
          fontWeight="500"
          lineHeight="1.2"
        >
          {title}
        </Text>
      </Box>
      {count !== undefined && count !== null && (
        <Text
          fontSize={compact ? "17px" : "20px"}
          color="#222222"
          fontWeight="600"
          mb={compact ? 0 : "16px"}
          lineHeight="1.2"
        >
          {count}
        </Text>
      )}
      {description && (
        <Text
          fontSize={compact ? "14px" : "20px"}
          color="#222222"
          fontWeight="600"
          mb={compact ? 0 : "16px"}
          lineHeight="1.2"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {description}
        </Text>
      )}
      {showFooter && (
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
            {progress ? "+" : "-"}
            {percentageChange !== undefined ? percentageChange : 12}% from last month
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default InfoCard;
