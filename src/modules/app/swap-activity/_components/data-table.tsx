"use client";

import { Text, Flex, Box, Image } from "@chakra-ui/react";
import { TableComponent } from "~/modules/shared/table";
import type { SwapActivityData } from "~/types/base";
import {
  createImageErrorHandler,
  formatDateTime,
  getImageSrcWithFallback,
  getStatusStyles,
  getSwapStatusStyles,
} from "~/modules/util";
import { ArrowLeft, ArrowRight, Flag, OctagonAlert, Book } from "lucide-react";
import { MenuItem, Menu } from "~/modules/shared";
import { useNavigate } from "react-router";
import { PATHS } from "~/modules/_constants/paths";
import { useState } from "react";
import user from "~/assets/images/user.png";
import {
  SwapFlagConfirm,
  type SwapFlagSummary,
} from "./swap-flag-confirm";


interface iProps {
  data?: any;
  currentPage: number;
  onPageChange: (value: number) => void;
  totalPages: number;
  loading: boolean;
  emptyDescription?: string;
}

const SwapActivityTable: React.FC<iProps> = ({
  data,
  currentPage,
  onPageChange,
  totalPages,
  loading,
  emptyDescription,
}) => {
  const navigate = useNavigate();
  const [profileImageError, setProfileImageError] = useState(false);
  const [flagOpen, setFlagOpen] = useState(false);
  const [selectedSwap, setSelectedSwap] = useState<SwapFlagSummary | null>(null);

  const openFlag = (item: SwapActivityData) => {
    setSelectedSwap({
      swapProceedId: item.swapProceedId,
      swapperOne: item.swapperOne,
      swapperTwo: item.swapperTwo,
      listedItem: item.listedItem,
      swapperRequestItem: item.swapperRequestItem,
      status: item.status,
      isFlagged: item.isFlagged ?? false,
    });
    setFlagOpen(true);
  };

  const closeFlag = () => {
    setFlagOpen(false);
    setSelectedSwap(null);
  };
  const textProps = {
    color: "#737373",
    fontWeight: 500,
    fontSize: "14px",
    whiteSpace: "nowrap" as const,
  };

  const cellRenderers = {
    swappers: (item: SwapActivityData) => (
      <Flex gap="8px" alignItems="center" flexWrap="nowrap" minW="max-content">
        <Box
          w="fit-content"
          display="flex"
          height="32px"
          width="32px"
          borderRadius="full"
          overflow="hidden"
        >
        <Image
            src={getImageSrcWithFallback(
              item.swapperImage || "",
              profileImageError || !item.swapperImage,
              user
            )}
            alt="Owner Avatar"
            borderRadius="full"
            height="100%"
            width="100%"
            onError={createImageErrorHandler(setProfileImageError)}
          />
        </Box>
        <Text {...textProps} color={"#222222"}>
          {item?.swapperOne || "N/A"}
        </Text>
  
        <ArrowLeft size={16} color="#737373" />
        <ArrowRight size={16} color="#737373" />
        <Box
          w="fit-content"
          display="flex"
          height="32px"
          width="32px"
          borderRadius="full"
          overflow="hidden"
        >
        <Image
            src={getImageSrcWithFallback(
              item.visitorImage || "",
              profileImageError || !item.visitorImage,
              user
            )}
            alt="Owner Avatar"
            borderRadius="full"
            height="100%"
            width="100%"
            onError={createImageErrorHandler(setProfileImageError)}
          />
        </Box>
        <Text {...textProps} color={"#222222"}>
          {item?.swapperTwo || "N/A"}
        </Text>
      </Flex>
    ),
    listedItem: (item: SwapActivityData) => (
      <Text {...textProps} color="#222222" maxW="280px" truncate title={item?.listedItem}>
        {item?.listedItem || "N/A"}
      </Text>
    ),
    swapperRequestItem: (item: SwapActivityData) => (
      <Text
        {...textProps}
        color="#222222"
        maxW="280px"
        truncate
        title={item?.swapperRequestItem}
      >
        {item?.swapperRequestItem || "N/A"}
      </Text>
    ),
    status: (item: SwapActivityData) => {
      const { borderColor, bg, textColor } = getSwapStatusStyles(item?.status);
      return (
        <Text
          border="1px solid"
          borderColor={borderColor}
          bg={bg}
          color={textColor}
          py="5px"
          px="17px"
          borderRadius="37.74px"
          width="fit-content"
          fontWeight={500}
          fontSize="13px"
          whiteSpace="nowrap"
        >
          {item?.status || "N/A"}
        </Text>
      );
    },
    isFlagged: (item: SwapActivityData) => {
      const flagged = item.isFlagged === true;
      const { borderColor, bg, textColor } = flagged
        ? getStatusStyles("flagged")
        : getStatusStyles("suspended");

      return (
        <Text
          border="1px solid"
          borderColor={borderColor}
          bg={bg}
          color={textColor}
          py="5px"
          px="17px"
          borderRadius="37.74px"
          width="fit-content"
          fontWeight={500}
          fontSize="13px"
          whiteSpace="nowrap"
        >
          {flagged ? "true" : "false"}
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
    action: (item: SwapActivityData) => (
      <Menu>
        <Box>
          <MenuItem
            label="View details"
            icon={<Book size={20} />}
            onClick={() => navigate(`${PATHS.SWAPACTIVITY}/${item.swapProceedId}`)}
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
            label={item.isFlagged ? "Unflag Swap" : "Flag Swap"}
            icon={<Flag size={20} />}
            onClick={() => openFlag(item)}
            value="flag"
            styleProps={{ color: "#E42222" }}
          />
        </Box>
      </Menu>
    ),
  };

  const columnOrder: (keyof SwapActivityData)[] = [
    "swappers",
    "listedItem",
    "swapperRequestItem",
    "status",
    "isFlagged",
    "createdAt",
    "updatedAt",
    "action",
  ];

  const columnLabels = {
    swappers: "Swappers",
    listedItem: "Listed Item(s)",
    swapperRequestItem: "Swapper Request Item(s)",
    status: "Status",
    isFlagged: "Flagged",
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
        scrollable
        emptyDescription={emptyDescription}
      />

      <SwapFlagConfirm
        open={flagOpen}
        swap={selectedSwap}
        onClose={closeFlag}
      />
    </>
  );
};

export default SwapActivityTable;
