import { Box, Grid } from "@chakra-ui/react";
import { Input, QueryState, Select } from "~/modules/shared";
import { Pagination } from "~/modules/shared/pagination";
import { useEffect, useMemo, useState } from "react";
import { useGetWithdrawals } from "~/hooks/queries/withdrawal/withdrawal";
import {
  WITHDRAWAL_STATUS_OPTIONS,
  type WithdrawalStatus,
} from "~/hooks/queries/withdrawal/withdrawal.type";
import { useDebouncedValue } from "~/hooks/useDebouncedValue";
import WithdrawalsTable from "./withdrawals-data-table";

const WithdrawalsTab = ({ enabler = true }: { enabler?: boolean }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [userIdInput, setUserIdInput] = useState("");
  const [status, setStatus] = useState<WithdrawalStatus>("All");

  const debouncedUserId = useDebouncedValue(userIdInput, 400);

  const resetPage = () => setCurrentPage(1);

  const {
    data: withdrawalsData,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetWithdrawals({
    enabler,
    pageNumber: currentPage,
    pageSize: 20,
    userId: debouncedUserId,
    status,
  });

  useEffect(() => {
    if (withdrawalsData) {
      console.log("[withdrawals]", withdrawalsData);
    }
  }, [withdrawalsData]);

  const tableData = useMemo(
    () => withdrawalsData?.items ?? [],
    [withdrawalsData]
  );

  const totalPages = (() => {
    if (withdrawalsData?.totalPages) return withdrawalsData.totalPages;
    if (withdrawalsData?.totalCount && withdrawalsData?.pageSize) {
      return Math.max(
        1,
        Math.ceil(withdrawalsData.totalCount / withdrawalsData.pageSize)
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
        }}
        gap={4}
        mb="24px"
        alignItems="end"
      >
        <Input
          type="text"
          name="withdrawal-user-id"
          label="User ID"
          placeholder="Filter by user ID..."
          value={userIdInput}
          handleChange={(e) => {
            setUserIdInput(e.target.value);
            resetPage();
          }}
        />
        <Select
          name="withdrawal-status"
          placeholder="Status"
          options={WITHDRAWAL_STATUS_OPTIONS}
          value={status}
          onChange={(val) => {
            setStatus(val as WithdrawalStatus);
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
          title: "No withdrawals found",
          description:
            "There are no withdrawals matching your filters. Try adjusting status or user ID.",
        }}
        errorProps={{
          title: "Could not load withdrawals",
          description:
            "We had trouble fetching withdrawals. Please try again.",
        }}
      >
        <WithdrawalsTable
          data={tableData}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={totalPages}
          loading={false}
          emptyDescription="No withdrawals match your current filters."
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

export default WithdrawalsTab;
