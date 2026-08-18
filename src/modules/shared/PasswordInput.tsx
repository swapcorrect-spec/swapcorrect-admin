import { IconButton } from "@chakra-ui/react";
import { Eye, EyeOff } from "lucide-react";
import { useState, type FC } from "react";
import { Input } from "./Input";

type PasswordInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "type" | "endElement"
>;

const passwordToggleButton = (
  show: boolean,
  onToggle: () => void
) => (
  <IconButton
    aria-label={show ? "Hide password" : "Show password"}
    variant="ghost"
    size="sm"
    type="button"
    color="#898989"
    _hover={{ bg: "transparent", color: "#101928" }}
    onClick={onToggle}
  >
    {show ? <EyeOff size={18} /> : <Eye size={18} />}
  </IconButton>
);

export const PasswordInput: FC<PasswordInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      {...props}
      type={showPassword ? "text" : "password"}
      endElement={passwordToggleButton(showPassword, () =>
        setShowPassword((prev) => !prev)
      )}
    />
  );
};
