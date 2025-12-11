import { Box, Flex, Text } from "@chakra-ui/react";
import { BadgeCheck, Mail, MapPin, Phone } from "lucide-react";
import { StarOutline } from "~/assets/images";
import { Button, Input } from "~/modules/shared";
import { Accordion } from "~/modules/shared/Accordion";

interface UserInfoProps {
  userData?: any;
}

const Contact: React.FC<{ userData?: any }> = ({ userData }) => {
  return (
    <Box display="flex" flexDirection={"column"} gap={5}>
      <Flex gap={3} alignItems={"center"} color="#737373">
        <Mail size={16} />
        <Text fontWeight={500} fontSize="14px">
          {userData?.email || "N/A"}
        </Text>
      </Flex>
      <Flex gap={3} alignItems={"center"} color="#737373">
        <Phone size={16} />
        <Text fontWeight={500} fontSize="14px">
          {userData?.phoneNumber || "N/A"}
        </Text>
      </Flex>
      <Flex gap={3} alignItems={"center"} color="#737373">
        <MapPin size={16} />
        <Text fontWeight={500} fontSize="14px">
          {userData?.deliveryAddress ? `${userData.deliveryAddress}, ${userData.city}, ${userData.state}, ${userData.country}` : "N/A"}
        </Text>
      </Flex>
    </Box>
  );
};

const Ratings: React.FC<{ userData?: any }> = ({ userData }) => {
  return (
    <Box display="flex" flexDirection={"column"} gap={5}>
      <Flex gap={3} alignItems={"center"} color="#737373">
        <StarOutline />
        <Text fontWeight={500} fontSize="14px">
          Ratings
        </Text>
        <Text fontWeight={500} fontSize="14px" color="#222222" ml="auto">
          {userData?.rating || 0}
        </Text>
      </Flex>
      <Flex gap={3} alignItems={"center"} color="#737373">
        <BadgeCheck size={16} color={userData?.isEmailConfirmed ? "#007AFF" : "#737373"} />
        <Text fontWeight={500} fontSize="14px">
          Email Verification
        </Text>
        <Text fontWeight={500} fontSize="14px" color="#222222" ml="auto">
          {userData?.isEmailConfirmed ? "Yes" : "No"}
        </Text>
      </Flex>
      <Button bg="transparent" variant="outline">
        Reset Ratings
      </Button>
    </Box>
  );
};

const AdminNotes = () => {
  return (
    <Box>
      <Box display={"flex"} flexDirection={"column"} gap={5} mb={5}>
        <Box>
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            mb={3.5}
            fontWeight={500}
            fontSize={"14px"}
          >
            <Text color="#007AFF">Admin 1</Text>
            <Text color="#737373">Apr 30, 2025</Text>
          </Flex>
          <Text color="#737373" fontSize={"14px"} fontStyle={"italic"}>
            User was warned about posting inappropriate content.
          </Text>
        </Box>
      </Box>

      <Input
        type="textarea"
        name="note"
        handleChange={() => console.log("Holla world!")}
        placeholder="Additional note"
        value="note"
      />
      <Button rounded="2xl" bg="#222222" m="20px 0px 0px 0px">
        <Text fontSize="14px" color="#ffffff" ml={2}>
          + Add Note
        </Text>
      </Button>
    </Box>
  );
};

const UserInfo: React.FC<UserInfoProps> = ({ userData }) => {
  const items = [
    {
      value: "contact_info",
      title: "Contact Information",
      children: <Contact userData={userData} />,
    },
    {
      value: "ratings",
      title: "Ratings & Verification",
      children: <Ratings userData={userData} />,
    },
    { value: "admin_notes", title: "Admin Notes", children: <AdminNotes /> },
  ];

  return (
    <Box>
      <Accordion items={items} />
    </Box>
  );
};

export default UserInfo;
