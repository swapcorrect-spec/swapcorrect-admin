import { Box, Heading, Text } from "@chakra-ui/react";
import type { FC } from "react";

interface IHeader {
  title: string;
  description: string;
}

export const Header: FC<IHeader> = ({ title, description }) => {
  return (
    <Box>
      <Heading
        as="h4"
        fontSize="2xl"
        fontWeight="medium"
        color="#222222"
        mb={3}
      >
        {title}
      </Heading>
      <Text color="#737373">{description}</Text>
    </Box>
  );
};
