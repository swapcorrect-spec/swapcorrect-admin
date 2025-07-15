import { defineRecipe } from "@chakra-ui/react";

export const inputRecipe = defineRecipe({
  base: {
    display: "flex",
    _placeholder: {
      fontWeight: 400,
      fontSize: 14,
    },
  },
  variants: {
    variant: {
      outline: {
        borderWidth: "1px",
        borderColor: "#D0D5DD",
        borderRadius: "6px",
        padding: "16px",
        _focus: {
          borderWidth: "1px",
          borderColor: "#c4c7ca",
          outline: "0px",
          width: "full",
        },
      },
    },
    size: {
      sm: { padding: "4px", fontSize: "12px" },
      md: {
        py: "8px",
        px: "24px",
        fontSize: "14px",
        fontWeight: 500,
        fontStyle: "normal",
      },
    },
  },
  defaultVariants: {
    variant: "outline",
    size: "md",
  },
});
