import { type FC } from "react";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";
import { Flex, Box } from "@chakra-ui/react";

interface iProps {
  children: React.ReactNode;
}

const PageLayout: FC<iProps> = ({ children }) => {
  return (
    <Flex height="100vh" width="100vw">
      <Sidebar />

      <Flex direction="column" flex="1" bg="#F9FAFB">
        <Navbar />
        <Box as="main" flex="1" p={6}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default PageLayout;
