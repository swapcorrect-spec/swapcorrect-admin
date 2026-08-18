"use client";

import { Box, Flex, Menu, Skeleton } from "@chakra-ui/react";
import { useCallback } from "react";
import Notification from "~/modules/shared/widgets";
import { EmptyState } from "~/modules/shared";
import { useGetNotifications } from "~/hooks/queries/notification/notification";

const PAGE_SIZE = 10;
const SCROLL_THRESHOLD = 0.8;

const NotificationSkeleton: React.FC = () => (
  <Flex gap={3} p={2} align="flex-start">
    <Skeleton boxSize="32px" borderRadius="full" flexShrink={0} />
    <Box flex="1">
      <Skeleton height="14px" width="55%" mb={2} />
      <Skeleton height="12px" width="85%" mb={2} />
      <Skeleton height="10px" width="30%" />
    </Box>
  </Flex>
);

type NotificationMenuProps = {
  open: boolean;
};

export const NotificationMenu: React.FC<NotificationMenuProps> = ({ open }) => {
  const {
    items,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetNotifications({
    enabler: open,
    pageSize: PAGE_SIZE,
  });

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const element = event.currentTarget;
      const scrollProgress =
        (element.scrollTop + element.clientHeight) / element.scrollHeight;

      if (
        scrollProgress >= SCROLL_THRESHOLD &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  return (
    <Menu.Content p={0} maxH="75vh" w="500px" overflow="hidden">
      <Box p={4} maxH="400px" overflowY="auto" onScroll={handleScroll}>
        <Flex direction="column" gap={3}>
          {isLoading ? (
            Array.from({ length: PAGE_SIZE }).map((_, index) => (
              <Box
                key={index}
                border="1px solid #EAEAEA"
                borderRadius="md"
                bg="gray.50"
              >
                <NotificationSkeleton />
              </Box>
            ))
          ) : items.length === 0 ? (
            <EmptyState
              minH="180px"
              title="No notifications"
              description="You're all caught up — nothing new to show."
            />
          ) : (
            <>
              {items.map((notify) => (
                <Box
                  key={notify.id}
                  border="1px solid #EAEAEA"
                  borderRadius="md"
                  bg="gray.50"
                >
                  <Notification notify={notify} />
                </Box>
              ))}

              {isFetchingNextPage &&
                Array.from({ length: 2 }).map((_, index) => (
                  <Box
                    key={`loading-more-${index}`}
                    border="1px solid #EAEAEA"
                    borderRadius="md"
                    bg="gray.50"
                  >
                    <NotificationSkeleton />
                  </Box>
                ))}
            </>
          )}
        </Flex>
      </Box>
    </Menu.Content>
  );
};
