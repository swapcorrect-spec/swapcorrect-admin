import { Flex } from "@chakra-ui/react";
import PageLayout from "~/modules/layout/page-layout";
import { Header, QueryState } from "~/modules/shared";
import { useState } from "react";
import FlagsAndReportTable from "./_components/data-table";
import {
  mapReportToTableRow,
  useGetReports,
} from "~/hooks/queries/report/report";

export const FlagsAndReports = () => {
  const [currentPage, setCurrentPage] = useState(1);

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
    pageNumber: currentPage,
    perpageSize: 20,
  });

  const reportsItems = (reportsData?.items ?? []).map(mapReportToTableRow);

  return (
    <PageLayout>
      <Flex justifyContent="space-between" alignItems="center" mb={7}>
        <Header
          title="Recent Activity"
          description="Monitor and manage all flags and reports on the platform"
        />
      </Flex>

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
