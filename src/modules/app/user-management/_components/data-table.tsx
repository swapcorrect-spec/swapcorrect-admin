"use client";

import { Text, Flex, Box } from "@chakra-ui/react";
import { Caution, Star } from "~/assets/images";
import { TableComponent } from "~/modules/shared/table";
import type { UsersData } from "~/types/base";
import { getStatusStyles } from "~/modules/util";
import { Flag, UserRound } from "lucide-react";
import { MenuItem, Menu } from "~/modules/shared";

interface iProps {
  data?: any;
  currentPage: number;
  onPageChange: (value: number) => void;
  totalPages: number;
  loading: boolean;
}

const UsersTable: React.FC<iProps> = ({
  data,
  currentPage,
  onPageChange,

  totalPages,
  loading,
}) => {
  const textProps = {
    color: "#737373",
    fontWeight: 500,
    fontSize: "14px",
  };

  const cellRenderers = {
    profile: (item: UsersData) => <Text {...textProps}>{item.profile}</Text>,

    trustScore: (item: UsersData) => (
      <Flex alignItems="center" gap="4px">
        <Text {...textProps}>{item?.trustScore}</Text>
        <Star />
      </Flex>
    ),

    swaps: (item: UsersData) => <Text {...textProps}>{item?.swaps}</Text>,

    status: (item: UsersData) => {
      const { borderColor, bg, textColor } = getStatusStyles(
        item?.status?.toLowerCase()
      );
      return (
        <Text
          borderColor={borderColor}
          bg={bg}
          color={textColor}
          py="5px"
          px="17px"
          borderRadius="37.74px"
          width={"fit-content"}
        >
          {item?.status}
        </Text>
      );
    },

    dateJoined: (item: UsersData) => (
      <Text {...textProps}>{item?.dateJoined}</Text>
    ),

    role: (item: UsersData) => (
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

    action: () => (
      <Menu>
        <Box>
          <MenuItem
            label="View profile"
            icon={<UserRound size={20} />}
            onClick={() => console.log("Message")}
            value="view"
            styleProps={{ color: "#222222" }}
          />
          <MenuItem
            label="Suspend"
            icon={<Caution />}
            onClick={() => console.log("View")}
            value="suspend"
            styleProps={{ color: "#007AFF" }}
          />
          <MenuItem
            label="Flag User"
            icon={<Flag size={20} />}
            onClick={() => console.log("Flag")}
            value="flag"
            styleProps={{ color: "#E42222" }}
          />
        </Box>
      </Menu>
    ),
  };

  const columnOrder: (keyof UsersData)[] = [
    "profile",
    "trustScore",
    "swaps",
    "status",
    "dateJoined",
    "role",
    "action",
  ];

  const columnLabels = {
    profile: "Profile",
    trustScore: "Trust Score",
    swaps: "Swaps",
    status: "Status",
    dateJoined: "Date Joined",
    role: "User Role",
    action: "",
  };

  return (
    <>
      <TableComponent<UsersData>
        tableData={data}
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={Math.ceil(totalPages / 10)}
        cellRenderers={cellRenderers}
        columnOrder={columnOrder}
        columnLabels={columnLabels}
        isLoading={loading}
      />
    </>
  );
};

export default UsersTable;
