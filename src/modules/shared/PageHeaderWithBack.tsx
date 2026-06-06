import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { ChevronLeft } from "lucide-react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";

type PageHeaderWithBackProps = {
  title: string;
  description?: string;
  onBack?: () => void;
  backLabel?: string;
};

export const PageHeaderWithBack: FC<PageHeaderWithBackProps> = ({
  title,
  description,
  onBack,
  backLabel = "Back",
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    navigate(-1);
  };

  return (
    <Box mb={6}>
      <Flex
        as="button"
        align="center"
        gap={1}
        mb={4}
        cursor="pointer"
        onClick={handleBack}
        color="#737373"
        bg="transparent"
        border="none"
        p={0}
        _hover={{ color: "#222222" }}
      >
        <ChevronLeft size={20} />
        <Text fontSize="sm" fontWeight={500}>
          {backLabel}
        </Text>
      </Flex>
      <Heading
        as="h4"
        fontSize="2xl"
        fontWeight="medium"
        color="#222222"
        mb={description ? 3 : 0}
      >
        {title}
      </Heading>
      {description ? <Text color="#737373">{description}</Text> : null}
    </Box>
  );
};
