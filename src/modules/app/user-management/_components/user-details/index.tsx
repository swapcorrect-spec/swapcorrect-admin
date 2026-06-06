import { Box, Flex, Image, Text, Spinner } from "@chakra-ui/react";
import {
  getStatusStyles,
  createImageErrorHandler,
  getImageSrcWithFallback,
  isUserSuspended,
} from "~/modules/util";
import user from "~/assets/images/user.png";
import { ErrorState, Menu, MenuItem, PageHeaderWithBack, Tab } from "~/modules/shared";
import { Counter, Refresh, StarOutline } from "~/assets/images";
import InfoCard from "~/modules/shared/widgets/info_card";
import UserInfo from "./info";
import UserListings from "./listings";
import UserActivity from "./activity";
import UserReports from "./reports";
import { OctagonAlert, ShieldCheck } from "lucide-react";
import { useGetGeneralUserInfo } from "~/hooks/queries/auth/auth";
import { useMemo, useState } from "react";
import {
  UserSuspendConfirm,
  toUserSuspendSummaryFromGeneralUser,
  type UserSuspendMode,
} from "../user-suspend-confirm";

interface iSwapDetails {
  userId: any;
  isOpen?: boolean;
}

const UserDetails: React.FC<iSwapDetails> = ({ userId, isOpen = true }) => {
  const [imageError, setImageError] = useState(false);
  const [suspendMode, setSuspendMode] = useState<UserSuspendMode | null>(null);

  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetGeneralUserInfo({
    userId: userId?.toString() || "",
    enabler: isOpen && !!userId,
  });

  const userData = data?.result;

  const suspended =
    userData?.isSuspended === true ||
    isUserSuspended({ isSuspendUser: userData?.isSuspendUser });

  const userInfo: any = {
    name: userData ? `${userData.firstName} ${userData.lastName}` : "",
    userType: userData?.userRole?.[0] || "",
    status: suspended ? "Suspended" : "Active",
    totalSwaps: userData?.swapCount || 0,
    trustScore: userData?.rating || 0,
    email: userData?.email || "",
    phoneNumber: userData?.phoneNumber || "",
    username: userData?.userName || "",
    createdAt: userData?.created || "",
    lastLoginTime: userData?.lastLoginTime || "",
  };
  const { borderColor, bg, textColor } = getStatusStyles(
    userInfo?.status?.toLowerCase()
  );
  const INFOLIST = [
    {
      title: "Swaps",
      value: userInfo?.totalSwaps,
      icon: <Refresh />,
    },
    {
      title: "Trust Score",
      value: userInfo?.trustScore,
      icon: <StarOutline />,
    },
    {
      title: "Last Active",
      description: userData?.lastLoginTime ? new Date(userData.lastLoginTime).toLocaleDateString() : "Never",
      icon: <Counter />,
    },
  ];
  const actionMenu = useMemo(() => {
    if (!userData) return [];

    return [
      {
        label: suspended ? "Unsuspend" : "Suspend",
        icon: suspended ? (
          <ShieldCheck size={20} color="#007AFF" />
        ) : (
          <OctagonAlert size={20} color="#E42222" />
        ),
        onClick: () => setSuspendMode(suspended ? "unsuspend" : "suspend"),
        value: suspended ? "unsuspend" : "suspend",
        style: { color: suspended ? "#007AFF" : "#E42222" },
      },
    ];
  }, [suspended, userData]);

  const tabOptions = [
    {
      title: "Info",
      value: "info",
      children: <UserInfo userData={userData} />,
    },
    {
      title: "Activity",
      value: "activity",
      children: <UserActivity userId={userId} />,
    },
    {
      title: "Listing",
      value: "listing",
      children: <UserListings userId={userId} />,
    },
    {
      title: "Reports",
      value: "reports",
      children: <UserReports />,
    },
  ];

  if (isLoading || isFetching) {
    return (
      <Box>
        <PageHeaderWithBack title="User Profile" />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minH="400px"
          w="100%"
        >
          <Spinner size="xl" color="#007AFF" />
        </Box>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box>
        <PageHeaderWithBack title="User Profile" />
        <ErrorState
        minH="400px"
        title="Could not load user profile"
        error={error}
        onRetry={() => refetch()}
        />
      </Box>
    );
  }

  return (
    <Box>
      <PageHeaderWithBack title="User Profile" />
      <Box border="1px solid #E9E9E9" py={2.5} px={3} borderRadius={3} mb={6}>
        <Flex mb={4} alignItems="flex-start" gap={4}>
          <Box display="flex" height="83px" width="63px" borderRadius="full" overflow="hidden" flexShrink={0}>
            <Image 
              src={getImageSrcWithFallback(userData?.profilePicture || "", imageError, user)} 
              alt="Owner Avatar" 
              height="100%" 
              width="100%" 
              onError={createImageErrorHandler(setImageError)}
            />
          </Box>
          <Box width="full" minW={0}>
            <Text fontSize="20px" color="#222222" fontWeight="700" mb={2}>
              {userInfo?.name}
            </Text>
            <Text fontSize="14px" color="#737373">
              {userData?.created ? `Joined ${new Date(userData.created).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : ""}
            </Text>
          </Box>
          <Box ml="auto" alignSelf="flex-start">
            <Menu>
              <Box>
                {actionMenu.map((menuItem) => (
                  <MenuItem
                    key={menuItem.value}
                    icon={menuItem.icon}
                    onClick={menuItem.onClick}
                    value={menuItem.value}
                    label={menuItem.label}
                    styleProps={menuItem.style}
                  />
                ))}
              </Box>
            </Menu>
          </Box>
        </Flex>
        <Box mb={8} display="flex" gap={4} alignItems="center">
          <Text
            textAlign="center"
            fontSize={"12px"}
            border={"1px solid #222222"}
            color={"#FFFFFF"}
            bg="#222222"
            py="5px"
            px="17px"
            borderRadius="37.74px"
          >
            {userInfo?.userType}
          </Text>
          <Text
            textAlign="center"
            fontWeight={500}
            fontSize={"13px"}
            borderColor={borderColor}
            border="1px solid"
            bg={bg}
            color={textColor}
            py="5px"
            px="17px"
            borderRadius="37.74px"
          >
            {userInfo?.status}
          </Text>
        </Box>
        <Flex gap="8px">
          {INFOLIST.map((info, idx) => (
            <InfoCard
              key={idx}
              icon={info.icon}
              title={info.title}
              count={info.value}
              description={info.description}
              showFooter={false}
            />
          ))}
        </Flex>
      </Box>
      <Tab options={tabOptions} defaultValue="info" />

      <UserSuspendConfirm
        open={!!suspendMode}
        mode={suspendMode}
        user={userData ? toUserSuspendSummaryFromGeneralUser(userData) : null}
        onClose={() => setSuspendMode(null)}
        onSuccess={() => refetch()}
      />
    </Box>
  );
};

export default UserDetails;
