import { type FC } from "react";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";
import { Flex, Box } from "@chakra-ui/react";

interface iProps {
  children: React.ReactNode;
  p?: number | string;
}

const PageLayout: FC<iProps> = ({ children, p = 6 }) => {
  return (
    <Flex height="100vh" width="100vw">
      <Sidebar />

      <Flex direction="column" flex="1" bg="#F9FAFB" overflowY={"scroll"}>
        <Navbar />
        <Box as="main" flex="1" p={p}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default PageLayout;
