import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  base: {
    display: "flex",
    width: "full"
  },
  variants: {
    variant: {
      solid: { bg: "#0D5EBA", color: "#fff", borderRadius: '6px', _hover: {bg: '#0d5ebae6'} },
      outline: { borderWidth: "1px", borderColor: "red.200" },
    },
    size: {
      sm: { padding: "4", fontSize: "12px" },
      md: { py: "8px", px: '24px', fontSize: "14px", fontWeight: 600, fontStyle: 'normal' },
    },
  },
  defaultVariants:{
    variant: 'solid',
    size: 'md'
  }
})