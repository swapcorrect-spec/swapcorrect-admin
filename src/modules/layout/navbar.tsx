"use client";
import {
  Flex,
  Box,
  Button,
  Text,
  Tabs,
  Menu,
  Badge,
  VStack,
} from "@chakra-ui/react";

// SVGs

import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../_constants/paths";
import { mockNotifications, notifyType } from "../_constants";
import { Bell, Search } from "~/assets/images";
import Notification from "~/components/widgets";
import profyle from "~/assets/images/profyle.png";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const handleLogout = () => {
    localStorage.clear();
    // navigate(`/${PATHS.LOGIN}`);
  };
  function getPageTitle(pathname: string): string {
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname === "/listing") return "Listing";
    if (pathname === "/user-management") return "User Management";
    if (pathname === "/swap-activity") return "Swap Activity";
    if (pathname === "/flags-reports") return "Flags & Reports";
    if (pathname === "/user-roles") return "User Roles";
    if (pathname === "/settings") return "Settings";
    return "Page";
  }

  const title = getPageTitle(path);

  return (
    <Flex
      as="nav"
      position="sticky"
      top={0}
      zIndex={10}
      width="100%"
      bg="white"
      borderBottom="1px solid #E9E9E9"
      py="15px"
      px="42px"
      align="center"
      gap="110px"
      justifyContent={"space-between"}
    >
      <Text color={"#007AFF"} fontWeight={500} fontSize={16}>
        {title}
      </Text>

      <Flex align="center" gap={5}>
        {/* Notifications Menu */}
        <Menu.Root>
          <Menu.Trigger as={Box} position="relative" cursor="pointer">
            <Bell />
            <Badge
              position="absolute"
              top="-3px"
              right="-2px"
              color="white"
              bg="#E42222"
              fontSize="0.7rem"
              borderRadius="full"
              px={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              4
            </Badge>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content p={4} maxH="75vh" overflowY="auto" w="500px">
              {/* Tabs for Notification Types */}
              <Tabs.Root
                variant="enclosed"
                display={"flex"}
                defaultValue={"all"}
              >
                <Tabs.List width={"100%"}>
                  {notifyType.map((tab, index) => (
                    <Tabs.Trigger key={index} value={tab.value} width={"100%"}>
                      {tab.title}
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>
              </Tabs.Root>
              <Flex direction="column" gap={3} mt={4}>
                {mockNotifications.map((notify, idx) => (
                  <Box
                    key={idx}
                    border="1px solid #EAEAEA"
                    borderRadius="md"
                    bg="gray.50"
                  >
                    <Notification notify={notify} />
                  </Box>
                ))}
              </Flex>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>

        {/* Profile Menu */}
        <Menu.Root>
          <Flex align="center" gap={3} cursor="pointer" fontWeight={500}>
            <Box>
              <img
                src={profyle}
                alt="Profile icon"
                style={{ width: "32px", height: "32px", borderRadius: "50%" }}
              />
            </Box>
            Wisdom Apavie
          </Flex>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Trigger>Profile</Menu.Trigger>
              {/* <MenuItem as={Link} href="/settings">
              Settings
            </MenuItem> */}
              <Menu.Item onClick={handleLogout} value="">
                Logout
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </Flex>
    </Flex>
  );
};
