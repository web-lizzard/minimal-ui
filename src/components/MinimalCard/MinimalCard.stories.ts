// Button.stories.ts

import MinimalCard from './MinimalCard.vue';

import type { Meta, StoryFn } from '@storybook/vue3';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'MinimalCard',
  component: MinimalCard,
} as Meta<typeof MinimalCard>;

const Template: StoryFn<typeof MinimalCard> = () => ({
  components: { MinimalCard },
  template: '<MinimalCard  />',
});

export const Primary = Template.bind({});
