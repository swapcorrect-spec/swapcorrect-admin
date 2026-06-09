import { Box, Button, Dialog, Flex, Grid, Portal, Text } from "@chakra-ui/react";
import { Eye } from "lucide-react";
import { formatDateTime, formatMoney } from "~/modules/util";
import type { WithdrawalItem } from "~/hooks/queries/withdrawal/withdrawal.type";

type WithdrawalDetailsModalProps = {
  open: boolean;
  withdrawal: WithdrawalItem | null;
  onClose: () => void;
};

const formatLabel = (key: string) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();

const formatValue = (key: string, value: unknown): string => {
  if (value == null || value === "") return "—";
  if (typeof value === "object") return JSON.stringify(value);

  const keyName = key.toLowerCase();

  if (keyName.includes("amount")) {
    const num = Number(value);
    return Number.isFinite(num) ? formatMoney(num) : String(value);
  }

  if (
    typeof value === "string" &&
    (keyName.includes("date") ||
      keyName.includes("created") ||
      keyName.includes("updated") ||
      keyName.includes("time"))
  ) {
    return formatDateTime(value);
  }

  return String(value);
};

export const WithdrawalDetailsModal: React.FC<WithdrawalDetailsModalProps> = ({
  open,
  withdrawal,
  onClose,
}) => {
  const fields = withdrawal
    ? Object.entries(withdrawal).filter(([key]) => key !== "action")
    : [];

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
          {withdrawal && (
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
                  <Eye size={28} color="#007AFF" strokeWidth={2} />
                </Box>
                <Dialog.Header p={0}>
                  <Dialog.Title
                    fontSize="xl"
                    fontWeight={600}
                    color="#222222"
                    textAlign="center"
                  >
                    Withdrawal details
                  </Dialog.Title>
                </Dialog.Header>
              </Flex>

              <Dialog.Body p={0} mb={6}>
                <Grid
                  templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                  gap={4}
                >
                  {fields.map(([key, value]) => (
                    <Box key={key}>
                      <Text fontSize="xs" color="#737373" fontWeight={500} mb={1}>
                        {formatLabel(key)}
                      </Text>
                      <Text fontSize="sm" color="#222222" wordBreak="break-word">
                        {formatValue(key, value)}
                      </Text>
                    </Box>
                  ))}
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
