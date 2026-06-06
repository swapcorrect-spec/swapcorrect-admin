import { Grid } from "@chakra-ui/react";
import {
  ActiveSwaps,
  CompletedSwaps,
  Counter,
  NewSignUps,
} from "~/assets/images";
import PageLayout from "~/modules/layout/page-layout";
import { Header, Tab } from "~/modules/shared";
import InfoCard from "~/modules/shared/widgets/info_card";
import { useMemo, useState } from "react";
import TransactionsTab from "./_components/transactions-tab";
import WithdrawalsTab from "./_components/withdrawals-tab";

export const Transactions = () => {
  const [activeTab, setActiveTab] = useState("transactions");

  const STATS_LIST = useMemo(
    () => [
      {
        title: "Total Transactions",
        value: 1248,
        icon: <Counter />,
      },
      {
        title: "Completed",
        value: 1102,
        icon: <CompletedSwaps />,
      },
      {
        title: "Pending",
        value: 96,
        icon: <ActiveSwaps />,
      },
      {
        title: "New This Month",
        value: 50,
        icon: <NewSignUps />,
      },
    ],
    []
  );

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

      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap="16px"
        my="32px"
      >
        {STATS_LIST.map((stat, idx) => (
          <InfoCard
            key={idx}
            icon={stat.icon}
            title={stat.title}
            count={stat.value}
            showFooter={false}
          />
        ))}
      </Grid>

      <Tab
        options={tabOptions}
        value={activeTab}
        onValueChange={setActiveTab}
      />
    </PageLayout>
  );
};
