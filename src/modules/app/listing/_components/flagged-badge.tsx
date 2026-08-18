import { Text } from "@chakra-ui/react";
import { getStatusStyles } from "~/modules/util";

export const FlaggedBadge: React.FC = () => {
  const { borderColor, bg, textColor } = getStatusStyles("flagged");

  return (
    <Text
      fontSize="13px"
      fontWeight={500}
      border="1px solid"
      borderColor={borderColor}
      bg={bg}
      color={textColor}
      py="5px"
      px="17px"
      borderRadius="37.74px"
      w="fit-content"
    >
      Flagged
    </Text>
  );
};
