import MinimalSelect from './MinimalSelect.vue';

import type { Meta, StoryFn } from '@storybook/vue3';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'MinimalSelect',
  component: MinimalSelect,
} as Meta<typeof MinimalSelect>;

const Template: StoryFn<typeof MinimalSelect> = () => ({
  components: { MinimalSelect },
  template: '<MinimalSelect  />',
});

export const Primary = Template.bind({});
