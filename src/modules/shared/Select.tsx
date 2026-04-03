"use client";

import {
  Portal,
  Select as ChakraSelect,
  createListCollection,
  Field,
} from "@chakra-ui/react";
import type { FC } from "react";

type Option = {
  label: string;
  value: string;
};

type ChakraSelectProps = {
  label?: string;
  placeholder?: string;
  options: Option[];
  name: string;
  size?: "xs" | "sm" | "md" | "lg";
  width?: string | number;
  value?: string;
  onChange: (value: string) => void;
  error?: boolean;
  errorMessage?: string;
  isRequired?: boolean;
};

export const Select: FC<ChakraSelectProps> = ({
  label,
  placeholder = "ChakraSelect an option",
  options,
  name,
  size = "md",
  width = "100%",
  value,
  onChange,
  error,
  errorMessage,
  isRequired,
}) => {
  const collection = createListCollection({
    items: options,
  });

  return (
    <Field.Root invalid={error} width={width}>
      {label && (
        <Field.Label color="#101928" fontSize="14px" fontWeight={500}>
          {label}
          {isRequired && <Field.RequiredIndicator />}
        </Field.Label>
      )}
      <ChakraSelect.Root
        name={name}
        collection={collection}
        value={value ? [value] : []}
        onValueChange={(e) => onChange?.(e.value[0] || "")}
        size={size}
        width={width}
      >
        <ChakraSelect.HiddenSelect />
        <ChakraSelect.Control>
          <ChakraSelect.Trigger>
            <ChakraSelect.ValueText placeholder={placeholder} />
          </ChakraSelect.Trigger>
          <ChakraSelect.IndicatorGroup>
            <ChakraSelect.Indicator />
          </ChakraSelect.IndicatorGroup>
        </ChakraSelect.Control>
        <Portal>
          <ChakraSelect.Positioner>
            <ChakraSelect.Content>
              {collection.items.map((item) => (
                <ChakraSelect.Item item={item} key={item.value}>
                  {item.label}
                  <ChakraSelect.ItemIndicator />
                </ChakraSelect.Item>
              ))}
            </ChakraSelect.Content>
          </ChakraSelect.Positioner>
        </Portal>
      </ChakraSelect.Root>
      {errorMessage && <Field.ErrorText>{errorMessage}</Field.ErrorText>}
    </Field.Root>
  );
};
