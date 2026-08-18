import { Flex, Grid } from "@chakra-ui/react";
import PageLayout from "~/modules/layout/page-layout";
import { Header, Input, QueryState, Select } from "~/modules/shared";
import { useState } from "react";
import FlagsAndReportTable from "./_components/data-table";
import {
  mapReportToTableRow,
  useGetReports,
} from "~/hooks/queries/report/report";
import {
  REPORT_DATE_FILTER_OPTIONS,
  REPORT_STATUS_OPTIONS,
  type ReportDateFilter,
  type ReportUserStatus,
} from "~/hooks/queries/report/report.type";
import { useDebouncedValue } from "~/hooks/useDebouncedValue";

export const FlagsAndReports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [userIdInput, setUserIdInput] = useState("");
  const [status, setStatus] = useState<ReportUserStatus>("All");
  const [reportFilerDate, setReportFilerDate] =
    useState<ReportDateFilter>("All");

  const debouncedSearch = useDebouncedValue(searchInput, 400);
  const debouncedUserId = useDebouncedValue(userIdInput, 400);

  const resetPage = () => setCurrentPage(1);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const {
    data: reportsData,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetReports({
    enabler: true,
    searhParam: debouncedSearch,
    status,
    reportFilerDate,
    userId: debouncedUserId,
    pageNumber: currentPage,
    perpageSize: 20,
  });

  const reportsItems = (reportsData?.items ?? []).map(mapReportToTableRow);

  return (
    <PageLayout>
      <Flex justifyContent="space-between" alignItems="center" mb={7}>
        <Header
          title="Flags & Reports"
          description="Monitor and manage all flags and reports on the platform"
        />
      </Flex>

      <Grid
        templateColumns="minmax(0, 1fr) minmax(0, 1fr) 180px 180px"
        gap={4}
        mb={6}
        alignItems="end"
      >
        <Input
          type="search"
          name="report-search"
          placeholder="Search reports"
          value={searchInput}
          handleChange={(e) => {
            setSearchInput(e.target.value);
            resetPage();
          }}
        />
        <Input
          type="search"
          name="report-user-id"
          placeholder="Filter by user ID"
          value={userIdInput}
          handleChange={(e) => {
            setUserIdInput(e.target.value);
            resetPage();
          }}
        />
        <Select
          name="report-status"
          placeholder="Status"
          options={REPORT_STATUS_OPTIONS}
          value={status}
          onChange={(value) => {
            setStatus(value as ReportUserStatus);
            resetPage();
          }}
          width="100%"
        />
        <Select
          name="report-date-filter"
          placeholder="Date"
          options={REPORT_DATE_FILTER_OPTIONS}
          value={reportFilerDate}
          onChange={(value) => {
            setReportFilerDate(value as ReportDateFilter);
            resetPage();
          }}
          width="100%"
        />
      </Grid>

      <QueryState
        isLoading={isLoading || isFetching}
        isError={isError}
        error={error}
        onRetry={() => refetch()}
        isEmpty={!isLoading && !isFetching && reportsItems.length === 0}
        emptyProps={{
          title: "No reports yet",
          description:
            "There are no flags or reports to show. New reports will appear here when users file them.",
        }}
        errorProps={{
          title: "Could not load reports",
          description: "We had trouble fetching flags and reports. Please try again.",
        }}
      >
        <FlagsAndReportTable
          data={reportsItems}
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalPages={reportsData?.totalPages || 1}
          loading={false}
          emptyDescription="No flags or reports match your current filters."
        />
      </QueryState>
    </PageLayout>
  );
};
