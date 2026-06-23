import { Box, Flex, Text } from "@chakra-ui/react";
import { Flag } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useFlagContent } from "~/hooks/queries/listing/listing";
import { ConfirmDialog } from "~/modules/shared/ConfirmDialog";
import { getSwapStatusStyles } from "~/modules/util";

export type SwapFlagSummary = {
  swapProceedId: string;
  ownerName: string;
  swapperName: string;
  ownerItem: string;
  swapperItem: string;
  status: string;
  isFlagged?: boolean;
};

type SwapFlagConfirmProps = {
  open: boolean;
  swap: SwapFlagSummary | null;
  onClose: () => void;
  onSuccess?: () => void;
};

const SwapSummaryCard: React.FC<{ swap: SwapFlagSummary }> = ({ swap }) => {
  const { borderColor, bg, textColor } = getSwapStatusStyles(swap.status);

  return (
    <Box border="1px solid #E9E9E9" borderRadius="lg" p={4} bg="#FAFAFA">
      <Text fontSize="md" fontWeight={600} color="#222222" mb={2}>
        {swap.ownerName || "N/A"} ↔ {swap.swapperName || "N/A"}
      </Text>
      <Text fontSize="sm" color="#737373" mb={1}>
        Owner item: {swap.ownerItem || "N/A"}
      </Text>
      <Text fontSize="sm" color="#737373" mb={2}>
        Swapper item: {swap.swapperItem || "N/A"}
      </Text>
      <Text
        border="1px solid"
        borderColor={borderColor}
        bg={bg}
        color={textColor}
        py="5px"
        px="12px"
        borderRadius="37.74px"
        width="fit-content"
        fontSize="13px"
        fontWeight={500}
        whiteSpace="nowrap"
      >
        {swap.status || "N/A"}
      </Text>
    </Box>
  );
};

const FlagRadioOption: React.FC<{
  name: string;
  label: string;
  description: string;
  checked: boolean;
  onSelect: () => void;
}> = ({ name, label, description, checked, onSelect }) => (
  <Box
    as="label"
    display="flex"
    alignItems="flex-start"
    gap={3}
    p={3}
    border="1px solid"
    borderColor={checked ? "#007AFF" : "#E9E9E9"}
    borderRadius="lg"
    bg={checked ? "#F0F7FF" : "white"}
    cursor="pointer"
  >
    <input
      type="radio"
      name={name}
      checked={checked}
      onChange={onSelect}
      style={{ marginTop: 4, accentColor: "#007AFF" }}
    />
    <Box>
      <Text fontSize="sm" fontWeight={500} color="#222222">
        {label}
      </Text>
      <Text fontSize="xs" color="#737373" mt={0.5}>
        {description}
      </Text>
    </Box>
  </Box>
);

export const SwapFlagConfirm: React.FC<SwapFlagConfirmProps> = ({
  open,
  swap,
  onClose,
  onSuccess,
}) => {
  const [isFlagged, setIsFlagged] = useState(true);
  const currentlyFlagged = !!swap?.isFlagged;

  useEffect(() => {
    if (open && swap) {
      setIsFlagged(!swap.isFlagged);
    }
  }, [open, swap]);

  const { mutate: flagContent, isPending } = useFlagContent({
    onSuccess: (res: { displayMessage?: string }) => {
      toast.success(res?.displayMessage || "Swap flag updated");
      onClose();
      onSuccess?.();
    },
    onError: (msg) => toast.error(msg),
  });

  const handleClose = () => {
    if (isPending) return;
    onClose();
  };

  const handleConfirm = () => {
    if (!swap?.swapProceedId) return;

    flagContent({
      contentId: swap.swapProceedId,
      contentType: "Swap",
      isFlagged,
    });
  };

  return (
    <ConfirmDialog
      open={open && !!swap}
      onClose={handleClose}
      title={currentlyFlagged ? "Unflag swap?" : "Flag swap?"}
      confirmLabel={currentlyFlagged ? "Unflag swap" : "Flag swap"}
      confirmBg="#E42222"
      confirmHoverBg="#c91e1e"
      isLoading={isPending}
      icon={
        <Box
          bg="#FFF0EF"
          p={3.5}
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Flag size={28} color="#E42222" strokeWidth={2} />
        </Box>
      }
      onConfirm={handleConfirm}
    >
      {swap && (
        <Flex direction="column" gap={4}>
          <SwapSummaryCard swap={swap} />

          <Flex direction="column" gap={2}>
            <Text fontSize="sm" fontWeight={500} color="#222222">
              Flag status
            </Text>
            {currentlyFlagged ? (
              <FlagRadioOption
                name="swap-flag-status"
                label="Unflag swap"
                description="Remove the flag from this swap."
                checked={!isFlagged}
                onSelect={() => setIsFlagged(false)}
              />
            ) : (
              <FlagRadioOption
                name="swap-flag-status"
                label="Flag swap"
                description="Mark this swap as flagged for review."
                checked={isFlagged}
                onSelect={() => setIsFlagged(true)}
              />
            )}
          </Flex>
        </Flex>
      )}
    </ConfirmDialog>
  );
};
