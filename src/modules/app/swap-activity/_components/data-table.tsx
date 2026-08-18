"use client";

import { Text, Box } from "@chakra-ui/react";
import { TableComponent } from "~/modules/shared/table";
import type { SwapActivityData } from "~/types/base";
import { formatDateTime, getSwapStatusStyles } from "~/modules/util";
import { Book } from "lucide-react";
import { MenuItem, Menu } from "~/modules/shared";
import { useNavigate } from "react-router";
import { PATHS } from "~/modules/_constants/paths";
import { toast } from "sonner";

type SwapActivityTableRow = SwapActivityData;
type SwapActivityColumn = keyof SwapActivityTableRow;

interface SwapActivityTableProps {
  data?: SwapActivityTableRow[];
  currentPage: number;
  onPageChange: (value: number) => void;
  totalPages: number;
  loading: boolean;
  emptyDescription?: string;
}

const COLUMN_ORDER: SwapActivityColumn[] = [
  "ownerName",
  "ownerItem",
  "swapperName",
  "swapperItem",
  "status",
  "initiatedOn",
  "lastActivity",
  "action",
];

const COLUMN_LABELS: Partial<Record<SwapActivityColumn, string>> = {
  ownerName: "Owner",
  ownerItem: "Owner Item",
  swapperName: "Swapper",
  swapperItem: "Swapper Item",
  status: "Status",
  initiatedOn: "Date Initiated",
  lastActivity: "Last Activity",
  action: "",
};

const SwapActivityTable: React.FC<SwapActivityTableProps> = ({
  data = [],
  currentPage,
  onPageChange,
  totalPages,
  loading,
  emptyDescription,
}) => {
  const navigate = useNavigate();

  const textProps = {
    color: "#737373",
    fontWeight: 500,
    fontSize: "14px",
    whiteSpace: "nowrap" as const,
  };

  const nameTextProps = {
    ...textProps,
    color: "#222222",
  };

  const cellRenderers = {
    ownerName: (item: SwapActivityTableRow) => (
      <Text {...nameTextProps}>{item.ownerName || "N/A"}</Text>
    ),
    ownerItem: (item: SwapActivityTableRow) => (
      <Text {...nameTextProps} maxW="220px" truncate title={item.ownerItem}>
        {item.ownerItem || "N/A"}
      </Text>
    ),
    swapperName: (item: SwapActivityTableRow) => (
      <Text {...nameTextProps}>{item.swapperName || "N/A"}</Text>
    ),
    swapperItem: (item: SwapActivityTableRow) => (
      <Text {...nameTextProps} maxW="220px" truncate title={item.swapperItem}>
        {item.swapperItem || "N/A"}
      </Text>
    ),
    status: (item: SwapActivityTableRow) => {
      const { borderColor, bg, textColor } = getSwapStatusStyles(item.status);
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
          {item.status || "N/A"}
        </Text>
      );
    },
    initiatedOn: (item: SwapActivityTableRow) => (
      <Text {...textProps}>
        {item.initiatedOn ? formatDateTime(item.initiatedOn) : "N/A"}
      </Text>
    ),
    lastActivity: (item: SwapActivityTableRow) => (
      <Text {...textProps}>
        {item.lastActivity ? formatDateTime(item.lastActivity) : "N/A"}
      </Text>
    ),
    action: (item: SwapActivityTableRow) => (
      <Menu>
        <Box onClick={(event) => event.stopPropagation()}>
          <MenuItem
            label="View details"
            icon={<Book size={20} />}
            onClick={() => {
              if (!item.swapProceedId) {
                toast.error("Swap details are not available for this record.");
                return;
              }
              navigate(`${PATHS.SWAPACTIVITY}/${item.swapProceedId}`);
            }}
            value="view"
            styleProps={{ color: "#222222" }}
          />
        </Box>
      </Menu>
    ),
  };

  return (
    <>
      <TableComponent<SwapActivityTableRow>
        tableData={data}
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages || 1}
        cellRenderers={cellRenderers}
        columnOrder={COLUMN_ORDER}
        columnLabels={COLUMN_LABELS}
        isLoading={loading}
        scrollable
        emptyDescription={emptyDescription}
      />
    </>
  );
};

export default SwapActivityTable;
