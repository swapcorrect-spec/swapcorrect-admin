import { Flex } from "@chakra-ui/react";
import PageLayout from "~/modules/layout/page-layout";
import { Header, Select } from "~/modules/shared";
import { useState } from "react";
import FlagsAndReportTable from "./_components/data-table";

export const FlagsAndReports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const reportsData = [
    {
      reporter: "Alice Johnson",
      type: "User Misconduct",
      reportedEntity: "John Doe",
      status: "New",
      reason: "Spamming inappropriate messages",
      createdAt: "2025-07-09T10:50:00Z",
    },
    {
      reporter: "David Smith",
      type: "Fraudulent Activity",
      reportedEntity: "Mike Taylor",
      status: "Resolved",
      reason: "Reported for multiple failed payments",
      createdAt: "2025-07-09T10:50:00Z",
    },
    {
      reporter: "Olivia Green",
      type: "Abuse",
      reportedEntity: "Chris Brown",
      status: "Dismissed",
      reason: "Insufficient evidence to proceed",
      createdAt: "2025-07-09T10:50:00Z",
    },
    {
      reporter: "James Carter",
      type: "System Exploit",
      reportedEntity: "Emma White",
      status: "Under Review",
      reason: "Suspected API abuse for swapping",
      createdAt: "2025-07-09T10:50:00Z",
    },
    {
      reporter: "Sophia Turner",
      type: "Scam Attempt",
      reportedEntity: "Mark Allen",
      status: "New",
      reason: "Attempted to trade counterfeit items",
      createdAt: "2025-07-09T10:50:00Z",
    },
    {
      reporter: "Ethan Brooks",
      type: "User Misconduct",
      reportedEntity: "Grace Walker",
      status: "Resolved",
      reason: "User apologized and warning issued",
      createdAt: "2025-07-09T10:50:00Z",
    },
    {
      reporter: "Liam Davis",
      type: "Fraudulent Activity",
      reportedEntity: "Noah Adams",
      status: "Dismissed",
      reason: "Case closed after investigation",
      createdAt: "2025-07-09T10:50:00Z",
    },
    {
      reporter: "Isabella Scott",
      type: "Abuse",
      reportedEntity: "Lucas Hill",
      status: "Under Review",
      reason: "Reported for verbal abuse in chats",
      createdAt: "2025-07-09T10:50:00Z",
    },
    {
      reporter: "Mason Lee",
      type: "Scam Attempt",
      reportedEntity: "Henry Wright",
      status: "New",
      reason: "Fake payment screenshot submitted",
      createdAt: "2025-07-09T10:50:00Z",
    },
    {
      reporter: "Zoe Thompson",
      type: "System Exploit",
      reportedEntity: "Ava King",
      status: "Resolved",
      reason: "Exploit patched and account restored",
      createdAt: "2025-07-09T10:50:00Z",
    },
  ];

  return (
    <PageLayout>
      <Flex justifyContent="space-between" alignItems="center" mb={7}>
        <Header
          title="Recent Activity"
          description="Monitor and manage all swaps between users on the platform"
        />
      </Flex>

      <FlagsAndReportTable
        data={reportsData}
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={30}
        loading={false}
      />
    </PageLayout>
  );
};
