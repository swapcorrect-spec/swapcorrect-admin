import { Box, Switch as ChakraSwitch, Text } from "@chakra-ui/react";
type iSwitch = {
  label: string;
  header?: string;
};

export const Switch: React.FC<iSwitch> = ({ label, header }) => {
  return (
    <Box>
      <Text mb={3} color="#222222" fontWeight={500}>
        {header}
      </Text>
      <ChakraSwitch.Root w="full">
        <ChakraSwitch.HiddenInput />
        <Box display={"flex"} alignItems={"center"} w="100%">
          <ChakraSwitch.Label mr="auto" color="#737373" fontWeight={400}>
            {label}
          </ChakraSwitch.Label>
          <ChakraSwitch.Control />
        </Box>
      </ChakraSwitch.Root>
    </Box>
  );
};
