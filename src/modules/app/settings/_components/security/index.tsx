import { Box, Flex, Text } from "@chakra-ui/react";
import { Button, Header, Input, Switch } from "~/modules/shared";

const Security = () => {
  return (
    <Box mt={10}>
      <Header
        title="Secutiry & Login"
        description="Configure security settings and login policies"
      />

      <Box w="711px" mt={10}>
        <Text color="#222222" fontWeight={500} mb={5}>
          Enable 2FA for Admins
        </Text>
        <Switch label="Admins Require two-factor authentication for all admin accounts" />

        <Input
          type="number"
          name="session_timeout"
          handleChange={() => console.log("Holla world!")}
          placeholder="30"
          value=""
          label="Session Timeout"
        />
        <Text color="#737373" fontSize={"12px"} mb={3}>
          Time before an inactive session is automatically logged out
        </Text>
        <Input
          type="number"
          name="session_timeout"
          handleChange={() => console.log("Holla world!")}
          placeholder="30"
          value=""
          label="Maximum Login Attempts"
        />
        <Text color="#737373" fontSize={"12px"}>
          Number of failed attempts before account lockout
        </Text>
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

export default Security;
