import { Box, Spinner } from "@chakra-ui/react";
import type { FC, ReactNode } from "react";
import { EmptyState, type EmptyStateProps } from "./EmptyState";
import { ErrorState, type ErrorStateProps } from "./ErrorState";

type QueryStateProps = {
  isLoading: boolean;
  isError?: boolean;
  error?: unknown;
  isEmpty?: boolean;
  onRetry?: () => void;
  emptyProps: EmptyStateProps;
  errorProps?: Partial<ErrorStateProps>;
  loadingMinH?: string;
  children: ReactNode;
};

export const QueryState: FC<QueryStateProps> = ({
  isLoading,
  isError = false,
  error,
  isEmpty = false,
  onRetry,
  emptyProps,
  errorProps,
  loadingMinH = "400px",
  children,
}) => {
  if (isLoading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minH={loadingMinH}
        w="full"
      >
        <Spinner size="xl" color="#007AFF" />
      </Box>
    );
  }

  if (isError) {
    return (
      <ErrorState
        error={error}
        onRetry={onRetry}
        minH={loadingMinH}
        {...errorProps}
      />
    );
  }

  if (isEmpty) {
    return <EmptyState minH={loadingMinH} {...emptyProps} />;
  }

  return <>{children}</>;
};
