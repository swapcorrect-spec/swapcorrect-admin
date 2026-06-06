import { Flex, Text, Box, Image } from "@chakra-ui/react";
import { Calendar, Mail, Phone, UserPlus } from "lucide-react";
import userFallback from "~/assets/images/user.png";
import PageLayout from "~/modules/layout/page-layout";
import {
  Button,
  ErrorState,
  Input,
  PasswordInput,
  QueryState,
  Tab,
} from "~/modules/shared";
import Activity from "./activity";
import { useGetUserInfo } from "~/hooks/queries/auth/auth";
import type { IGetUserInfoResponseData } from "~/hooks/queries/auth/auth.type";
import { Auth } from "~/config/auth";
import {
  createImageErrorHandler,
  formatDateTime,
  getImageSrcWithFallback,
} from "~/modules/util";
import { useState } from "react";

type LoggedInUser = IGetUserInfoResponseData["result"];

const formatLocation = (user?: LoggedInUser) => {
  if (!user) return "—";
  const parts = [user.city, user.state, user.country].filter(Boolean);
  if (parts.length) return parts.join(", ");
  return user.deliveryAddress || "—";
};

const Account = ({ user }: { user?: LoggedInUser }) => {
  const fullName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
    : "";

  return (
    <Box>
      <Text color="#222222" fontWeight={500} mb={5} fontSize="14px">
        Account Setting
      </Text>
      <form style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        <Input
          type="text"
          name="fullName"
          handleChange={() => {}}
          placeholder="Full name"
          value={fullName}
          label="Full Name"
          disabled
        />
        <Input
          type="email"
          name="email"
          handleChange={() => {}}
          placeholder="Email address"
          value={user?.email || ""}
          label="Email Address"
          disabled
        />
        <Input
          type="tel"
          name="phoneNumber"
          handleChange={() => {}}
          placeholder="Phone number"
          value={user?.phoneNumber || ""}
          label="Phone Number"
          disabled
        />
        <Button variant="solid" bg="#222222" width="fit-content" isDisabled>
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

const Security = () => {
  return (
    <Box>
      <Text color="#222222" fontWeight={500} fontSize="14px" mb={5}>
        Security
      </Text>
      <form style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        <PasswordInput
          name="password"
          handleChange={() => {}}
          placeholder="Enter current password"
          value=""
          label="Current Password"
        />
        <PasswordInput
          name="newPassword"
          handleChange={() => {}}
          placeholder="Enter new password"
          value=""
          label="New Password"
        />
        <PasswordInput
          name="confirmNewPassword"
          handleChange={() => {}}
          placeholder="Confirm new password"
          value=""
          label="Confirm New Password"
        />
        <Button variant="solid" bg="#222222" width="fit-content">
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

const Preference = () => <Box />;

export const Profile = () => {
  const [imageError, setImageError] = useState(false);
  const { data: user, isLoading, isFetching, isError, error, refetch } =
    useGetUserInfo({
      enabler: Auth.isAuthenticated(),
    });

  const roleLabel =
    Auth.getDecodedJwt()?.user?.role?.replace(/_/g, " ") || "Admin";

  const tabOptions = [
    {
      title: "Account",
      value: "account",
      children: <Account user={user} />,
    },
    {
      title: "Security",
      value: "security",
      children: <Security />,
    },
    {
      title: "Preference",
      value: "preference",
      children: <Preference />,
    },
    {
      title: "Activity",
      value: "activity",
      children: <Activity />,
    },
  ];

  return (
    <PageLayout>
      <QueryState
        isLoading={isLoading || isFetching}
        isError={isError}
        error={error}
        onRetry={() => refetch()}
        isEmpty={!user}
        emptyProps={{
          title: "Profile unavailable",
          description: "We could not load your profile information.",
        }}
        errorProps={{
          title: "Could not load profile",
          description: "Please try again.",
        }}
      >
        {user && (
          <Flex gap="40px">
            <Box
              border="1px solid #E9E9E9"
              py={2.5}
              px={3}
              borderRadius="12px"
              mb={6}
              width="40%"
            >
              <Flex
                mb={4}
                alignItems="center"
                gap={4}
                justifyContent="space-between"
              >
                <Box
                  display="flex"
                  height="83px"
                  width="63px"
                  borderRadius="full"
                  overflow="hidden"
                >
                  <Image
                    src={getImageSrcWithFallback(
                      user.profilePicture,
                      imageError || !user.profilePicture?.trim(),
                      userFallback
                    )}
                    alt={`${user.firstName} ${user.lastName}`}
                    height="100%"
                    width="100%"
                    objectFit="cover"
                    onError={createImageErrorHandler(setImageError)}
                  />
                </Box>
                <Text
                  textAlign="center"
                  fontSize="12px"
                  border="1px solid #C5FFBC"
                  color="#FFFFFF"
                  bg="#106104"
                  py="5px"
                  px="17px"
                  borderRadius="37.74px"
                  textTransform="capitalize"
                >
                  {roleLabel}
                </Text>
              </Flex>
              <Box width="full" mb={3}>
                <Text fontSize="20px" color="#222222" fontWeight="700" mb={2}>
                  {`${user.firstName || ""} ${user.lastName || ""}`.trim() ||
                    user.userName ||
                    "—"}
                </Text>
                <Text fontSize="14px" color="#737373">
                  {formatLocation(user)}
                </Text>
              </Box>
              <Box display="flex" flexDirection="column" gap={5}>
                <Flex gap={3} alignItems="center" color="#737373">
                  <Mail size={16} />
                  <Text fontWeight={500} fontSize="14px">
                    {user.email || "—"}
                  </Text>
                </Flex>
                <Flex gap={3} alignItems="center" color="#737373">
                  <Phone size={16} />
                  <Text fontWeight={500} fontSize="14px">
                    {user.phoneNumber || "—"}
                  </Text>
                </Flex>
                <Flex gap={3} alignItems="center" color="#737373">
                  <UserPlus size={16} />
                  <Text fontWeight={500} fontSize="14px">
                    Joined on {formatDateTime(user.created)}
                  </Text>
                </Flex>
                <Flex gap={3} alignItems="center" color="#737373">
                  <Calendar size={16} />
                  <Text fontWeight={500} fontSize="14px">
                    Last login: {formatDateTime(user.lastLoginTime)}
                  </Text>
                </Flex>
              </Box>
            </Box>
            <Tab options={tabOptions} defaultValue="account" />
          </Flex>
        )}
      </QueryState>
    </PageLayout>
  );
};
