import {
  Box,
  Button,
  Dialog,
  Flex,
  Portal,
  Text,
} from "@chakra-ui/react";
import { LogOut } from "lucide-react";
import type { FC } from "react";

type LogoutConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
};

export const LogoutConfirmDialog: FC<LogoutConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  isLoading = false,
}) => {
  return (
    <Dialog.Root
      open={open}
      placement="center"
      onOpenChange={(details) => {
        if (!details.open) onClose();
      }}
      role="alertdialog"
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
        >
          <Dialog.Content
            maxW="420px"
            w="full"
            p={6}
            borderRadius="12px"
            bg="white"
            boxShadow="lg"
            margin="auto"
          >
            <Flex direction="column" align="center" textAlign="center" mb={5}>
              <Box
                bg="#FFF0EF"
                p={3.5}
                borderRadius="full"
                mb={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <LogOut size={28} color="#E42222" strokeWidth={2} />
              </Box>
              <Dialog.Header p={0}>
                <Dialog.Title fontSize="xl" fontWeight={600} color="#222222">
                  Log out?
                </Dialog.Title>
              </Dialog.Header>
            </Flex>
            <Dialog.Body p={0} mb={6}>
              <Text color="#737373" fontSize="sm" lineHeight="tall" textAlign="center">
                You will be signed out of SwapCorrect Admin. You will need to log
                in again to continue.
              </Text>
            </Dialog.Body>
            <Dialog.Footer p={0}>
              <Flex gap={3} w="full" justify="center">
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
                  bg="#E42222"
                  color="white"
                  _hover={{ bg: "#c91e1e" }}
                  onClick={onConfirm}
                  loading={isLoading}
                >
                  <Flex align="center" gap={2}>
                    <LogOut size={16} />
                    Log out
                  </Flex>
                </Button>
              </Flex>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
