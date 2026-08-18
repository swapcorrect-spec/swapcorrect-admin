import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import FlagsAndReportTable from "./data-table";
import {
  mapReportToTableRow,
  useGetReports,
} from "~/hooks/queries/report/report";
import { QueryState } from "~/modules/shared";

interface UserReportsPanelProps {
  userId?: string;
}

const UserReportsPanel: React.FC<UserReportsPanelProps> = ({ userId }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: reportsData,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetReports({
    enabler: !!userId,
    userId,
    status: "All",
    pageNumber: currentPage,
    perpageSize: 10,
  });

  const reportsItems = (reportsData?.items ?? []).map(mapReportToTableRow);

  return (
    <Box>
      <Text color="#222222" fontWeight={500} mb={5} fontSize="14px">
        Reports & Flags
      </Text>

      <QueryState
        isLoading={isLoading || isFetching}
        isError={isError}
        error={error}
        onRetry={() => refetch()}
        isEmpty={!isLoading && !isFetching && reportsItems.length === 0}
        emptyProps={{
          title: "No reports",
          description: "This user has no flags or reports to show.",
        }}
        errorProps={{
          title: "Could not load reports",
          description: "We had trouble fetching reports for this user. Please try again.",
        }}
        loadingMinH="200px"
      >
        <FlagsAndReportTable
          data={reportsItems}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={reportsData?.totalPages || 1}
          loading={false}
          emptyDescription="No reports found for this user."
        />
      </QueryState>
    </Box>
  );
};

export default UserReportsPanel;
