"use client";

import { Text, Flex, Box } from "@chakra-ui/react";
import { TableComponent } from "~/modules/shared/table";
import type { FlagData } from "~/types/base";
import { formatDateTime, getStatusStyles } from "~/modules/util";
import { Menu, MenuItem } from "~/modules/shared";
import {
  Book,
  Check,
  Flag,
  OctagonAlert,
  TriangleAlert,
  X,
} from "lucide-react";
import { useNavigate } from "react-router";
import { PATHS } from "~/modules/_constants/paths";

interface iProps {
  data?: FlagData[];
  currentPage: number;
  onPageChange: (value: number) => void;
  totalPages: number;
  loading: boolean;
  emptyDescription?: string;
}

const FlagsAndReportTable: React.FC<iProps> = ({
  data,
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
  };

  const cellRenderers = {
    reporter: (item: FlagData) => (
      <Flex gap="4px" alignItems="center">
        <Box borderRadius={"full"} h={8} w={8}></Box>
        <Text {...textProps} color={"#222222"}>
          {item.reporter}
        </Text>
      </Flex>
    ),
    type: (item: FlagData) => <Text {...textProps}>{item?.type}</Text>,
    reportedEntity: (item: FlagData) => (
      <Flex gap="4px" alignItems="center">
        <Box borderRadius={"full"} h={8} w={8}></Box>
        <Text {...textProps} color={"#222222"}>
          {item.reportedEntity}
        </Text>
      </Flex>
    ),
    reason: (item: FlagData) => <Text {...textProps}>{item?.reason}</Text>,
    createdAt: (item: FlagData) => (
      <Text {...textProps}>{formatDateTime(item?.createdAt)}</Text>
    ),
    status: (item: FlagData) => {
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
    action: (item: FlagData) => (
      <Menu>
        <Box>
          <MenuItem
            label="View details"
            icon={<Book size={20} />}
            onClick={() =>
              item.reportId &&
              navigate(`${PATHS.FLAGSANDREPORTS}/${item.reportId}`)
            }
            value="view"
            styleProps={{ color: "#222222" }}
          />

          <MenuItem
            label="Mark resolved"
            icon={<Check size={20} />}
            onClick={() => console.log("Hello world!")}
            value="resolved"
            styleProps={{ color: "#222222" }}
          />
          <MenuItem
            label="Dismiss"
            icon={<X size={20} />}
            onClick={() => console.log("Hello world!")}
            value="dismiss"
            styleProps={{ color: "#222222" }}
          />
          <MenuItem
            label="Warn user"
            icon={<TriangleAlert size={20} />}
            onClick={() => console.log("View")}
            value="warn"
            styleProps={{ color: "#222222" }}
          />
          <MenuItem
            label="Suspend user"
            icon={<OctagonAlert size={20} />}
            onClick={() => console.log("View")}
            value="suspend"
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

  const columnOrder: (keyof FlagData)[] = [
    "reporter",
    "type",
    "reportedEntity",
    "reason",
    "createdAt",
    "status",
    "action",
  ];

  const columnLabels = {
    reporter: "Reporter",
    type: "Type",
    reportedEntity: "Reported Entity",
    reason: "Reason",
    createdAt: "Date",
    status: "Status",
    action: "",
  };

  return (
    <>
      <TableComponent<FlagData>
        tableData={data ?? []}
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages}
        cellRenderers={cellRenderers}
        columnOrder={columnOrder}
        columnLabels={columnLabels}
        isLoading={loading}
        emptyDescription={emptyDescription}
      />
    </>
  );
};

export default FlagsAndReportTable;
