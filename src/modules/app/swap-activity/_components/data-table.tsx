"use client";

import { Text, Flex, Box, Image } from "@chakra-ui/react";
import { TableComponent } from "~/modules/shared/table";
import type { SwapActivityData } from "~/types/base";
import { formatDateTime, getStatusStyles } from "~/modules/util";
import { ArrowLeft, ArrowRight, Flag, OctagonAlert, Book } from "lucide-react";
import user from "~/assets/images/user.png";
import { MenuItem, Menu } from "~/modules/shared";
import { useNavigate } from "react-router";
import { PATHS } from "~/modules/_constants/paths";

interface iProps {
  data?: any;
  currentPage: number;
  onPageChange: (value: number) => void;
  totalPages: number;
  loading: boolean;
}

const SwapActivityTable: React.FC<iProps> = ({
  data,
  currentPage,
  onPageChange,
  totalPages,
  loading,
}) => {
  const navigate = useNavigate();
  const textProps = {
    color: "#737373",
    fontWeight: 500,
    fontSize: "14px",
  };

  const cellRenderers = {
    swappers: (item: SwapActivityData) => (
      <Flex gap="4px" alignItems="center">
        <Box borderRadius={"full"} h={8} w={8}>
          <Image src={user} alt="Owner Avatar" height="100%" width="100%" />
        </Box>
        <Text {...textProps} color={"#222222"}>
          {item.swapperOne}
        </Text>
        <ArrowLeft size={16} color="#737373" />
        <ArrowRight size={16} color="#737373" />
        <Box borderRadius={"full"} h={8} w={8}>
          <Image src={user} alt="Owner Avatar" height="100%" width="100%" />
        </Box>
        <Text {...textProps} color={"#222222"}>
          {item.swapperTwo}
        </Text>
      </Flex>
    ),
    items: (item: SwapActivityData) => (
      <Flex alignItems="center" gap="4px">
        <Text {...textProps} color={"#222222"}>
          {item?.itemOne}
        </Text>
        <ArrowLeft size={16} color="#737373" />
        <ArrowRight size={16} color="#737373" />
        <Text {...textProps} color={"#222222"}>
          {item?.itemTwo}
        </Text>
      </Flex>
    ),
    status: (item: SwapActivityData) => {
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
    createdAt: (item: SwapActivityData) => (
      <Text {...textProps}>{formatDateTime(item?.createdAt)}</Text>
    ),
    updatedAt: (item: SwapActivityData) => (
      <Text {...textProps}>{formatDateTime(item?.updatedAt)}</Text>
    ),
    action: () => (
      <Menu>
        <Box>
          <MenuItem
            label="View details"
            icon={<Book size={20} />}
            onClick={() => navigate(`${PATHS.SWAPACTIVITY}/1`)}
            value="view"
            styleProps={{ color: "#222222" }}
          />
          <MenuItem
            label="Warn users"
            icon={<OctagonAlert size={20} />}
            onClick={() => console.log("View")}
            value="warn"
            styleProps={{ color: "#222222" }}
          />
          <MenuItem
            label="Flag Swap"
            icon={<Flag size={20} />}
            onClick={() => console.log("Flag")}
            value="flag"
            styleProps={{ color: "#E42222" }}
          />
        </Box>
      </Menu>
    ),
  };

  const columnOrder: (keyof SwapActivityData)[] = [
    "swappers",
    "items",
    "status",
    "createdAt",
    "updatedAt",
    "action",
  ];

  const columnLabels = {
    swappers: "Swappers",
    items: "Items",
    status: "Status",
    createdAt: "Date Initiated",
    updatedAt: "Last Activity",
    action: "",
  };

  return (
    <>
      <TableComponent<SwapActivityData>
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

export default SwapActivityTable;
