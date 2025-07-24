"use client";

import { Table, Spinner, Flex, Box, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";
import type { DataItem, ITableProps } from "~/types/base";
import { Pagination } from "./pagination";

type CellRenderer<T> = (item: T, column: keyof T) => ReactNode;

export interface EnhancedTableProps<T extends DataItem> extends ITableProps<T> {
  cellRenderers?: Partial<Record<keyof T, CellRenderer<T>>>;
  columnOrder?: (keyof T)[];
  columnLabels?: Partial<Record<keyof T, string>>;
  isLoading?: boolean;
  showPagination?: boolean;
}

export function TableComponent<T extends DataItem>({
  tableData,
  currentPage = 1,
  totalPages = 10,
  onPageChange,
  cellRenderers = {},
  columnOrder,
  columnLabels = {},
  isLoading = true,
}: EnhancedTableProps<T>) {
  const columns =
    columnOrder ||
    (tableData.length ? (Object.keys(tableData[0]) as (keyof T)[]) : []);
  const safeOnPageChange = onPageChange ?? (() => {});

  const formatColumnName = (name: string) => {
    return (
      columnLabels[name as keyof T] ||
      name.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
    );
  };

  const renderCellContent = (item: T, column: keyof T) => {
    if (cellRenderers[column]) {
      return cellRenderers[column]!(item, column);
    }
    return String(item[column]);
  };

  if (isLoading) {
    return (
      <Flex align="center" justify="center" h="50vh">
        <Spinner size="lg" />
      </Flex>
    );
  }

  if (tableData.length === 0) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        h="50vh"
        color="gray.500"
      >
        {/* <EmptyProductIcon /> */}
        <Text fontSize="sm" mt={2}>
          No data available
        </Text>
      </Flex>
    );
  }

  return (
    <Box w="full">
      <Box
        borderWidth="1px"
        borderColor="gray.100"
        rounded="md"
        overflow="hidden"
        mb={6}
      >
        <Table.Root size="md" variant="outline">
          {/* Table Header */}
          <Table.Header bg="#FAFAFA">
            <Table.Row>
              {columns.map((column, index) => (
                <Table.ColumnHeader
                  key={String(column)}
                  px={index === 0 ? "16px" : "8px"}
                  py="12px"
                  fontWeight={500}
                  fontSize="sm"
                  color="#737373"
                >
                  {formatColumnName(String(column))}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>

          {/* Table Body */}
          <Table.Body>
            {tableData.map((item, rowIndex) => (
              <Table.Row
                key={rowIndex}
                _hover={{ bg: "gray.50", cursor: "pointer" }}
                borderBottom="1px solid"
                borderColor="gray.50"
              >
                {columns.map((column, colIndex) => (
                  <Table.Cell
                    key={String(column)}
                    px={colIndex === 0 ? "16px" : "8px"}
                    py="12px"
                    color="#111827"
                    borderBottom="1px solid #EAEAEA"
                  >
                    {renderCellContent(item, column)}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={safeOnPageChange}
      />
    </Box>
  );
}
