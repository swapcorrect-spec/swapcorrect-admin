import {
  Input as ChakraInput,
  Field,
  InputGroup,
  Textarea,
} from "@chakra-ui/react";

import type { FC } from "react";

type InputProps = {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  type:
    | "text"
    | "password"
    | "email"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "textarea";
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
  variant?: "outline" | "subtle" | "flushed";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  endElement?: React.ReactNode;
  colorPallete?: string;
  ref?: React.Ref<HTMLInputElement>;
  css?: React.CSSProperties;
  disabled?: boolean;
  startAddon?: string | React.ReactNode;
  startElement?: string | React.ReactNode;
  isRequired?: boolean;
  resize?: "none" | "both" | "horizontal" | "vertical";
};

export const Input: FC<InputProps> = ({
  label,
  name,
  type,
  placeholder,
  error,
  errorMessage,
  size,
  handleChange,
  value,
  variant,
  endElement,
  ref,
  startAddon,
  startElement,
  isRequired,
  resize,
  ...rest
}) => {
  return (
    <Field.Root invalid={error}>
      {label && (
        <Field.Label
          color={"#101928"}
          fontSize={"14px"}
          fontStyle={"normal"}
          fontWeight={500}
        >
          {label}
          {isRequired && <Field.RequiredIndicator />}
        </Field.Label>
      )}
      {type === "textarea" ? (
        <Textarea
          placeholder={placeholder}
          name={name}
          variant={variant}
          resize={resize}
          size={size}
        />
      ) : (
        <InputGroup
          startAddon={startAddon}
          startElement={startElement}
          endElement={endElement}
        >
          <ChakraInput
            placeholder={placeholder}
            type={type}
            name={name}
            value={value}
            variant={variant}
            size={size}
            onChange={handleChange}
            ref={ref}
            {...rest}
          />
        </InputGroup>
      )}
      {errorMessage && <Field.ErrorText>{errorMessage}</Field.ErrorText>}
    </Field.Root>
  );
};
