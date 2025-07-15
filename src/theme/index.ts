
import { defineConfig } from "@chakra-ui/react";

import {buttonRecipe} from './components/button'
import {inputRecipe} from './components/input'


export const config = defineConfig({
  theme: {
    tokens: {
      colors: {},
    },
    recipes: {
      button: buttonRecipe,
      input: inputRecipe,
    },
  },
});