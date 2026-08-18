import { Box, Flex, Text } from "@chakra-ui/react";
import type { NotificationItem } from "~/hooks/queries/notification/notification.type";
import { formatNotificationDateTime } from "~/modules/util";
import { getNotificationStyle } from "./notification-style";

interface iProps {
  notify: NotificationItem;
}

const Notification: React.FC<iProps> = ({ notify }) => {
  const { bgColor, icon } = getNotificationStyle(notify.type);

  return (
    <Flex py={3} px={2} gap={2} borderRadius="lg" cursor="pointer" align="flex-start">
      <Flex
        w={8}
        h={8}
        align="center"
        justify="center"
        borderRadius="full"
        bg={bgColor}
        flexShrink={0}
      >
        {icon}
      </Flex>

      <Box flex="1" minW={0}>
        <Text color="#222222" fontWeight="medium" fontSize="md" lineClamp={1} mb="2px">
          {notify.title}
        </Text>
        <Text
          color="#696969"
          fontSize="sm"
          mb={1}
          fontWeight="medium"
          lineClamp={2}
        >
          {notify.message}
        </Text>
        <Text color="#929292" fontSize="10px">
          {formatNotificationDateTime(notify.createdAt)}
        </Text>
      </Box>
    </Flex>
  );
};

export default Notification;
