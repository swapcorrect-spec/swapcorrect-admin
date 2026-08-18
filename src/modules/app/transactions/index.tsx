import PageLayout from "~/modules/layout/page-layout";
import { Header, Tab } from "~/modules/shared";
import { useState } from "react";
import { useGetTransactionStats } from "~/hooks/queries/transaction/transaction";
import { TransactionStats } from "./_components/transaction-stats";
import TransactionsTab from "./_components/transactions-tab";
import WithdrawalsTab from "./_components/withdrawals-tab";

export const Transactions = () => {
  const [activeTab, setActiveTab] = useState("transactions");

  const {
    data: transactionStats,
    isLoading: isStatsLoading,
    isError: isStatsError,
    error: statsError,
    refetch: refetchStats,
  } = useGetTransactionStats({ enabler: true });

  const tabOptions = [
    {
      title: "Transactions",
      value: "transactions",
      children: <TransactionsTab enabler={activeTab === "transactions"} />,
    },
    {
      title: "Withdrawals",
      value: "withdrawals",
      children: <WithdrawalsTab enabler={activeTab === "withdrawals"} />,
    },
  ];

  return (
    <PageLayout>
      <Header
        title="Transactions & Withdrawals"
        description="View and manage platform transactions and withdrawal requests"
      />

      <TransactionStats
        data={transactionStats}
        isLoading={isStatsLoading && !transactionStats}
        isError={isStatsError}
        error={statsError}
        onRetry={() => refetchStats()}
      />

      <Tab
        options={tabOptions}
        value={activeTab}
        onValueChange={setActiveTab}
      />
    </PageLayout>
  );
};
