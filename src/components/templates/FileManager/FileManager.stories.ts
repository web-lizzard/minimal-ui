// Button.stories.ts

import FileManager from './FileManager.vue';

import type { Meta, StoryFn } from '@storybook/vue3';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'templates/FileManager',
  component: FileManager,
} as Meta<typeof FileManager>;

const Template: StoryFn<typeof FileManager> = () => ({
  components: { FileManager },
  template: '<FileManager  />',
});

export const Primary = Template.bind({});
