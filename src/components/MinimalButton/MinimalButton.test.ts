import { describe, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MinimalButton from './MinimalButton.vue';

describe('Cyber Button', () => {
  it('should display button', () => {
    mount(MinimalButton);
  });
});
