import { Button as ChakraButton } from "@chakra-ui/react";
import type { FC } from "react";

type ButtonProps = {
  children: React.ReactNode;
  handleClick?: () => void;
  variant?: "solid" | "subtle" | "surface" | "outline" | "ghost" | "plain";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  loadingText?: string;
  isDisabled?: boolean;
  colorPallete?: string;
  spinnerPlacement?: "start" | "end";
  spinner?: React.ReactNode;
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  width?: string | number;
  bg?: string;
};

export const Button: FC<ButtonProps> = ({
  children,
  handleClick,
  width = "full",
  ...rest
}) => {
  return (
    <ChakraButton onClick={handleClick} width={width} {...rest}>
      {children}
    </ChakraButton>
  );
};
