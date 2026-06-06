"use client";

import { Box, Text } from "@chakra-ui/react";
import { Eye } from "lucide-react";
import { useState } from "react";
import { TableComponent } from "~/modules/shared/table";
import { Menu, MenuItem } from "~/modules/shared";
import type { TransactionItem } from "~/hooks/queries/transaction/transaction.type";
import { formatAmount, formatDateTime, getStatusStyles } from "~/modules/util";
import { TransactionDetailsModal } from "./transaction-details-modal";

interface TransactionsTableProps {
  data?: TransactionItem[];
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
  loading: boolean;
  emptyDescription?: string;
}

type TransactionTableRow = TransactionItem & { action?: string };

const getPaymentStatusStyles = (status?: string) => {
  const normalized = status?.trim().toLowerCase();

  if (normalized === "paid") return getStatusStyles("completed");
  if (normalized === "created") return getStatusStyles("pending");

  return getStatusStyles(normalized || "pending");
};

const TransactionsTable: React.FC<TransactionsTableProps> = ({
  data = [],
  currentPage,
  onPageChange,
  totalPages,
  loading,
  emptyDescription,
}) => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionItem | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const openDetails = (item: TransactionTableRow) => {
    setSelectedTransaction(item);
    window.setTimeout(() => setDetailsOpen(true), 0);
  };

  const closeDetails = () => {
    setDetailsOpen(false);
    window.setTimeout(() => setSelectedTransaction(null), 200);
  };

  const textProps = {
    color: "#737373",
    fontWeight: 500,
    fontSize: "14px",
  };

  const cellRenderers = {
    transactionId: (item: TransactionTableRow) => (
      <Text {...textProps} minW="180px" fontSize="13px">
        {item.transactionId || "—"}
      </Text>
    ),

    amount: (item: TransactionTableRow) => (
      <Text {...textProps} color="#222222" fontWeight={600} whiteSpace="nowrap">
        {formatAmount(item.amount)}
      </Text>
    ),

    feeType: (item: TransactionTableRow) => (
      <Text {...textProps} whiteSpace="nowrap">
        {item.feeType || "—"}
      </Text>
    ),

    paymentType: (item: TransactionTableRow) => (
      <Text {...textProps} whiteSpace="nowrap">
        {item.paymentType || "—"}
      </Text>
    ),

    paymentChannel: (item: TransactionTableRow) => (
      <Text {...textProps} whiteSpace="nowrap">
        {item.paymentChannel || "—"}
      </Text>
    ),

    paymentStatus: (item: TransactionTableRow) => {
      const { borderColor, bg, textColor } = getPaymentStatusStyles(
        item.paymentStatus
      );

      return (
        <Text
          border="1px solid"
          borderColor={borderColor}
          bg={bg}
          color={textColor}
          py="5px"
          px="12px"
          borderRadius="37.74px"
          width="fit-content"
          fontSize="13px"
          fontWeight={500}
          whiteSpace="nowrap"
        >
          {item.paymentStatus || "—"}
        </Text>
      );
    },

    description: (item: TransactionTableRow) => (
      <Text {...textProps} minW="200px" maxW="280px">
        {item.description || "—"}
      </Text>
    ),

    createdPaymentTime: (item: TransactionTableRow) => (
      <Text {...textProps} whiteSpace="nowrap">
        {item.createdPaymentTime
          ? formatDateTime(item.createdPaymentTime)
          : "—"}
      </Text>
    ),

    completePaymentTime: (item: TransactionTableRow) => (
      <Text {...textProps} whiteSpace="nowrap">
        {item.completePaymentTime
          ? formatDateTime(item.completePaymentTime)
          : "—"}
      </Text>
    ),

    action: (item: TransactionTableRow) => (
      <Menu>
        <Box>
          <MenuItem
            label="View details"
            icon={<Eye size={20} />}
            onClick={() => openDetails(item)}
            value="view"
            styleProps={{ color: "#222222" }}
          />
        </Box>
      </Menu>
    ),
  };

  const columnOrder: (keyof TransactionTableRow)[] = [
    "transactionId",
    "amount",
    "feeType",
    "paymentType",
    "paymentChannel",
    "paymentStatus",
    "description",
    "createdPaymentTime",
    "completePaymentTime",
    "action",
  ];

  const columnLabels = {
    transactionId: "Transaction ID",
    amount: "Amount",
    feeType: "Fee Type",
    paymentType: "Payment Type",
    paymentChannel: "Channel",
    paymentStatus: "Status",
    description: "Description",
    createdPaymentTime: "Created",
    completePaymentTime: "Completed",
    action: "",
  };

  return (
    <>
      <TableComponent<TransactionTableRow>
        tableData={data}
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages}
        cellRenderers={cellRenderers}
        columnOrder={columnOrder}
        columnLabels={columnLabels}
        isLoading={loading}
        scrollable
        showPagination={false}
        emptyDescription={emptyDescription}
      />

      <TransactionDetailsModal
        open={detailsOpen}
        transaction={selectedTransaction}
        onClose={closeDetails}
      />
    </>
  );
};

export default TransactionsTable;
