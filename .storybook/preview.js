
import { app } from '@storybook/vue3'
import { clickOutside } from "@/utils/directives/clickOutside"
import "scss/index.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

app.directive('click-outside', clickOutside)