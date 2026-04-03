import { Text, Flex, Box } from "@chakra-ui/react";
import { Bell, Book, Lock, Settings, Users } from "lucide-react";
import { useMemo, useState } from "react";
import PageLayout from "~/modules/layout/page-layout";
import General from "./_components/general";
import AuditLogs from "./_components/audit-logs";
import Security from "./_components/security";
import Notification from "./_components/notification";
import RoleAndAccess from "./_components/roles-access";

export const UserSettings = () => {
  const tabs = [
    { label: "General", value: "general", icon: <Settings /> },
    { label: "Roles & Access", value: "role_access", icon: <Users /> },
    { label: "Notifications", value: "notifications", icon: <Bell /> },
    { label: "Security", value: "security", icon: <Lock /> },
    { label: "Audit Logs", value: "audit_logs", icon: <Book /> },
  ];
  const [activeTab, setActiveTab] = useState<string>("general");
  const renderItem = useMemo(() => {
    switch (activeTab) {
      case "general":
        return <General />;
      case "role_access":
        return <RoleAndAccess />;
      case "notifications":
        return <Notification />;
      case "security":
        return <Security />;
      case "audit_logs":
        return <AuditLogs />;

      default:
        return <General />;
    }
  }, [activeTab]);
  return (
    <PageLayout p={"0px 24px 0px 0px"}>
      <Box display="flex" h="100%" gap={"60px"}>
        <Flex
          gap={3}
          flexDirection={"column"}
          maxW={"296px"}
          w="100%"
          border="1px solid #E9E9E9"
          px={3}
          py={10}
          h="100%"
        >
          {tabs.map((tab) => {
            const isActive = tab.value === activeTab;
            return (
              <Flex
                key={tab.value}
                align="center"
                p={4}
                gap={4}
                borderRadius="md"
                cursor="pointer"
                border={
                  isActive ? "1px solid #E3E3E3" : "1px solid transparent"
                }
                bg={isActive ? "#F4F4F4" : "transparent"}
                _hover={{
                  border: "1px solid #E3E3E3",
                  bg: "#F4F4F4",
                  color: "#222222",
                }}
                color={isActive ? "#222222" : "#737373"}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.icon}
                <Text fontWeight="medium">{tab.label}</Text>
              </Flex>
            );
          })}
        </Flex>
        <Box w="100%">{renderItem}</Box>
      </Box>
    </PageLayout>
  );
};
