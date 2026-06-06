import { Box, Flex, Text, Textarea } from "@chakra-ui/react";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useTreatWithdrawal } from "~/hooks/queries/withdrawal/withdrawal";
import type { WithdrawalItem } from "~/hooks/queries/withdrawal/withdrawal.type";
import {
  getWithdrawalId,
  getWithdrawalStatus,
  isWithdrawalPending,
} from "~/hooks/queries/withdrawal/withdrawal.type";
import { ConfirmDialog } from "~/modules/shared/ConfirmDialog";

type WithdrawalTreatConfirmProps = {
  open: boolean;
  withdrawal: WithdrawalItem | null;
  onClose: () => void;
  onSuccess?: () => void;
};

const WithdrawalSummaryCard: React.FC<{ withdrawal: WithdrawalItem }> = ({
  withdrawal,
}) => {
  const status = getWithdrawalStatus(withdrawal);
  const withdrawalId = getWithdrawalId(withdrawal);

  const amountEntry = Object.entries(withdrawal).find(([key]) =>
    key.toLowerCase().includes("amount"),
  );
  const amount = amountEntry ? String(amountEntry[1] ?? "") : "";

  return (
    <Box border="1px solid #E9E9E9" borderRadius="lg" p={4} bg="#FAFAFA">
      {withdrawalId && (
        <Text fontSize="sm" color="#737373" mb={1}>
          ID: {withdrawalId}
        </Text>
      )}
      {amount && (
        <Text fontSize="md" fontWeight={600} color="#222222" mb={1}>
          {amount}
        </Text>
      )}
      {status && (
        <Text fontSize="sm" color="#737373">
          Status: {status}
        </Text>
      )}
    </Box>
  );
};

export const WithdrawalTreatConfirm: React.FC<WithdrawalTreatConfirmProps> = ({
  open,
  withdrawal,
  onClose,
  onSuccess,
}) => {
  const [adminNote, setAdminNote] = useState("");
  const status = withdrawal ? getWithdrawalStatus(withdrawal) : "";
  const isPending = withdrawal ? isWithdrawalPending(status) : false;

  useEffect(() => {
    if (!open) setAdminNote("");
  }, [open]);

  const { mutate: treatWithdrawal, isPending: isSubmitting } =
    useTreatWithdrawal({
      onSuccess: (res: { displayMessage?: string }) => {
        toast.success(res?.displayMessage || "Withdrawal treated");
        setAdminNote("");
        onClose();
        onSuccess?.();
      },
      onError: (msg) => toast.error(msg),
    });

  const handleClose = () => {
    if (isSubmitting) return;
    setAdminNote("");
    onClose();
  };

  const handleConfirm = () => {
    if (!withdrawal) return;

    const withdrawalId = getWithdrawalId(withdrawal);
    if (!withdrawalId) {
      toast.error("Withdrawal ID is missing");
      return;
    }

    treatWithdrawal({
      withdrawalId,
      adminNote: adminNote.trim(),
    });
  };

  return (
    <ConfirmDialog
      open={open && !!withdrawal && isPending}
      onClose={handleClose}
      title="Treat withdrawal?"
      confirmLabel="Treat withdrawal"
      confirmBg="#222222"
      confirmHoverBg="#333333"
      isLoading={isSubmitting}
      icon={
        <Box
          bg="#EDFFEA"
          p={3.5}
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Check size={28} color="#106104" strokeWidth={2} />
        </Box>
      }
      onConfirm={handleConfirm}
    >
      {withdrawal && (
        <Flex direction="column" gap={4}>
          <WithdrawalSummaryCard withdrawal={withdrawal} />

          <Box>
            <Text fontSize="sm" fontWeight={500} color="#222222" mb={2}>
              Admin note
            </Text>
            <Textarea
              placeholder="Add a note about this withdrawal..."
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              rows={4}
              resize="vertical"
              borderColor="#E9E9E9"
              _focus={{ borderColor: "#007AFF" }}
            />
          </Box>
        </Flex>
      )}
    </ConfirmDialog>
  );
};
