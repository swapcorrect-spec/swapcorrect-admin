import { Box, Flex, Text, Textarea } from "@chakra-ui/react";
import { Check, Flag, X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  LISTING_DETAILS,
  LISTINGS,
  useFlagContent,
  useUpdateListingReview,
} from "~/hooks/queries/listing/listing";
import { ConfirmDialog } from "~/modules/shared/ConfirmDialog";
import { formatCurrency } from "~/modules/util";

export type ListingReviewSummary = {
  listingId: string;
  itemName: string;
  categoryName?: string;
  listType?: string;
  estimatedAmount?: number;
  estimatedCurrency?: string;
  owner?: string;
  isFlagged?: boolean;
};

export type ListingActionMode = "approve" | "reject" | "flag";

type ListingReviewConfirmProps = {
  open: boolean;
  mode: ListingActionMode | null;
  listing: ListingReviewSummary | null;
  onClose: () => void;
  onSuccess?: () => void;
};

const ListingSummaryCard: React.FC<{ listing: ListingReviewSummary }> = ({
  listing,
}) => (
  <Box border="1px solid #E9E9E9" borderRadius="lg" p={4} bg="#FAFAFA">
    <Text fontSize="md" fontWeight={600} color="#222222" mb={2}>
      {listing.itemName}
    </Text>
    <Flex gap={2} flexWrap="wrap" mb={2}>
      {listing.categoryName && (
        <Text fontSize="xs" color="#737373">
          {listing.categoryName}
        </Text>
      )}
      {listing.listType && (
        <Text fontSize="xs" color="#737373">
          · {listing.listType}
        </Text>
      )}
    </Flex>
    {(listing.estimatedAmount != null || listing.estimatedCurrency) && (
      <Text fontSize="sm" color="#007AFF" fontWeight={500} mb={1}>
        {formatCurrency(listing.estimatedAmount, listing.estimatedCurrency)} Est.
      </Text>
    )}
    {listing.owner && (
      <Text fontSize="sm" color="#737373">
        Owner: {listing.owner}
      </Text>
    )}
  </Box>
);

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

export const ListingReviewConfirm: React.FC<ListingReviewConfirmProps> = ({
  open,
  mode,
  listing,
  onClose,
  onSuccess,
}) => {
  const [rejectionNote, setRejectionNote] = useState("");
  const [isFlagged, setIsFlagged] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (open && mode === "flag" && listing) {
      setIsFlagged(!listing.isFlagged);
    }
  }, [open, mode, listing]);

  const invalidateListing = () => {
    queryClient.invalidateQueries({ queryKey: [LISTINGS] });
    if (listing?.listingId) {
      queryClient.invalidateQueries({
        queryKey: [LISTING_DETAILS, listing.listingId],
      });
    }
  };

  const { mutate: updateReview, isPending: isReviewPending } =
    useUpdateListingReview({
      onSuccess: (res: { displayMessage?: string }) => {
        toast.success(res?.displayMessage || "Listing review updated");
        invalidateListing();
        setRejectionNote("");
        onClose();
        onSuccess?.();
      },
      onError: (msg) => toast.error(msg),
    });

  const { mutate: flagContent, isPending: isFlagPending } = useFlagContent({
    onSuccess: (res: { displayMessage?: string }) => {
      toast.success(res?.displayMessage || "Listing flag updated");
      invalidateListing();
      onClose();
      onSuccess?.();
    },
    onError: (msg) => toast.error(msg),
  });

  const isPending = isReviewPending || isFlagPending;

  const handleClose = () => {
    if (isPending) return;
    setRejectionNote("");
    onClose();
  };

  const handleConfirm = () => {
    if (!listing?.listingId || !mode) return;

    if (mode === "flag") {
      flagContent({
        contentId: listing.listingId,
        contentType: "Listing",
        isFlagged,
      });
      return;
    }

    if (mode === "approve") {
      updateReview({
        listingId: listing.listingId,
        review: "Approved",
      });
      return;
    }

    updateReview({
      listingId: listing.listingId,
      review: "Rejected",
      rejectionNote: rejectionNote.trim(),
    });
  };

  const isReject = mode === "reject";
  const isFlag = mode === "flag";
  const noteValid = rejectionNote.trim().length >= 3;

  const currentlyFlagged = !!listing?.isFlagged;

  const dialogConfig = isFlag
    ? {
        title: currentlyFlagged ? "Unflag listing?" : "Flag listing?",
        confirmLabel: currentlyFlagged ? "Unflag listing" : "Flag listing",
        confirmBg: "#E42222",
        confirmHoverBg: "#c91e1e",
        icon: (
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
        ),
      }
    : isReject
      ? {
          title: "Reject listing?",
          confirmLabel: "Reject listing",
          confirmBg: "#E42222",
          confirmHoverBg: "#c91e1e",
          icon: (
            <Box
              bg="#FFF0EF"
              p={3.5}
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <X size={28} color="#E42222" strokeWidth={2} />
            </Box>
          ),
        }
      : {
          title: "Approve listing?",
          confirmLabel: "Approve listing",
          confirmBg: "#222222",
          confirmHoverBg: "#333333",
          icon: (
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
          ),
        };

  return (
    <ConfirmDialog
      open={open && !!mode && !!listing}
      onClose={handleClose}
      title={dialogConfig.title}
      icon={dialogConfig.icon}
      confirmLabel={dialogConfig.confirmLabel}
      confirmBg={dialogConfig.confirmBg}
      confirmHoverBg={dialogConfig.confirmHoverBg}
      onConfirm={handleConfirm}
      isLoading={isPending}
      confirmDisabled={isReject && !noteValid}
    >
      {listing && (
        <Flex direction="column" gap={4}>
          <ListingSummaryCard listing={listing} />

          {isFlag ? (
            <Flex direction="column" gap={2}>
              <Text fontSize="sm" fontWeight={500} color="#222222">
                Flag status
              </Text>
              {currentlyFlagged ? (
                <FlagRadioOption
                  name="flag-status"
                  label="Unflag listing"
                  description="Remove the flag from this listing."
                  checked={!isFlagged}
                  onSelect={() => setIsFlagged(false)}
                />
              ) : (
                <FlagRadioOption
                  name="flag-status"
                  label="Flag listing"
                  description="Mark this listing as flagged for review."
                  checked={isFlagged}
                  onSelect={() => setIsFlagged(true)}
                />
              )}
            </Flex>
          ) : isReject ? (
            <Box>
              <Text fontSize="sm" fontWeight={500} color="#222222" mb={2}>
                Rejection reason <Text as="span" color="#E42222">*</Text>
              </Text>
              <Textarea
                placeholder="Explain why this listing is being rejected..."
                value={rejectionNote}
                onChange={(e) => setRejectionNote(e.target.value)}
                rows={4}
                resize="vertical"
                borderColor="#E9E9E9"
                _focus={{ borderColor: "#007AFF" }}
              />
              <Text fontSize="xs" color="#737373" mt={1}>
                This note will be sent with the rejection.
              </Text>
            </Box>
          ) : (
            <Text fontSize="sm" color="#737373" lineHeight="tall">
              This listing will be marked as approved and visible on the
              platform.
            </Text>
          )}
        </Flex>
      )}
    </ConfirmDialog>
  );
};
