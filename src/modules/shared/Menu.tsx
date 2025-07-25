import { Menu as ChakraMenu, Box } from "@chakra-ui/react";
import { HorizontalDots } from "~/assets/images";
interface iMenu {
  children: React.ReactNode;
}
interface iMenuItem {
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
  value: string;
  styleProps: Record<string | number, string | number>;
}
export const Menu: React.FC<iMenu> = ({ children }) => {
  return (
    <ChakraMenu.Root>
      <ChakraMenu.Trigger as={Box} position="relative" cursor="pointer">
        <HorizontalDots />
      </ChakraMenu.Trigger>
      <ChakraMenu.Positioner>
        <ChakraMenu.Content p={4} minH="100px" minW="210px" h="full">
          {children}
        </ChakraMenu.Content>
      </ChakraMenu.Positioner>
    </ChakraMenu.Root>
  );
};

export const MenuItem: React.FC<iMenuItem> = ({
  value,
  onClick,
  label,
  icon,
  styleProps,
}) => {
  return (
    <ChakraMenu.Item
      cursor="pointer"
      _hover={{ bg: "#F5F5F5" }}
      fontSize="14px"
      py={3}
      px={4}
      {...styleProps}
      fontWeight="500"
      value={value}
      display="flex"
      alignItems="center"
      gap={3}
      onClick={onClick}
      borderRadius="md"
      bg="transparent"
    >
      {icon}
      {label}
    </ChakraMenu.Item>
  );
};
