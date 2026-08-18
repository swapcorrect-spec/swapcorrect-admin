import { Box, Grid } from "@chakra-ui/react";
import { Input, QueryState, Select } from "~/modules/shared";
import { Pagination } from "~/modules/shared/pagination";
import { useMemo, useState } from "react";
import { useGetTransactions } from "~/hooks/queries/transaction/transaction";
import {
  TRANSACTION_DATE_FILTER_OPTIONS,
  type TransactionDateFilter,
} from "~/hooks/queries/transaction/transaction.type";
import { useDebouncedValue } from "~/hooks/useDebouncedValue";
import TransactionsTable from "./data-table";

const TransactionsTab = ({ enabler = true }: { enabler?: boolean }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [userIdInput, setUserIdInput] = useState("");
  const [dateFilter, setDateFilter] = useState<TransactionDateFilter>("All");

  const debouncedSearch = useDebouncedValue(searchInput, 400);
  const debouncedUserId = useDebouncedValue(userIdInput, 400);

  const resetPage = () => setCurrentPage(1);

  const {
    data: transactionsData,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetTransactions({
    enabler,
    pageNumber: currentPage,
    pageSize: 20,
    searchParam: debouncedSearch,
    userId: debouncedUserId,
    dateFilter,
  });

  const tableData = useMemo(
    () => transactionsData?.items ?? [],
    [transactionsData]
  );

  const totalPages = (() => {
    if (transactionsData?.totalPages) return transactionsData.totalPages;
    if (transactionsData?.totalCount && transactionsData?.pageSize) {
      return Math.max(
        1,
        Math.ceil(transactionsData.totalCount / transactionsData.pageSize)
      );
    }
    return 1;
  })();

  return (
    <Box>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "1fr 280px",
          lg: "1fr 220px 220px",
        }}
        gap={4}
        mb="24px"
        alignItems="end"
      >
        <Input
          type="search"
          name="transaction-search"
          label="Search"
          placeholder="Search transactions..."
          value={searchInput}
          handleChange={(e) => {
            setSearchInput(e.target.value);
            resetPage();
          }}
        />
        <Input
          type="text"
          name="transaction-user-id"
          label="User ID"
          placeholder="Filter by user ID..."
          value={userIdInput}
          handleChange={(e) => {
            setUserIdInput(e.target.value);
            resetPage();
          }}
        />
        <Select
          name="transaction-date-filter"
          placeholder="Date range"
          options={TRANSACTION_DATE_FILTER_OPTIONS}
          value={dateFilter}
          onChange={(val) => {
            setDateFilter(val as TransactionDateFilter);
            resetPage();
          }}
        />
      </Grid>

      <QueryState
        isLoading={isLoading || isFetching}
        isError={isError}
        error={error}
        onRetry={() => refetch()}
        isEmpty={tableData.length === 0}
        emptyProps={{
          title: "No transactions found",
          description:
            "There are no transactions matching your filters. Try adjusting search or date range.",
        }}
        errorProps={{
          title: "Could not load transactions",
          description:
            "We had trouble fetching transactions. Please try again.",
        }}
      >
        <TransactionsTable
          data={tableData}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={totalPages}
          loading={false}
          emptyDescription="No transactions match your current filters."
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </QueryState>
    </Box>
  );
};

export default TransactionsTab;
