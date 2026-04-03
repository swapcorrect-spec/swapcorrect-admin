import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import user from "~/assets/images/user.png";
import { TableComponent } from "~/modules/shared/table";
import type { ActivityData } from "~/types/base";

const Activity = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const textProps = {
    fontWeight: 500,
    fontSize: "14px",
  };

  const cellRenderers = {
    date: (item: ActivityData) => (
      <Text {...textProps} color="#222222">
        {item.date}
      </Text>
    ),

    action: (item: ActivityData) => (
      <Flex alignItems="center" gap="4px">
        <Text {...textProps} color="#222222">
          {item?.action}
        </Text>
      </Flex>
    ),
    user: (item: ActivityData) => (
      <Flex gap="4px" alignItems="center">
        <Box borderRadius={"full"} h={8} w={8}>
          <Image src={user} alt="Owner Avatar" height="100%" width="100%" />
        </Box>
        <Text {...textProps} color={"#222222"}>
          {item.user}
        </Text>
      </Flex>
    ),

    role: (item: ActivityData) => (
      <Text
        {...textProps}
        py="5px"
        px="17px"
        borderRadius="37.74px"
        border="1px solid #EAEAEA"
        display={"flex"}
        width={"fit-content"}
      >
        {item?.role}
      </Text>
    ),
  };

  const columnOrder: (keyof ActivityData)[] = [
    "date",
    "action",
    "user",
    "role",
  ];

  const columnLabels = {
    date: "Date & Time",
    action: "Action",
    user: "User",
    role: "Role",
  };
  const data = [
    {
      date: "May 20, 2024 2:30 PM",
      action: "Suspended user",
      user: "Tosin Ajanlekoko",
      role: "Swapper",
    },
  ];

  return (
    <Box>
      <TableComponent<ActivityData>
        tableData={data}
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={Math.ceil(1)}
        cellRenderers={cellRenderers}
        columnOrder={columnOrder}
        columnLabels={columnLabels}
        isLoading={false}
      />
    </Box>
  );
};

export default Activity;
