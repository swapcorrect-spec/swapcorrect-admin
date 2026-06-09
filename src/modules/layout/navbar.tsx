"use client";
import { Flex, Box, Text, Menu, Image, Skeleton } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PATHS } from "../_constants/paths";
import { Bell } from "~/assets/images";
import userFallback from "~/assets/images/user.png";
import { useGetUserInfo } from "~/hooks/queries/auth/auth";
import { useLogout } from "~/hooks/useLogout";
import { Auth } from "~/config/auth";
import { LogoutConfirmDialog } from "~/modules/shared";
import { NotificationMenu } from "./notification-menu";
import {
  createImageErrorHandler,
  getImageSrcWithFallback,
} from "~/modules/util";

export const Navbar: React.FC = () => {
  const path = useLocation().pathname;
  const [imageError, setImageError] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const {
    isModalOpen,
    isLoggingOut,
    openLogoutModal,
    closeLogoutModal,
    confirmLogout,
  } = useLogout();

  const { data: user, isLoading } = useGetUserInfo({
    enabler: Auth.isAuthenticated(),
  });

  const displayName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
      user.userName ||
      "User"
    : "User";
  function getPageTitle(pathname: string): string {
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname === "/listing") return "Listing";
    if (pathname === "/user-management") return "User Management";
    if (pathname === "/swap-activity") return "Swap Activity";
    if (pathname === "/flags-reports") return "Flags & Reports";
    if (pathname === "/user-roles") return "User Roles";
    if (pathname === "/settings") return "Settings";
    if (pathname === "/profile") return "Profile";
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
      py="20px"
      px="42px"
      align="center"
      gap="110px"
      justifyContent={"space-between"}
    >
      <Text color={"#007AFF"} fontWeight={500} fontSize={16}>
        {title}
      </Text>

      <Flex align="center" gap={5}>
        <Menu.Root
          onOpenChange={(details) => setNotificationsOpen(details.open)}
        >
          <Menu.Trigger
            as={Box}
            cursor="pointer"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Bell width={22} height={22} />
          </Menu.Trigger>
          <Menu.Positioner>
            <NotificationMenu
              open={notificationsOpen && Auth.isAuthenticated()}
            />
          </Menu.Positioner>
        </Menu.Root>

        <Menu.Root>
          <Menu.Trigger>
            <Flex
              align="center"
              gap={2}
              cursor="pointer"
              fontWeight={500}
              border="1px solid #E9E9E9"
              borderRadius="full"
              py="4px"
              pl="4px"
              pr="12px"
              _hover={{ bg: "#FAFAFA" }}
              transition="background 0.15s ease"
            >
              {isLoading ? (
                <Skeleton boxSize="32px" borderRadius="full" />
              ) : (
                <Box
                  boxSize="32px"
                  borderRadius="full"
                  overflow="hidden"
                  flexShrink={0}
                >
                  <Image
                    src={getImageSrcWithFallback(
                      user?.profilePicture,
                      imageError || !user?.profilePicture?.trim(),
                      userFallback
                    )}
                    alt={displayName}
                    boxSize="32px"
                    objectFit="cover"
                    onError={createImageErrorHandler(setImageError)}
                  />
                </Box>
              )}
              {isLoading ? (
                <Skeleton height="16px" width="100px" />
              ) : (
                <>
                  <Text color="#222222" fontSize="14px">
                    {displayName}
                  </Text>
                  <ChevronDown size={16} color="#737373" />
                </>
              )}
            </Flex>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content width="200px">
              <Link to={PATHS.PROFILE}>
                <Menu.Item value="profile" cursor="pointer">
                  Profile
                </Menu.Item>
              </Link>

              <Link to={PATHS.SETTINGS}>
                <Menu.Item value="settings" cursor="pointer">
                  Settings
                </Menu.Item>
              </Link>

              <Menu.Item
                onClick={openLogoutModal}
                value="logout"
                cursor="pointer"
              >
                Logout
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </Flex>

      <LogoutConfirmDialog
        open={isModalOpen}
        onClose={closeLogoutModal}
        onConfirm={confirmLogout}
        isLoading={isLoggingOut}
      />
    </Flex>
  );
};
