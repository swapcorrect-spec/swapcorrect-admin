import { Flex, Text, Box, Image } from "@chakra-ui/react";
import { Calendar, Mail, Phone, UserPlus } from "lucide-react";
import user from "~/assets/images/user.png";
import PageLayout from "~/modules/layout/page-layout";
import { Button, Input, Tab } from "~/modules/shared";
import Activity from "./activity";
const Account = () => {
  return (
    <Box>
      <Text color="#222222" fontWeight={500} mb={5} fontSize={"14px"}>
        Account Setting
      </Text>
      <form style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        <Input
          type="text"
          name="note"
          handleChange={() => console.log("Holla world!")}
          placeholder="Additional note"
          value=""
          label="Full Name"
        />
        <Input
          type="email"
          name="email"
          handleChange={() => console.log("Holla world!")}
          placeholder="Additional note"
          value=""
          label="Email Address"
        />
        <Input
          type="tel"
          name="phoneNumber"
          handleChange={() => console.log("Holla world!")}
          placeholder="Additional note"
          value=""
          label="Phone Number"
        />
        <Button variant="solid" bg="#222222" width={"fit-content"}>
          Save Changes
        </Button>
      </form>
    </Box>
  );
};
const Security = () => {
  return (
    <Box>
      <Text color="#222222" fontWeight={500} fontSize={"14px"} mb={5}>
        Account Setting
      </Text>
      <form style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        <Input
          type="password"
          name="password"
          handleChange={() => console.log("Holla world!")}
          placeholder=""
          value=""
          label="Current Password"
        />
        <Input
          type="password"
          name="newPassword"
          handleChange={() => console.log("Holla world!")}
          placeholder=""
          value=""
          label="New Password"
        />
        <Input
          type="password"
          name="confirmNewPassword"
          handleChange={() => console.log("Holla world!")}
          placeholder=""
          value=""
          label="Confirm New Password"
        />
        <Button variant="solid" bg="#222222" width={"fit-content"}>
          Save Changes
        </Button>
      </form>
    </Box>
  );
};
const Preference = () => {
  return <Box></Box>;
};

export const Profile = () => {
  const tabOptions = [
    {
      title: "Account",
      value: "account",
      children: <Account />,
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
      <Flex gap={"40px"}>
        <Box
          border="1px solid #E9E9E9"
          py={2.5}
          px={3}
          borderRadius={"12px"}
          mb={6}
          width={"40%"}
        >
          <Flex
            mb={4}
            alignItems="center"
            gap={4}
            justifyContent={"space-between"}
          >
            <Box display="flex" height="83px" width="63px" borderRadius="full">
              <Image src={user} alt="Owner Avatar" height="100%" width="100%" />
            </Box>
            <Text
              textAlign="center"
              fontSize={"12px"}
              border={"1px solid #C5FFBC"}
              color={"#FFFFFF"}
              bg="#106104"
              py="5px"
              px="17px"
              borderRadius="37.74px"
            >
              Super Admin
            </Text>
          </Flex>
          <Box width="full" mb={3}>
            <Text fontSize="20px" color="#222222" fontWeight="700" mb={2}>
              Kathleen Rose
            </Text>
            <Text fontSize="14px" color="#737373">
              Lagos, Nigeria
            </Text>
          </Box>
          <Box display="flex" flexDirection={"column"} gap={5}>
            <Flex gap={3} alignItems={"center"} color="#737373">
              <Mail size={16} />
              <Text fontWeight={500} fontSize="14px">
                jan_solis@gmail.com
              </Text>
            </Flex>
            <Flex gap={3} alignItems={"center"} color="#737373">
              <Phone size={16} />
              <Text fontWeight={500} fontSize="14px">
                +2492340789850
              </Text>
            </Flex>
            <Flex gap={3} alignItems={"center"} color="#737373">
              <UserPlus size={16} />
              <Text fontWeight={500} fontSize="14px">
                Joined on March 4, 2023
              </Text>
            </Flex>
            <Flex gap={3} alignItems={"center"} color="#737373">
              <Calendar size={16} />
              <Text fontWeight={500} fontSize="14px">
                Last login: 2 hours ago
              </Text>
            </Flex>
          </Box>
        </Box>
        <Tab options={tabOptions} defaultValue="account" />
      </Flex>
    </PageLayout>
  );
};
