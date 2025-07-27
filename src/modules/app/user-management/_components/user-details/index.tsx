import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { getStatusStyles } from "~/modules/util";
import user from "~/assets/images/user.png";
import { Button, Tab } from "~/modules/shared";
import { Counter, Refresh, StarOutline } from "~/assets/images";
import InfoCard from "~/modules/shared/widgets/info_card";
import UserInfo from "./info";
import UserListings from "./listings";
import UserActivity from "./activity";
import UserReports from "./reports";
import { Flag, OctagonAlert, TriangleAlert } from "lucide-react";
interface iSwapDetails {
  userId: any;
}

const UserDetails: React.FC<iSwapDetails> = ({ userId }) => {
  const userInfo: any = {
    name: "Sandra Nwakwo",
    userType: "Swapper",
    status: "Active",
    totalSwaps: 24,
    trustScore: 4.8,
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
      description: "5h ago Ago",
      icon: <Counter />,
    },
  ];
  const tabOptions = [
    {
      title: "Info",
      value: "info",
      children: <UserInfo />,
    },
    {
      title: "Activity",
      value: "activity",
      children: <UserActivity />,
    },
    {
      title: "Listing",
      value: "listing",
      children: <UserListings />,
    },
    {
      title: "Reports",
      value: "reports",
      children: <UserReports />,
    },
  ];

  return (
    <Box>
      <Text fontSize="xl" fontWeight="medium" color="#222222" mb={6}>
        User Profile
      </Text>
      <Box border="1px solid #E9E9E9" py={2.5} px={3} borderRadius={3} mb={6}>
        <Flex mb={4} alignItems="center" gap={4}>
          <Box display="flex" height="83px" width="63px" borderRadius="full">
            <Image src={user} alt="Owner Avatar" height="100%" width="100%" />
          </Box>
          <Box width="full">
            <Text fontSize="20px" color="#222222" fontWeight="700" mb={2}>
              {userInfo?.name}
            </Text>
            <Text fontSize="14px" color="#737373">
              Joined Mar 2024
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
        <Button bg="#FFF0EF" width={"fit-content"}>
          <Flag size={20} color="#E42222" />
          Flag
        </Button>
      </Flex>
    </Box>
  );
};

export default UserDetails;
