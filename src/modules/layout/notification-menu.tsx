"use client";

import { Box, Flex, Menu, Skeleton, Tabs } from "@chakra-ui/react";
import { useCallback, useMemo } from "react";
import { mockNotifications, notifyType } from "../_constants";
import Notification from "~/modules/shared/widgets";
import { useGetNotifications } from "~/hooks/queries/notification/notification";

const PAGE_SIZE = 20;
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
  userId?: string;
  notificationTab: string;
  onTabChange: (value: string) => void;
};

export const NotificationMenu: React.FC<NotificationMenuProps> = ({
  open,
  userId,
  notificationTab,
  onTabChange,
}) => {
  const {
    pageCount,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetNotifications({
    enabler: open && !!userId,
    userId,
    type: notificationTab === "all" ? undefined : notificationTab,
    pageSize: PAGE_SIZE,
  });

  const displayNotifications = useMemo(() => {
    const pages = Math.max(1, pageCount);
    return Array.from({ length: pages }).flatMap((_, pageIndex) =>
      mockNotifications.map((notify, notifyIndex) => ({
        ...notify,
        key: `page-${pageIndex}-notify-${notifyIndex}`,
      })),
    );
  }, [pageCount]);

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
      <Box p={4} maxH="75vh" overflowY="auto" onScroll={handleScroll}>
        <Tabs.Root
          variant="enclosed"
          display="flex"
          value={notificationTab}
          onValueChange={(details) => onTabChange(details.value)}
        >
          <Tabs.List width="100%">
            {notifyType.map((tab, index) => (
              <Tabs.Trigger key={index} value={tab.value} width="100%">
                {tab.title}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs.Root>

        <Flex direction="column" gap={3} mt={4}>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <Box
                key={index}
                border="1px solid #EAEAEA"
                borderRadius="md"
                bg="gray.50"
              >
                <NotificationSkeleton />
              </Box>
            ))
          ) : (
            <>
              {displayNotifications.map((notify) => (
                <Box
                  key={notify.key}
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
