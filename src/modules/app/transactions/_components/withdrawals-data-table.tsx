"use client";

import { Box, Text } from "@chakra-ui/react";
import { Check, Eye } from "lucide-react";
import { useMemo, useState } from "react";
import { TableComponent } from "~/modules/shared/table";
import { Menu, MenuItem } from "~/modules/shared";
import type { WithdrawalItem } from "~/hooks/queries/withdrawal/withdrawal.type";
import {
  getWithdrawalStatus,
  isWithdrawalPending,
} from "~/hooks/queries/withdrawal/withdrawal.type";
import { formatDateTime, formatMoney, getStatusStyles } from "~/modules/util";
import { WithdrawalDetailsModal } from "./withdrawal-details-modal";
import { WithdrawalTreatConfirm } from "./withdrawal-treat-confirm";

interface WithdrawalsTableProps {
  data?: WithdrawalItem[];
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
  loading: boolean;
  emptyDescription?: string;
}

type WithdrawalTableRow = WithdrawalItem & { action?: string };

const HIDDEN_COLUMNS = new Set(["action", "userid", "userfullname"]);

const isAmountKey = (key: string) => key.toLowerCase().includes("amount");

const formatCellValue = (key: string, value: unknown): string => {
  if (value == null || value === "") return "—";
  if (typeof value === "object") return JSON.stringify(value);

  const keyName = key.toLowerCase();

  if (isAmountKey(keyName)) {
    const num = Number(value);
    return Number.isFinite(num) ? formatMoney(num) : String(value);
  }

  if (
    typeof value === "string" &&
    (keyName.includes("date") ||
      keyName.includes("created") ||
      keyName.includes("updated") ||
      keyName.includes("time"))
  ) {
    return formatDateTime(value);
  }

  return String(value);
};

const getWithdrawalStatusStyles = (status?: string) => {
  const normalized = status?.trim().toLowerCase();

  if (normalized === "treated" || normalized === "paid" || normalized === "completed") {
    return getStatusStyles("completed");
  }
  if (normalized === "pending" || normalized === "created") {
    return getStatusStyles("pending");
  }

  return getStatusStyles(normalized || "pending");
};

const WithdrawalsTable: React.FC<WithdrawalsTableProps> = ({
  data = [],
  currentPage,
  onPageChange,
  totalPages,
  loading,
  emptyDescription,
}) => {
  const [selectedWithdrawal, setSelectedWithdrawal] =
    useState<WithdrawalItem | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [treatWithdrawal, setTreatWithdrawal] =
    useState<WithdrawalItem | null>(null);
  const [treatOpen, setTreatOpen] = useState(false);

  const openDetails = (item: WithdrawalTableRow) => {
    setSelectedWithdrawal(item);
    window.setTimeout(() => setDetailsOpen(true), 0);
  };

  const closeDetails = () => {
    setDetailsOpen(false);
    window.setTimeout(() => setSelectedWithdrawal(null), 200);
  };

  const openTreat = (item: WithdrawalTableRow) => {
    setTreatWithdrawal(item);
    window.setTimeout(() => setTreatOpen(true), 0);
  };

  const closeTreat = () => {
    setTreatOpen(false);
    window.setTimeout(() => setTreatWithdrawal(null), 200);
  };

  const textProps = {
    color: "#737373",
    fontWeight: 500,
    fontSize: "14px",
  };

  const columnOrder = useMemo(() => {
    const sample = data[0];
    const keys = sample
      ? Object.keys(sample).filter(
          (key) => !HIDDEN_COLUMNS.has(key.toLowerCase()),
        )
      : ["status", "amount", "createdAt"];

    return [...keys, "action"] as (keyof WithdrawalTableRow)[];
  }, [data]);

  const cellRenderers = useMemo(() => {
    const renderers: Partial<
      Record<
        keyof WithdrawalTableRow,
        (item: WithdrawalTableRow, column: keyof WithdrawalTableRow) => React.ReactNode
      >
    > = {};

    columnOrder.forEach((key) => {
      if (key === "action") return;

      if (key.toString().toLowerCase() === "status") {
        renderers[key] = (item) => {
          const value = String(item[key] ?? "");
          const { borderColor, bg, textColor } = getWithdrawalStatusStyles(value);

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
              {value || "—"}
            </Text>
          );
        };
        return;
      }

      renderers[key] = (item) => (
        <Text {...textProps} whiteSpace="nowrap">
          {formatCellValue(String(key), item[key])}
        </Text>
      );
    });

    renderers.action = (item) => {
      const status = getWithdrawalStatus(item);
      const canTreat = isWithdrawalPending(status);

      return (
        <Menu>
          <Box>
            <MenuItem
              label="View details"
              icon={<Eye size={20} />}
              onClick={() => openDetails(item)}
              value="view"
              styleProps={{ color: "#222222" }}
            />
            {canTreat && (
              <MenuItem
                label="Treat withdrawal"
                icon={<Check size={20} />}
                onClick={() => openTreat(item)}
                value="treat"
                styleProps={{ color: "#106104" }}
              />
            )}
          </Box>
        </Menu>
      );
    };

    return renderers;
  }, [columnOrder]);

  return (
    <>
      <TableComponent<WithdrawalTableRow>
        tableData={data}
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages}
        cellRenderers={cellRenderers}
        columnOrder={columnOrder}
        isLoading={loading}
        scrollable
        showPagination={false}
        emptyDescription={emptyDescription}
      />

      <WithdrawalDetailsModal
        open={detailsOpen}
        withdrawal={selectedWithdrawal}
        onClose={closeDetails}
      />

      <WithdrawalTreatConfirm
        open={treatOpen}
        withdrawal={treatWithdrawal}
        onClose={closeTreat}
      />
    </>
  );
};

export default WithdrawalsTable;
