"use client";

import { Text, Flex, Box } from "@chakra-ui/react";
import { TableComponent } from "~/modules/shared/table";
import type { SwapActivityData } from "~/types/base";
import { formatDateTime, getStatusStyles } from "~/modules/util";
import { ArrowLeft, ArrowRight, Flag, OctagonAlert, Book } from "lucide-react";
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

  // Generate consistent color based on name
  const getAvatarColor = (name: string): string => {
    if (!name) return "#007AFF";
    const colors = [
      "#007AFF", // Blue
      "#34C759", // Green
      "#FF9500", // Orange
      "#FF3B30", // Red
      "#AF52DE", // Purple
      "#FF2D55", // Pink
      "#5AC8FA", // Light Blue
      "#FFCC00", // Yellow
      "#5856D6", // Indigo
      "#FF9500", // Orange
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const cellRenderers = {
    swappers: (item: SwapActivityData) => (
      <Flex gap="4px" alignItems="center">
        <Box
          borderRadius={"full"}
          h={8}
          w={8}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg={getAvatarColor(item?.swapperOne || "")}
          color="white"
          fontSize="12px"
          fontWeight="600"
          flexShrink={0}
        >
          {item?.swapperOneInitials || "N/A"}
        </Box>
        <Text {...textProps} color={"#222222"}>
          {item?.swapperOne || "N/A"}
        </Text>
        <ArrowLeft size={16} color="#737373" />
        <ArrowRight size={16} color="#737373" />
        <Box
          borderRadius={"full"}
          h={8}
          w={8}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg={getAvatarColor(item?.swapperTwo || "")}
          color="white"
          fontSize="12px"
          fontWeight="600"
          flexShrink={0}
        >
          {item?.swapperTwoInitials || "N/A"}
        </Box>
        <Text {...textProps} color={"#222222"}>
          {item?.swapperTwo || "N/A"}
        </Text>
      </Flex>
    ),
    items: (item: SwapActivityData) => (
      <Flex alignItems="center" gap="4px">
        <Text {...textProps} color={"#222222"}>
          {item?.itemOne || "N/A"}
        </Text>
        <ArrowLeft size={16} color="#737373" />
        <ArrowRight size={16} color="#737373" />
        <Text {...textProps} color={"#222222"}>
          {item?.itemTwo || "N/A"}
        </Text>
      </Flex>
    ),
    status: (item: SwapActivityData) => {
      const { borderColor, bg, textColor } = getStatusStyles(
        item?.status?.toLowerCase() || "pending"
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
          {item?.status || "N/A"}
        </Text>
      );
    },
    createdAt: (item: SwapActivityData) => (
      <Text {...textProps}>
        {item?.createdAt ? formatDateTime(item.createdAt) : "N/A"}
      </Text>
    ),
    updatedAt: (item: SwapActivityData) => (
      <Text {...textProps}>
        {item?.updatedAt ? formatDateTime(item.updatedAt) : "N/A"}
      </Text>
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
        tableData={data || []}
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages || 1}
        cellRenderers={cellRenderers}
        columnOrder={columnOrder}
        columnLabels={columnLabels}
        isLoading={loading}
      />
    </>
  );
};

export default SwapActivityTable;
