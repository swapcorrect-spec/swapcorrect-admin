import { Box, Button, Dialog, Flex, Grid, Portal, Text } from "@chakra-ui/react";
import { BadgeInfo } from "lucide-react";
import type { TransactionItem } from "~/hooks/queries/transaction/transaction.type";
import { formatAmount, formatDateTime, getStatusStyles } from "~/modules/util";

type TransactionDetailsModalProps = {
  open: boolean;
  transaction: TransactionItem | null;
  onClose: () => void;
};

const getPaymentStatusStyles = (status?: string) => {
  const normalized = status?.trim().toLowerCase();

  if (normalized === "paid") return getStatusStyles("completed");
  if (normalized === "created") return getStatusStyles("pending");

  return getStatusStyles(normalized || "pending");
};

const DetailField: React.FC<{ label: string; value?: string | null }> = ({
  label,
  value,
}) => (
  <Box>
    <Text fontSize="xs" color="#737373" fontWeight={500} mb={1}>
      {label}
    </Text>
    <Text fontSize="sm" color="#222222" wordBreak="break-word">
      {value?.trim() ? value : "—"}
    </Text>
  </Box>
);

export const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({
  open,
  transaction,
  onClose,
}) => {
  const { borderColor, bg, textColor } = getPaymentStatusStyles(
    transaction?.paymentStatus
  );

  return (
    <Dialog.Root
      open={open}
      placement="center"
      onOpenChange={(details) => {
        if (!details.open) onClose();
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="fixed"
          inset={0}
          p={4}
          zIndex={1600}
        >
          {transaction && (
          <Dialog.Content
            maxW="640px"
            w="full"
            p={6}
            borderRadius="12px"
            bg="white"
            boxShadow="lg"
            margin="auto"
          >
            <Flex direction="column" align="center" gap={3} mb={5}>
              <Box
                bg="#F0F7FF"
                p={3.5}
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <BadgeInfo size={28} color="#007AFF" strokeWidth={2} />
              </Box>
              <Dialog.Header p={0}>
                <Dialog.Title
                  fontSize="xl"
                  fontWeight={600}
                  color="#222222"
                  textAlign="center"
                >
                  Transaction details
                </Dialog.Title>
              </Dialog.Header>
            </Flex>

            <Dialog.Body p={0} mb={6}>
              <Box
                border="1px solid #E9E9E9"
                borderRadius="lg"
                p={4}
                bg="#FAFAFA"
                mb={4}
              >
                <Flex
                  justify="space-between"
                  align="flex-start"
                  gap={4}
                  flexWrap="wrap"
                  mb={3}
                >
                  <Box>
                    <Text fontSize="lg" fontWeight={600} color="#222222">
                      {formatAmount(transaction.amount)}
                    </Text>
                    <Text fontSize="sm" color="#737373" mt={1}>
                      {transaction.feeType}
                    </Text>
                  </Box>
                  <Text
                    fontSize="xs"
                    fontWeight={500}
                    border="1px solid"
                    borderColor={borderColor}
                    bg={bg}
                    color={textColor}
                    py="5px"
                    px="12px"
                    borderRadius="full"
                  >
                    {transaction.paymentStatus}
                  </Text>
                </Flex>
                <Text fontSize="sm" color="#737373">
                  {transaction.description}
                </Text>
              </Box>

              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={4}
              >
                <DetailField
                  label="Transaction ID"
                  value={transaction.transactionId}
                />
                <DetailField label="User ID" value={transaction.userId} />
                <DetailField
                  label="User full name"
                  value={transaction.userFullName}
                />
                <DetailField label="User email" value={transaction.userEmail} />
                <DetailField label="Amount" value={formatAmount(transaction.amount)} />
                <DetailField label="Fee type" value={transaction.feeType} />
                <DetailField label="Payment type" value={transaction.paymentType} />
                <DetailField
                  label="Payment channel"
                  value={transaction.paymentChannel}
                />
                <DetailField
                  label="Payment status"
                  value={transaction.paymentStatus}
                />
                <DetailField label="Swap ID" value={transaction.swapId} />
                <DetailField label="Room name" value={transaction.roomName} />
                <DetailField
                  label="Created"
                  value={
                    transaction.createdPaymentTime
                      ? formatDateTime(transaction.createdPaymentTime)
                      : null
                  }
                />
                <DetailField
                  label="Completed"
                  value={
                    transaction.completePaymentTime
                      ? formatDateTime(transaction.completePaymentTime)
                      : null
                  }
                />
              </Grid>
            </Dialog.Body>

            <Dialog.Footer p={0}>
              <Flex w="full" justify="flex-end">
                <Button
                  variant="outline"
                  borderColor="#E9E9E9"
                  color="#222222"
                  onClick={onClose}
                >
                  Close
                </Button>
              </Flex>
            </Dialog.Footer>
          </Dialog.Content>
          )}
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
