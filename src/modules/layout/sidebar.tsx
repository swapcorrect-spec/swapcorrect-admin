import {
  Logo,
  AdminHomeFilled,
  AdminHomeOutline,
  Listing,
  ListingFilled,
  LogOut,
  Settings,
  SettingsFilled,
  SwapActivity,
  UserMgmt,
  UserMgmtFilled,
  UserRole,
  Flag,
} from "~/assets/images";
import { PATHS } from "../_constants/paths";
import { useLocation, Link } from "react-router-dom";
import { Box, Flex, Text } from "@chakra-ui/react";

export const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  const SIDEBAR_LIST = [
    {
      title: "Dashboard",
      iconFilled: <AdminHomeFilled />,
      iconOutline: <AdminHomeOutline />,
      link: PATHS.DASHBOARD,
    },
    {
      title: "Listing",
      iconFilled: <ListingFilled />,
      iconOutline: <Listing />,
      link: PATHS.LISTING,
    },
    {
      title: "User Management",
      iconFilled: <UserMgmtFilled />,
      iconOutline: <UserMgmt />,
      link: PATHS.USERMANAGEMENT,
    },
    {
      title: "Swap Activity",
      iconFilled: <ListingFilled />,
      iconOutline: <SwapActivity />,
      link: PATHS.SWAPACTIVITY,
    },
    {
      title: "Flags & Reports",
      iconFilled: <Listing />,
      iconOutline: <Flag />,
      link: PATHS.FLAGSANDREPORTS,
    },
    {
      title: "User Roles",
      iconFilled: <Listing />,
      iconOutline: <UserRole />,
      link: PATHS.ROLES,
    },
  ];

  const SIDEBAR_LIST_ONE = [
    {
      title: "Settings",
      iconFilled: <SettingsFilled />,
      iconOutline: <Settings />,
      link: PATHS.SETTINGS,
    },
  ];

  return (
    <Flex
      direction="column"
      justify="space-between"
      maxW="312px"
      w="full"
      border="1px solid #D9D9D9"
      bg="white"
      h="100vh"
      overflowY="auto"
      p={6}
    >
      <Box>
        <Box pb={5} borderBottom="1px solid #EAEAEA" mb={7}>
          <Logo />
        </Box>

        <Flex direction="column" gap={4}>
          {SIDEBAR_LIST.map(
            ({ title, iconFilled, iconOutline, link }, index) => {
              const isActive = path === link;

              return (
                <Box
                  key={index}
                  p={3}
                  bg={isActive ? "#222222" : "transparent"}
                  borderRadius="md"
                  _hover={isActive ? {} : { bg: "#F1F8FF" }}
                  width="100%"
                >
                  <Link to={link}>
                    <Flex align="center" justify="start" gap={2}>
                      <Box
                        p="6px"
                        borderRadius="lg"
                        display="flex"
                        alignItems="center"
                      >
                        {isActive ? iconFilled : iconOutline}
                      </Box>
                      <Text
                        fontWeight="medium"
                        fontSize="md"
                        color={isActive ? "white" : "#737373"}
                      >
                        {title}
                      </Text>
                    </Flex>
                  </Link>
                </Box>
              );
            }
          )}
        </Flex>
      </Box>

      <Flex direction="column" gap={4} borderTop="1px solid #EAEAEA" mt={7}>
        {SIDEBAR_LIST_ONE.map(
          ({ title, iconFilled, iconOutline, link }, index) => {
            const isActive = path === link;

            return (
              <Box
                key={index}
                p={3}
                bg={isActive ? "#222222" : "transparent"}
                borderRadius="md"
                _hover={isActive ? {} : { bg: "#F1F8FF" }}
                width="100%"
              >
                <Link to={link}>
                  <Flex align="center" justify="start" gap={2}>
                    <Box
                      p="6px"
                      borderRadius="lg"
                      display="flex"
                      alignItems="center"
                    >
                      {isActive ? iconFilled : iconOutline}
                    </Box>
                    <Text
                      fontWeight="medium"
                      fontSize="md"
                      color={isActive ? "white" : "#737373"}
                    >
                      {title}
                    </Text>
                  </Flex>
                </Link>
              </Box>
            );
          }
        )}

        <Box p={3} borderRadius="md" width="100%" cursor={"pointer"}>
          <Flex align="center" justify="start" gap={2}>
            <Box p="6px" borderRadius="lg" display="flex" alignItems="center">
              <LogOut />
            </Box>
            <Text fontWeight="medium" fontSize="md" color="#737373">
              Logout
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};
