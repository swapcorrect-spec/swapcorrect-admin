import { Box, Flex, Text } from "@chakra-ui/react";
import { Inbox } from "lucide-react";
import type { FC, ReactNode } from "react";

export type EmptyStateProps = {
  title?: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
  minH?: string;
};

export const EmptyState: FC<EmptyStateProps> = ({
  title = "Nothing here yet",
  description,
  icon,
  action,
  minH = "50vh",
}) => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH={minH}
      w="full"
      px={6}
      textAlign="center"
      gap={3}
    >
      <Box color="#D5D7DA" aria-hidden>
        {icon ?? <Inbox size={48} strokeWidth={1.25} />}
      </Box>
      <Text fontSize="lg" fontWeight={500} color="#101928">
        {title}
      </Text>
      <Text fontSize="sm" color="#737373" maxW="400px">
        {description}
      </Text>
      {action ? <Box mt={2}>{action}</Box> : null}
    </Flex>
  );
};
