"use client";

import { Text, Flex, Box } from "@chakra-ui/react";
import { HorizontalDots } from "~/assets/images";
import { TableComponent } from "~/modules/shared/table";
import type { FlagData } from "~/types/base";
import { formatDateTime, getFlagStyles } from "~/modules/util";

interface iProps {
  data?: any;
  currentPage: number;
  onPageChange: (value: number) => void;
  totalPages: number;
  loading: boolean;
}

const FlagsAndReportTable: React.FC<iProps> = ({
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
      const { borderColor, bg, textColor } = getFlagStyles(
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
    action: () => (
      <Box>
        <HorizontalDots />
      </Box>
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

export default FlagsAndReportTable;
