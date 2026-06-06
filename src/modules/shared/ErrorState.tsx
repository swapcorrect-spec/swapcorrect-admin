import { Box, Flex, Text } from "@chakra-ui/react";
import { AlertCircle } from "lucide-react";
import type { FC, ReactNode } from "react";
import handleApiError from "~/utils/handle-api-error";
import { Button } from "./Button";

export type ErrorStateProps = {
  title?: string;
  description?: string;
  error?: unknown;
  onRetry?: () => void;
  retryLabel?: string;
  action?: ReactNode;
  minH?: string;
};

export const ErrorState: FC<ErrorStateProps> = ({
  title = "Something went wrong",
  description,
  error,
  onRetry,
  retryLabel = "Try again",
  action,
  minH = "50vh",
}) => {
  const apiMessage = error ? handleApiError(error) : null;
  const primaryMessage =
    apiMessage || description || "Something went wrong. Please try again.";

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
      <Box color="#E42222" aria-hidden>
        <AlertCircle size={48} strokeWidth={1.25} />
      </Box>
      <Text fontSize="lg" fontWeight={500} color="#101928">
        {title}
      </Text>
      <Text fontSize="sm" color="#737373" maxW="420px">
        {primaryMessage}
      </Text>
      {description && apiMessage && description !== apiMessage ? (
        <Text fontSize="xs" color="#898989" maxW="420px">
          {description}
        </Text>
      ) : null}
      {onRetry ? (
        <Box mt={2} maxW="200px" w="full">
          <Button handleClick={onRetry} variant="outline" width="full">
            {retryLabel}
          </Button>
        </Box>
      ) : null}
      {action ? <Box mt={2}>{action}</Box> : null}
    </Flex>
  );
};
