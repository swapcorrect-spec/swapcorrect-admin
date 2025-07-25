import { Dialog as ChakraDialog, Portal } from "@chakra-ui/react";
interface iDialogProps {
  children: React.ReactNode;
  onOpenChange: () => void;
  open: boolean;
  size: "sm" | "md" | "lg" | "xl" | "xs" | "cover" | "full";
  style: any;
}

export const Dialog: React.FC<iDialogProps> = ({
  children,
  open,
  onOpenChange,
  size = "md",
  style,
}) => {
  return (
    <ChakraDialog.Root open={open} onOpenChange={onOpenChange} size={size}>
      <Portal>
        <ChakraDialog.Backdrop />
        <ChakraDialog.Positioner style={style}>
          <ChakraDialog.Content>
            <ChakraDialog.Body height="100vh" overflowY={"auto"}>
              {children}
            </ChakraDialog.Body>
          </ChakraDialog.Content>
        </ChakraDialog.Positioner>
      </Portal>
    </ChakraDialog.Root>
  );
};
