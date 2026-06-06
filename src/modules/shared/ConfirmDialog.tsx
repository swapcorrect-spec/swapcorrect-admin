import { Box, Button, Dialog, Flex, Portal } from "@chakra-ui/react";
import type { FC, ReactNode } from "react";

type ConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  confirmLabel: string;
  onConfirm: () => void;
  confirmBg?: string;
  confirmHoverBg?: string;
  confirmColor?: string;
  isLoading?: boolean;
  confirmDisabled?: boolean;
  maxW?: string;
};

export const ConfirmDialog: FC<ConfirmDialogProps> = ({
  open,
  onClose,
  title,
  icon,
  children,
  confirmLabel,
  onConfirm,
  confirmBg = "#222222",
  confirmHoverBg = "#333333",
  confirmColor = "white",
  isLoading = false,
  confirmDisabled = false,
  maxW = "480px",
}) => {
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
          <Dialog.Content
            maxW={maxW}
            w="full"
            p={6}
            borderRadius="12px"
            bg="white"
            boxShadow="lg"
            margin="auto"
          >
            <Flex direction="column" mb={5} gap={icon ? 4 : 2}>
              {icon && (
                <Box display="flex" justifyContent="center">{icon}</Box>
              )}
              <Dialog.Header p={0}>
                <Dialog.Title
                  fontSize="xl"
                  fontWeight={600}
                  color="#222222"
                  textAlign={icon ? "center" : "left"}
                >
                  {title}
                </Dialog.Title>
              </Dialog.Header>
            </Flex>
            <Dialog.Body p={0} mb={6}>
              {children}
            </Dialog.Body>
            <Dialog.Footer p={0}>
              <Flex gap={3} w="full" justify="flex-end">
                <Button
                  variant="outline"
                  borderColor="#E9E9E9"
                  color="#222222"
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  bg={confirmBg}
                  color={confirmColor}
                  _hover={{ bg: confirmHoverBg }}
                  onClick={onConfirm}
                  loading={isLoading}
                  disabled={confirmDisabled || isLoading}
                >
                  {confirmLabel}
                </Button>
              </Flex>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
