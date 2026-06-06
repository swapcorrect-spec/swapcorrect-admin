import { useMemo, useState, lazy, Suspense } from "react";
import {
  ActiveSwaps,
  CompletedSwaps,
  NewSignUps,
  RecentActivity,
  TotalUsers,
  TotalSwapper,
  TotalVisitor,
} from "~/assets/images";
import PageLayout from "~/modules/layout/page-layout";
import { Header, Select } from "~/modules/shared";
import { Box, Flex, Text, Grid, Skeleton } from "@chakra-ui/react";
import { Link } from "react-router";
import InfoCard from "~/modules/shared/widgets/info_card";
import { ChevronRight } from "lucide-react";
import { PATHS } from "~/modules/_constants/paths";
import { useGetDashboardSummary, useGetAdvancedAnalytics } from "~/hooks/queries/dashboard/dashboard";
import type { MetricFilter, PeriodicFilter } from "~/hooks/queries/dashboard/dashboard.type";
import { useGetRecentActivities } from "~/hooks/queries/activity/activity";

const METRIC_FILTER_OPTIONS: { value: MetricFilter; label: string }[] = [
  { value: "All", label: "All Metrics" },
  { value: "ActiveUsers", label: "Active Users" },
  { value: "ApprovedListings", label: "Approved Listings" },
  { value: "ActiveSwaps", label: "Active Swaps" },
  { value: "CompletedSwaps", label: "Completed Swaps" },
];

const PERIODIC_FILTER_OPTIONS: { value: PeriodicFilter; label: string }[] = [
  { value: "Today", label: "Today" },
  { value: "ThisWeek", label: "This Week" },
  { value: "ThisMonth", label: "This Month" },
  { value: "AllTime", label: "All Time" },
];

const PERIODIC_CHART_LABELS: Record<PeriodicFilter, string> = {
  Today: "Today",
  ThisWeek: "1 Week Avg.",
  ThisMonth: "This Month",
  AllTime: "All Time",
};

const AnalyticsChart = lazy(() => import("./_components/AnalyticsChart").then(module => ({ default: module.AnalyticsChart })));

export const Dashboard = () => {
  const [filter, setFilter] = useState<PeriodicFilter>("Today");
  const [analyticsMetricFilter, setAnalyticsMetricFilter] =
    useState<MetricFilter>("All");
  const [analyticsPeriodicFilter, setAnalyticsPeriodicFilter] =
    useState<PeriodicFilter>("ThisWeek");

  const { data, isLoading } = useGetDashboardSummary({
    enabler: true,
    filter,
  });

  const { data: activitiesData, isLoading: isLoadingActivities } = useGetRecentActivities({
    enabler: true,
    pageNumber: 1,
    pageSize: 7,
  });

  const { data: analyticsData, isLoading: isLoadingAnalytics } =
    useGetAdvancedAnalytics({
      enabler: true,
      metricFilter: analyticsMetricFilter,
      periodicFilter: analyticsPeriodicFilter,
    });

  const chartData = useMemo(() => {
    if (!analyticsData?.monthlySwaps) return [];
    return Object.entries(analyticsData.monthlySwaps).map(([month, value]) => ({
      month,
      value,
    }));
  }, [analyticsData]);

  const INFOLIST = useMemo(() => [
    {
      title: "Active Users",
      value: data?.activeUsers?.count || 0,
      icon: <TotalUsers />,
      progress: data?.activeUsers?.isIncrease || false,
      percentageChange: data?.activeUsers?.percentageChange || 0,
    },
    {
      title: "Swapper",
      value: data?.swapper?.count || 0,
      icon: <TotalSwapper />,
      progress: data?.swapper?.isIncrease || false,
      percentageChange: data?.swapper?.percentageChange || 0,
    },
    {
      title: "Total Visitor",
      value: data?.visitor?.count || 0,
      icon: <TotalVisitor />,
      progress: data?.visitor?.isIncrease || false,
      percentageChange: data?.visitor?.percentageChange || 0,
    },
    {
      title: "Registered Users",
      value: data?.registeredUsers?.count || 0,
      icon: <NewSignUps />,
      progress: data?.registeredUsers?.isIncrease || false,
      percentageChange: data?.registeredUsers?.percentageChange || 0,
    },
    {
      title: "Completed Swaps",
      value: data?.completedSwaps?.count || 0,
      icon: <CompletedSwaps />,
      progress: data?.completedSwaps?.isIncrease || false,
      percentageChange: data?.completedSwaps?.percentageChange || 0,
    },
    {
      title: "Active Swaps",
      value: data?.activeSwaps?.count || 0,
      icon: <ActiveSwaps />,
      progress: data?.activeSwaps?.isIncrease || false,
      percentageChange: data?.activeSwaps?.percentageChange || 0,
    },
  ], [data]);

  return (
    <>
      <PageLayout>
        <Flex justifyContent="space-between" alignItems="center">
          <Header
            title="Welcome, Kathleen"
            description="Overview of your dashboard"
          />
          <Box w={"180px"}>
            <Select
              name="date"
              placeholder="Choose a date"
              options={[
                { value: "Today", label: "Today" },
                { value: "ThisWeek", label: "This Week" },
                { value: "ThisMonth", label: "This Month" },
                { value: "AllTime", label: "All Time" },
              ]}
              value={filter}
              onChange={(val) => setFilter(val as typeof filter)}
            />
          </Box>
        </Flex>
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
          gap="16px"
          my="32px"
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <Skeleton
                  key={idx}
                  height="150px"
                  borderRadius="12px"
                  border="1px solid #EAEAEA"
                />
              ))
            : INFOLIST.map((info, idx) => (
                <InfoCard
                  key={idx}
                  icon={info.icon}
                  title={info.title}
                  count={info.value}
                  progress={info.progress}
                  percentageChange={info.percentageChange}
                />
              ))}
        </Grid>
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap="16px"
          mt="32px"
        >
          {/* Recent Activity Section */}
          <Box borderRadius="12px" width="100%" border="1px solid #EAEAEA">
            <Box
              borderBottom="1px solid #EAEAEA"
              py="20px"
              px="16px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontSize="20px" color="#222222" fontWeight={500}>
                Recent Activity
              </Text>
              <Link to={PATHS.SWAPACTIVITY}>
                <Text
                  fontSize="13px"
                  color="#007AFF"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  View all
                  <ChevronRight size={14} color="#007AFF" />
                </Text>
              </Link>
            </Box>
            <Flex flexDirection="column" px="16px">
              {isLoadingActivities
                ? Array.from({ length: 5 }).map((_, index) => (
                    <Box
                      key={index}
                      display="flex"
                      alignItems="center"
                      gap="12px"
                      borderBottom={index !== 4 ? "1px solid #E9E9E9" : "none"}
                      py="12px"
                    >
                      <Skeleton height="20px" width="20px" borderRadius="full" />
                      <Skeleton height="16px" width="200px" />
                      <Skeleton height="12px" width="80px" ml="auto" />
                    </Box>
                  ))
                : activitiesData?.items?.map((activity, index) => (
                    <Box
                      key={index}
                      display="flex"
                      alignItems="center"
                      gap="12px"
                      borderBottom={
                        index !== (activitiesData?.items?.length || 0) - 1
                          ? "1px solid #E9E9E9"
                          : "none"
                      }
                      py="12px"
                    >
                      <RecentActivity />
                      <Box flex={1}>
                        <Text
                          fontSize="16px"
                          color="#222222"
                          fontWeight={500}
                          mb="4px"
                        >
                          {activity.description}
                        </Text>
                        <Text fontSize="13px" color="#737373" fontWeight={400}>
                          <Text as="span" fontWeight={500} color="#737373">
                            User: {activity.userName}
                          </Text>
                          {" • "}
                          <Text as="span" fontWeight={500} color="#737373">
                            Activity Type: {activity.activityType}
                          </Text>
                        </Text>
                      </Box>
                      <Text fontSize="12px" color="#737373" fontWeight={500}>
                        {activity.timeAgo}
                      </Text>
                    </Box>
                  ))}
            </Flex>
          </Box>

          {/* Advanced Analytics Section */}
          <Box borderRadius="12px" width="100%" border="1px solid #EAEAEA">
            <Box
              borderBottom="1px solid #EAEAEA"
              py="20px"
              px="16px"
            >
              <Text fontSize="20px" color="#222222" fontWeight={500}>
                Advanced Analytics
              </Text>
              <Flex gap={3} mt={4} flexWrap="wrap">
                <Box minW="160px" flex="1">
                  <Select
                    name="analytics-metric-filter"
                    placeholder="Metric"
                    options={METRIC_FILTER_OPTIONS}
                    value={analyticsMetricFilter}
                    onChange={(val) =>
                      setAnalyticsMetricFilter(val as MetricFilter)
                    }
                  />
                </Box>
                <Box minW="140px" flex="1">
                  <Select
                    name="analytics-periodic-filter"
                    placeholder="Period"
                    options={PERIODIC_FILTER_OPTIONS}
                    value={analyticsPeriodicFilter}
                    onChange={(val) =>
                      setAnalyticsPeriodicFilter(val as PeriodicFilter)
                    }
                  />
                </Box>
              </Flex>
            </Box>
            <Box px="16px" py="20px">
              {isLoadingAnalytics ? (
                <Box>
                  <Skeleton height="40px" mb="16px" />
                  <Skeleton height="200px" />
                </Box>
              ) : (
                <>
                  <Text fontSize="14px" color="#737373" mb="16px">
                    Track monthly swap activity and performance metrics across
                    different time periods
                  </Text>

                  <Flex gap="8px" mb="24px" flexWrap="wrap">
                    {analyticsData?.metrics?.map((metric, index) => (
                      <Box
                        key={`${metric.name}-${index}`}
                        px="12px"
                        py="8px"
                        borderRadius="6px"
                        fontSize="12px"
                        fontWeight={500}
                        border="1px solid #EAEAEA"
                        bg="#F9FAFB"
                        color="#222222"
                      >
                        {metric.name}{" "}
                        <Text as="span" color="#737373">
                          {metric.count} ({Math.round(metric.percentage)}%)
                        </Text>
                      </Box>
                    ))}
                  </Flex>

                  <Suspense fallback={<Skeleton height="250px" />}>
                    <AnalyticsChart
                      chartData={chartData}
                      periodLabel={
                        PERIODIC_CHART_LABELS[analyticsPeriodicFilter]
                      }
                    />
                  </Suspense>
                </>
              )}
            </Box>
          </Box>
        </Grid>
      </PageLayout>
    </>
  );
};
