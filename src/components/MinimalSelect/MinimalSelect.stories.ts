import { ref } from 'vue';
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

const Template: StoryFn<typeof MinimalSelect> = (args) => ({
  setup() {
    const currentValue = ref('');
    const options = [
      { value: '1', label: 'first' },
      { value: '2', label: 'second' },
      { value: '3', label: 'third' },
      { value: '4', label: 'fourth' },
      { value: '5', label: 'fifth' },
    ];

    return {
      currentValue,
      options,
      args,
    };
  },
  components: { MinimalSelect },
  template:
    '<MinimalSelect v-bind="args" v-model="currentValue" :options="options"  />',
});

export const Primary = Template.bind({});
