import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";
import { BoxIcon } from "lucide-react";
import { useState } from "react";
import { useGetRecentActivities } from "~/hooks/queries/activity/activity";
import { EmptyState, ErrorState } from "~/modules/shared";
import { Pagination } from "~/modules/shared/pagination";

interface UserRecentActivityProps {
  userId?: string;
}

const UserRecentActivity: React.FC<UserRecentActivityProps> = ({ userId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetRecentActivities({
      enabler: !!userId,
      pageNumber: currentPage,
      pageSize,
      userId: userId?.toString(),
    });

  const activities = data?.items ?? [];
  const totalPages = data?.totalPages || 1;
  const showLoading = isLoading || isFetching;

  return (
    <Box>
      <Text color="#222222" fontWeight={500} mb={5} fontSize="14px">
        Recent Activity
      </Text>

      {showLoading ? (
        <Flex gap={4} flexDirection="column">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} height="72px" borderRadius="lg" />
          ))}
        </Flex>
      ) : isError ? (
        <ErrorState
          minH="200px"
          title="Could not load activity"
          error={error}
          onRetry={() => refetch()}
        />
      ) : activities.length === 0 ? (
        <EmptyState
          minH="200px"
          title="No activity yet"
          description="This user has no recent activity to show."
        />
      ) : (
        <>
          <Flex gap={4} flexDirection="column">
            {activities.map((activity, index) => (
              <Box
                key={`${activity.activityType}-${activity.timeAgo}-${index}`}
                display="flex"
                gap={4}
                bg="#F7F7F7"
                py={3}
                px={2.5}
                borderRadius="lg"
              >
                <BoxIcon color="#007AFF" size={16} />
                <Box mr="auto" minW={0}>
                  <Text fontSize="13px" fontWeight="500" mb={2}>
                    {activity.activityType}
                  </Text>
                  <Text color="#737373" fontSize="12px">
                    {activity.description}
                  </Text>
                </Box>
                <Text
                  color="#737373"
                  fontSize="13px"
                  whiteSpace="nowrap"
                  flexShrink={0}
                >
                  {activity.timeAgo}
                </Text>
              </Box>
            ))}
          </Flex>

          <Box mt={6}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default UserRecentActivity;
