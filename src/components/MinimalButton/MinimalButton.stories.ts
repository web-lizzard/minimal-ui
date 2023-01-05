// Button.stories.ts

import MinimalButton from './MinimalButton.vue';

import type { Meta, StoryFn } from '@storybook/vue3';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'MinimalButton',
  component: MinimalButton,
} as Meta<typeof MinimalButton>;

const Template: StoryFn<typeof MinimalButton> = () => ({
  components: { MinimalButton },
  template: '<MinimalButton  />',
});

export const Primary = Template.bind({});
