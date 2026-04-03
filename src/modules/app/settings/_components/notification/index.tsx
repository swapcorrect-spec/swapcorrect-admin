import { Box, Flex, Text } from "@chakra-ui/react";
import { Button, Header, Switch, Tab } from "~/modules/shared";

const Notification = () => {
  const tabOptions = [
    {
      title: "Email Alert",
      value: "email_alert",
      children: <Email />,
    },
    {
      title: "Push Notification",
      value: "push_notification",
      children: <Push />,
    },
    {
      title: "SMS Alert",
      value: "sms_alert",
      children: <SmsAlert />,
    },
  ];

  return (
    <Box mt={10}>
      <Header
        title="Notification Settings"
        description="Choose which events trigger admin alerts and how they’re delivered."
      />
      <Box my={10}>
        <Tab options={tabOptions} defaultValue="email_alert" />
      </Box>
    </Box>
  );
};

export default Notification;

const Email = () => {
  return (
    <Box>
      <Header
        title="Email Notification Settings"
        description="Configure which events trigger email notifications"
      />
      <Box display="flex" gap={5} flexDirection="column" mt={6}>
        <Switch
          label="Require Manual Approval for Listings"
          header="Flagged User Alert"
        />
        <Switch
          label="Receive notifications when a new dispute is opened"
          header="New Dispute"
        />
        <Switch
          label="Receive notifications when a new listing is created"
          header="New Listing"
        />
        <Switch
          label="Receive notifications about security events"
          header="Security Alert"
        />
        <Flex justifyContent={"end"} gap={3} mt={8}>
          <Button bg="#F6F6F6" width={"fit-content"}>
            <Text color="#737373">Cancel</Text>
          </Button>
          <Button bg="#222222" width={"fit-content"}>
            <Text color="#fff">Save changes</Text>
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

const Push = () => {
  return (
    <Box>
      <Header
        title="Push Notification Settings"
        description="Configure push notifications for mobile and desktop"
      />
      <Box display="flex" gap={5} flexDirection="column" mt={6}>
        <Switch
          label="Allow the platform to send push notifications"
          header="Enable Push Notifications"
        />
        <Switch
          label="Receive notifications when a new dispute is opened"
          header="New Dispute"
        />
        <Switch
          label="Only send push notifications for urgent matters"
          header="Urgent Alerts Only"
        />
        <Flex justifyContent={"end"} gap={3} mt={8}>
          <Button bg="#F6F6F6" width={"fit-content"}>
            <Text color="#737373">Cancel</Text>
          </Button>
          <Button bg="#222222" width={"fit-content"}>
            <Text color="#fff">Save changes</Text>
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

const SmsAlert = () => {
  return (
    <Box>
      <Header
        title="Sms Notification Settings"
        description="Configure SMS text message alerts"
      />
      <Box display="flex" gap={5} flexDirection="column" mt={6}>
        <Switch
          label="Allow the platform to send SMS text messages"
          header="Enable Sms Notifications"
        />
        <Flex justifyContent={"end"} gap={3} mt={8}>
          <Button bg="#F6F6F6" width={"fit-content"}>
            <Text color="#737373">Cancel</Text>
          </Button>
          <Button bg="#222222" width={"fit-content"}>
            <Text color="#fff">Save changes</Text>
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};
