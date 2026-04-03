import { Box, Flex, Text } from "@chakra-ui/react";
import { Button, Header, Input, Switch } from "~/modules/shared";

const General = () => {
  return (
    <Box mt={10}>
      <Header
        title="General Settings"
        description="Configure basic platform settings"
      />

      <Box w="711px" display="flex" flexDirection={"column"} gap={4} mt={10}>
        <Input
          type="text"
          name="platform"
          handleChange={() => console.log("Holla world!")}
          placeholder="SwapHub"
          value=""
          label="Platform Name"
        />
        <Input
          type="email"
          name="support_email"
          handleChange={() => console.log("Holla world!")}
          placeholder="sammy@gmail.com"
          value=""
          label="Support Email"
        />
        <Input
          type="number"
          name="swap_deadline"
          handleChange={() => console.log("Holla world!")}
          placeholder="30"
          value=""
          label="Swap Deadline(days)"
        />

        <Switch label="Require Manual Approval for Listings" />
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

export default General;
