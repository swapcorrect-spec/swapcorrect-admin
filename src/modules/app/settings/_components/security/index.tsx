import { Box, Text } from "@chakra-ui/react";
import { Button, Header, PasswordInput } from "~/modules/shared";

const Security = () => {
  return (
    <Box mt={10}>
      <Header
        title="Security"
        description="Update your password and keep your account secure"
      />

      <Box w="711px" mt={10}>
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
            <Text color="#fff">Save Changes</Text>
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Security;
