import { Accordion, Box, Flex, Grid, Skeleton, Text } from "@chakra-ui/react";
import { CompletedSwaps, Counter } from "~/assets/images";
import type {
  TransactionStatsBreakdownItem,
  TransactionStatsResult,
} from "~/hooks/queries/transaction/transaction.type";
import { ErrorState } from "~/modules/shared";
import { formatMoney } from "~/modules/util";

type TransactionStatsProps = {
  data?: TransactionStatsResult;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  onRetry: () => void;
};

const formatRevenue = (amount: number) => formatMoney(amount);

const StatCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  primary: string;
  accent?: string;
}> = ({ title, icon, primary, accent = "#222222" }) => (
  <Box
    border="1px solid #EAEAEA"
    borderRadius="10px"
    py="12px"
    px="14px"
    bg="white"
  >
    <Flex align="center" gap="10px" mb="10px">
      <Box
        flexShrink={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        css={{ "& svg": { width: "20px", height: "20px" } }}
      >
        {icon}
      </Box>
      <Text fontSize="14px" color="#737373" fontWeight={500}>
        {title}
      </Text>
    </Flex>
    <Text fontSize="20px" color={accent} fontWeight={600} lineHeight="short">
      {primary}
    </Text>
  </Box>
);

const StatusCard: React.FC<{
  title: string;
  count: number;
  revenue: number;
  accent: string;
  bg: string;
}> = ({ title, count, revenue, accent, bg }) => (
  <Flex
    align="center"
    justify="space-between"
    gap={3}
    border="1px solid #EAEAEA"
    borderRadius="10px"
    py="10px"
    px="12px"
    bg={bg}
    minH="48px"
  >
    <Box minW={0}>
      <Text fontSize="12px" color="#737373" fontWeight={500} mb="2px">
        {title}
      </Text>
      <Text fontSize="17px" color={accent} fontWeight={600} lineHeight="1.2">
        {count.toLocaleString()}
      </Text>
    </Box>
    <Text
      fontSize="12px"
      color="#737373"
      fontWeight={500}
      whiteSpace="nowrap"
      flexShrink={0}
      textAlign="right"
    >
      {formatRevenue(revenue)}
    </Text>
  </Flex>
);

const BreakdownCard: React.FC<{
  title: string;
  items: TransactionStatsBreakdownItem[];
}> = ({ title, items }) => (
  <Box border="1px solid #EAEAEA" borderRadius="10px" p="12px" bg="white">
    <Text fontSize="13px" color="#222222" fontWeight={600} mb="8px">
      {title}
    </Text>
    {items.length === 0 ? (
      <Text fontSize="12px" color="#737373">
        No data available
      </Text>
    ) : (
      <Flex direction="column" gap={0}>
        {items.map((item, index) => (
          <Flex
            key={`${item.label}-${index}`}
            justify="space-between"
            align="center"
            gap={3}
            py="8px"
            borderTop={index === 0 ? "none" : "1px solid #EAEAEA"}
          >
            <Flex align="center" gap={1} minW={0} flexWrap="wrap">
              <Text fontSize="13px" color="#222222" fontWeight={500} lineClamp={1}>
                {item.label}
              </Text>
              <Text fontSize="12px" color="#737373" flexShrink={0}>
                · {item.count.toLocaleString()} txn{item.count === 1 ? "" : "s"}
              </Text>
            </Flex>
            <Text
              fontSize="13px"
              color="#007AFF"
              fontWeight={600}
              whiteSpace="nowrap"
              flexShrink={0}
            >
              {formatRevenue(item.totalRevenue)}
            </Text>
          </Flex>
        ))}
      </Flex>
    )}
  </Box>
);

const StatsBody: React.FC<{ data: TransactionStatsResult }> = ({ data }) => (
  <>
    <Grid
      templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
      gap="12px"
      mb="12px"
    >
      <StatCard
        title="Total Transactions"
        icon={<Counter />}
        primary={data.totalTransactions.toLocaleString()}
      />
      <StatCard
        title="Total Revenue"
        icon={<CompletedSwaps />}
        primary={formatRevenue(data.totalRevenue)}
        accent="#007AFF"
      />
    </Grid>

    <Text fontSize="13px" color="#737373" fontWeight={500} mb="8px">
      By status
    </Text>
    <Grid
      templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
      gap="12px"
      mb="12px"
    >
      <StatusCard
        title="Successful"
        count={data.successCount}
        revenue={data.successRevenue}
        accent="#106104"
        bg="#F8FFF6"
      />
      <StatusCard
        title="Pending"
        count={data.pendingCount}
        revenue={data.pendingRevenue}
        accent="#BB7E05"
        bg="#FFFBF2"
      />
      <StatusCard
        title="Failed"
        count={data.failedCount}
        revenue={data.failedRevenue}
        accent="#E42222"
        bg="#FFF8F8"
      />
    </Grid>

    <Text fontSize="13px" color="#737373" fontWeight={500} mb="8px">
      Breakdown
    </Text>
    <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap="12px">
      <BreakdownCard title="By fee type" items={data.byFeeType ?? []} />
      <BreakdownCard title="By payment type" items={data.byPaymentType ?? []} />
    </Grid>
  </>
);

const StatsSkeleton: React.FC = () => (
  <Box>
    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap="12px" mb="12px">
      {Array.from({ length: 2 }).map((_, index) => (
        <Skeleton key={index} height="76px" borderRadius="10px" />
      ))}
    </Grid>
    <Grid
      templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
      gap="12px"
      mb="12px"
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} height="52px" borderRadius="10px" />
      ))}
    </Grid>
    <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap="12px">
      {Array.from({ length: 2 }).map((_, index) => (
        <Skeleton key={index} height="120px" borderRadius="10px" />
      ))}
    </Grid>
  </Box>
);

const getStatsSummary = (
  data: TransactionStatsResult | undefined,
  isLoading: boolean,
  isError: boolean,
) => {
  if (data) {
    return `${data.totalTransactions.toLocaleString()} transactions · ${formatRevenue(data.totalRevenue)}`;
  }
  if (isLoading) return "Loading statistics...";
  if (isError) return "Failed to load — expand to retry";
  return "Expand to view statistics";
};

export const TransactionStats: React.FC<TransactionStatsProps> = ({
  data,
  isLoading,
  isError,
  error,
  onRetry,
}) => {
  const renderContent = () => {
    if (isLoading) return <StatsSkeleton />;

    if (isError) {
      return (
        <ErrorState
          minH="200px"
          title="Could not load transaction stats"
          error={error}
          onRetry={onRetry}
        />
      );
    }

    if (!data) return null;

    return <StatsBody data={data} />;
  };

  return (
    <Box
      mt="24px"
      border="1px solid #EAEAEA"
      borderRadius="12px"
      bg="white"
      overflow="hidden"
      mb="12px"
    >
      <Accordion.Root collapsible defaultValue={[]}>
        <Accordion.Item value="transaction-stats">
          <Accordion.ItemTrigger
            cursor="pointer"
            px="16px"
            py="14px"
            _hover={{ bg: "#FAFAFA" }}
          >
            <Flex direction="column" align="flex-start" flex="1" gap="4px">
              <Text color="#222222" fontWeight={600} fontSize="15px">
                Transaction statistics
              </Text>
              <Text fontSize="13px" color="#737373" fontWeight={500}>
                {getStatsSummary(data, isLoading, isError)}
              </Text>
            </Flex>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody px="16px" pb="16px" pt="4px">
              {renderContent()}
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    </Box>
  );
};
