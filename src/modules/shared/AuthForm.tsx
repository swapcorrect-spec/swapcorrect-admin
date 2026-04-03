import { Box, Heading, Text } from "@chakra-ui/react";

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

const AuthForm: React.FC<Props> = ({ title, subtitle, children }) => {
  return (
    <Box w="100%" h="100vh" mt={{ base: 10, md: 0 }}  mx="auto" flexDirection={"column"} alignItems={"center"} justifyContent={"center"} display={"flex"}>
        <Box border={"1px solid #D9D9D9"} borderRadius={"10px"} p={10} maxW="40%" w="100%">
      
      <Heading
        color="#000000"
        fontSize={{ base: "2xl", md: "4xl" }}
        textAlign="center"
        fontWeight="medium"
      >
        {title}
      </Heading>
      <Text
        color="#737373"
        fontSize="base"
        fontWeight="normal"
        w={{ base: "80%", md: "50%" }}
        mx="auto"
        textAlign="center"
        mt={2}
        mb={8}
        lineHeight="tight"
      >
        {subtitle}
      </Text>
      {children}
      </Box>
    </Box>
  );
};

export default AuthForm;
  