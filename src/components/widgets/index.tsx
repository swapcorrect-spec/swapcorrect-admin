import {
  NewChat,
  NewSwap,
  OfferAccepted,
  OfferDeclined,
  NewReview,
} from "~/assets/images";
import MomentAgo from "../moment-ago";
import { Box, Flex, Text, Circle } from "@chakra-ui/react";

interface Notify {
  read: boolean;
  title: string;
  description: string;
  time: string;
  type: string;
}

interface iProps {
  notify: Notify;
}

const Notification: React.FC<iProps> = ({ notify }) => {
  const bgColor =
    notify?.type === "new-chat"
      ? "#F3F0FF"
      : notify?.type === "new-request"
      ? "#EAF4FF"
      : notify?.type === "offer-accepted"
      ? "#EEFFEB"
      : notify?.type === "offer-declined"
      ? "#FFEFEF"
      : notify?.type === "new-review"
      ? "#FFFAEA"
      : "transparent";

  // Decide which icon to render
  const Icon =
    notify?.type === "new-chat"
      ? NewChat
      : notify?.type === "new-request"
      ? NewSwap
      : notify?.type === "offer-accepted"
      ? OfferAccepted
      : notify?.type === "offer-declined"
      ? OfferDeclined
      : NewReview;

  return (
    <Flex
      bg={notify?.read ? "transparent" : "#F9FCFF"}
      py={3}
      px={2}
      gap={2}
      borderRadius="lg"
      cursor="pointer"
      align="flex-start"
    >
      {/* Icon */}
      <Flex
        w={8}
        h={8}
        align="center"
        justify="center"
        borderRadius="full"
        bg={bgColor}
        flexShrink={0}
      >
        <Icon />
      </Flex>

      {/* Content */}
      <Box flex="1">
        <Flex align="center" gap={1} mb="2px">
          <Text color="#222222" fontWeight="medium" fontSize="md">
            {notify?.title}
          </Text>
          {!notify?.read && <Circle size="6px" bg="#007AFF" />}
        </Flex>
        <Text color="#696969" fontSize="sm" mb={1} fontWeight="medium">
          {notify?.description}
        </Text>
        <Text color="#929292" fontSize="10px">
          <MomentAgo createdAt={notify?.time} />
        </Text>
      </Box>
    </Flex>
  );
};

export default Notification;
