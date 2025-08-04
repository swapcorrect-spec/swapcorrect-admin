import { Flex } from "@chakra-ui/react";
import PageLayout from "~/modules/layout/page-layout";
import { Header } from "~/modules/shared";
import { useState } from "react";
import SwapActivityTable from "./_components/data-table";

export const SwapActivity = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const mockSwapsData = [
    {
      itemOne: "iPhone 13 Pro",
      itemTwo: "Samsung Galaxy S22",
      swapperOne: "John Doe",
      swapperTwo: "Alice Smith",
      status: "Negotiating",
      createdAt: "2025-07-06T08:00:00Z",
      updatedAt: "2025-07-06T08:00:00Z",
    },
    {
      itemOne: "PS5 Console",
      itemTwo: "Gaming PC",
      swapperOne: "Mark Allen",
      swapperTwo: "Susan Lee",
      status: "Completed",
      createdAt: "2025-07-06T08:00:00Z",
      updatedAt: "2025-07-06T08:00:00Z",
    },
    {
      itemOne: "MacBook Air",
      itemTwo: "Surface Laptop",
      swapperOne: "David Wright",
      swapperTwo: "Emma Thompson",
      status: "Cancelled",
      createdAt: "2025-07-06T08:00:00Z",
      updatedAt: "2025-07-06T08:00:00Z",
    },
    {
      itemOne: "Rolex Watch",
      itemTwo: "Tag Heuer Watch",
      swapperOne: "Chris Brown",
      swapperTwo: "Olivia Clark",
      status: "Negotiating",
      createdAt: "2025-07-06T08:00:00Z",
      updatedAt: "2025-07-06T08:00:00Z",
    },
    {
      itemOne: "Electric Guitar",
      itemTwo: "Keyboard",
      swapperOne: "Sophia Miller",
      swapperTwo: "James Anderson",
      status: "Completed",
      createdAt: "2025-07-06T08:00:00Z",
      updatedAt: "2025-07-06T08:00:00Z",
    },
    {
      itemOne: "Mountain Bike",
      itemTwo: "Road Bike",
      swapperOne: "Daniel Harris",
      swapperTwo: "Grace Walker",
      status: "Cancelled",
      createdAt: "2025-07-06T08:00:00Z",
      updatedAt: "2025-07-06T08:00:00Z",
    },
    {
      itemOne: "GoPro Camera",
      itemTwo: "Drone",
      swapperOne: "Ethan Lewis",
      swapperTwo: "Lily Johnson",
      status: "Negotiating",
      createdAt: "2025-07-06T08:00:00Z",
      updatedAt: "2025-07-06T08:00:00Z",
    },
    {
      itemOne: "Electric Scooter",
      itemTwo: "Hoverboard",
      swapperOne: "Matthew Scott",
      swapperTwo: "Ava Turner",
      status: "Completed",
      createdAt: "2025-07-06T08:00:00Z",
      updatedAt: "2025-07-06T08:00:00Z",
    },
    {
      itemOne: "Canon DSLR",
      itemTwo: "Sony Mirrorless",
      swapperOne: "Henry Adams",
      swapperTwo: "Mia Brooks",
      status: "Cancelled",
      createdAt: "2025-07-06T08:00:00Z",
      updatedAt: "2025-07-06T08:00:00Z",
    },
    {
      itemOne: "iPad Pro",
      itemTwo: "Samsung Galaxy Tab",
      swapperOne: "Benjamin Hall",
      swapperTwo: "Zoe Carter",
      status: "Negotiating",
      createdAt: "2025-07-06T08:00:00Z",
      updatedAt: "2025-07-06T08:00:00Z",
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

      <SwapActivityTable
        data={mockSwapsData}
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={30}
        loading={false}
      />
    </PageLayout>
  );
};
