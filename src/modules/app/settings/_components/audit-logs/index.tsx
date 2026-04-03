import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Header } from "~/modules/shared";
import { TableComponent } from "~/modules/shared/table";
import type { AuditData } from "~/types/base";
import user from "~/assets/images/user.png";
import { formatDateTime } from "~/modules/util";

const AuditLogs = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  const textProps = {
    color: "#737373",
    fontWeight: 500,
    fontSize: "14px",
  };

  const cellRenderers = {
    action: (item: AuditData) => (
      <Text {...textProps} color={"#222222"}>
        {item.action}
      </Text>
    ),
    user: (item: AuditData) => (
      <Flex gap="4px" alignItems="center">
        <Box borderRadius={"full"} h={8} w={8}>
          <Image src={user} alt="Owner Avatar" height="100%" width="100%" />
        </Box>
        <Text {...textProps} color={"#222222"}>
          {item.user}
        </Text>
      </Flex>
    ),

    performedBy: (item: AuditData) => (
      <Flex gap="4px" alignItems="center">
        <Box borderRadius={"full"} h={8} w={8}>
          <Image src={user} alt="Owner Avatar" height="100%" width="100%" />
        </Box>
        <Text {...textProps} color={"#222222"}>
          {item.performedBy}
        </Text>
      </Flex>
    ),
    timeStamp: (item: AuditData) => (
      <Text {...textProps}>{formatDateTime(item?.timeStamp)}</Text>
    ),
  };

  const columnOrder: (keyof AuditData)[] = [
    "action",
    "user",
    "performedBy",
    "timeStamp",
  ];

  const columnLabels = {
    action: "Action",
    user: "User",
    performedBy: "Performed by",
    timeStamp: "Timestamp",
  };
  const data = [
    {
      action: "Suspended User",
      user: "Emanuel",
      performedBy: "Emanuel",
      timeStamp: "2025-08-05T16:45:23.123Z",
    },
    {
      action: "Suspended User",
      user: "Emanuel",
      performedBy: "Emanuel",
      timeStamp: "2025-08-05T16:45:23.123Z",
    },
    {
      action: "Suspended User",
      user: "Emanuel",
      performedBy: "Emanuel",
      timeStamp: "2025-08-05T16:45:23.123Z",
    },
    {
      action: "Suspended User",
      user: "Emanuel",
      performedBy: "Emanuel",
      timeStamp: "2025-08-05T16:45:23.123Z",
    },
    {
      action: "Suspended User",
      user: "Emanuel",
      performedBy: "Emanuel",
      timeStamp: "2025-08-05T16:45:23.123Z",
    },
    {
      action: "Suspended User",
      user: "Emanuel",
      performedBy: "Emanuel",
      timeStamp: "2025-08-05T16:45:23.123Z",
    },
    {
      action: "Suspended User",
      user: "Emanuel",
      performedBy: "Emanuel",
      timeStamp: "2025-08-05T16:45:23.123Z",
    },
    {
      action: "Suspended User",
      user: "Emanuel",
      performedBy: "Emanuel",
      timeStamp: "2025-08-05T16:45:23.123Z",
    },
    {
      action: "Suspended User",
      user: "Emanuel",
      performedBy: "Emanuel",
      timeStamp: "2025-08-05T16:45:23.123Z",
    },
    {
      action: "Suspended User",
      user: "Emanuel",
      performedBy: "Emanuel",
      timeStamp: "2025-08-05T16:45:23.123Z",
    },
    {
      action: "Suspended User",
      user: "Emanuel",
      performedBy: "Emanuel",
      timeStamp: "2025-08-05T16:45:23.123Z",
    },
  ];

  return (
    <Box my={10}>
      <Flex justifyContent="space-between" alignItems="center" mb={7}>
        <Header
          title="Audit Log"
          description="Track all administrative actions on the platform"
        />
      </Flex>
      <TableComponent<AuditData>
        tableData={data}
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={Math.ceil(10)}
        cellRenderers={cellRenderers}
        columnOrder={columnOrder}
        columnLabels={columnLabels}
        isLoading={false}
      />
    </Box>
  );
};

export default AuditLogs;
