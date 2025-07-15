import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  base: {
    display: "flex",
    width: "full"
  },
  variants: {
    variant: {
      solid: { bg: "#222222", color: "#fff", borderRadius: '32px', _hover: {bg: '#222222'} },
      subtle: { bg: "#F6F6F6", color: "#737373", borderRadius: '32px', _hover: {bg: '#F6F6F6'} },
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