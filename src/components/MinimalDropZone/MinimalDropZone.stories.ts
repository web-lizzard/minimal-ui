// Button.stories.ts

import MinimalDropZone from './MinimalDropZone.vue';

import type { Meta, StoryFn } from '@storybook/vue3';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'MinimalDropZone',
  component: MinimalDropZone,
} as Meta<typeof MinimalDropZone>;

const Template: StoryFn<typeof MinimalDropZone> = () => ({
  components: { MinimalDropZone },
  template: '<MinimalDropZone  />',
});

export const Primary = Template.bind({});
