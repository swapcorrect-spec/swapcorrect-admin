import { Box, Flex, Image, Text, Spinner } from "@chakra-ui/react";
import { getStatusStyles, createImageErrorHandler, getImageSrcWithFallback, formatDateTime } from "~/modules/util";
import user from "~/assets/images/user.png";
import { Button, Tab } from "~/modules/shared";
import { Counter, Refresh, StarOutline } from "~/assets/images";
import { BoxIcon } from "lucide-react";
import InfoCard from "~/modules/shared/widgets/info_card";
import UserInfo from "./info";
import UserListings from "./listings";
import UserActivity from "./activity";
import UserReports from "./reports";
import { OctagonAlert, TriangleAlert } from "lucide-react";
import { useGetGeneralUserInfo } from "~/hooks/queries/auth/auth";
import { useState } from "react";
import { useParams } from "react-router";
import PageLayout from "~/modules/layout/page-layout";

const UserProfile: React.FC = () => {
  const params = useParams();
  const userId = params.userId as string;
  const [imageError, setImageError] = useState(false);
  
  const { data, isLoading, isFetching } = useGetGeneralUserInfo({
    userId: userId || "",
    enabler: !!userId,
  });

  const userData = data?.result;
  
  const userInfo: any = {
    name: userData ? `${userData.firstName} ${userData.lastName}` : "",
    userType: userData?.userRole?.[0] || "",
    status: userData?.isSuspendUser ? "Suspended" : "Active",
    totalSwaps: userData?.swapCount || 0,
    trustScore: userData?.rating || 0,
    listingCount: userData?.listingCount || 0,
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
      title: "Ratings",
      value: userInfo?.trustScore,
      icon: <StarOutline />,
    },
    {
      title: "Listings",
      value: userInfo?.listingCount,
      icon: <BoxIcon size={20} />,
    },
    {
      title: "Last Active",
      description: userData?.lastLoginTime ? formatDateTime(userData.lastLoginTime) : "Never",
      icon: <Counter />,
    },
  ];
  const tabOptions = [
    {
      title: "Info",
      value: "info",
      children: <UserInfo userData={userData} />,
    },
    {
      title: "Activity",
      value: "activity",
      children: <UserActivity />,
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

  // Show loader when fetching
  if (isLoading || isFetching) {
    return (
      <PageLayout>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minH="400px"
          w="100%"
        >
          <Spinner size="xl" color="#007AFF" />
        </Box>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Box p={6}>
        <Text fontSize="xl" fontWeight="medium" color="#222222" mb={6}>
          User Profile
        </Text>
        <Box border="1px solid #E9E9E9" py={2.5} px={3} borderRadius={3} mb={6}>
          <Flex mb={4} alignItems="center" gap={4}>
            <Box display="flex" height="83px" width="63px" borderRadius="full" overflow="hidden">
              <Image 
                src={getImageSrcWithFallback(userData?.profilePicture ?? "", imageError || !userData?.profilePicture, user)} 
                alt="Owner Avatar" 
                height="100%" 
                width="100%" 
                onError={createImageErrorHandler(setImageError)}
              />
            </Box>
            <Box width="full">
              <Text fontSize="20px" color="#222222" fontWeight="700" mb={2}>
                {userInfo?.name}
              </Text>
              <Text fontSize="14px" color="#737373" mb={1}>
                @{userInfo?.username}
              </Text>
              <Text fontSize="14px" color="#737373">
                {userData?.created ? `Joined ${formatDateTime(userData.created)}` : ""}
              </Text>
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
        <Flex gap={4} justifyContent={"end"} mt={10}>
          <Button variant="outline" bg="transparent" width={"fit-content"}>
            <TriangleAlert size={20} />
            Warn
          </Button>
          <Button variant="outline" bg="transparent" width={"fit-content"}>
            <OctagonAlert size={20} />
            Suspend
          </Button>
        </Flex>
      </Box>
    </PageLayout>
  );
};

export default UserProfile;
