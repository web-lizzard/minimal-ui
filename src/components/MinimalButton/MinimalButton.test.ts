import { describe, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MinimalButton from './MinimalButton.vue';

describe('Minimal Button', () => {
  it('should display button', () => {
    mount(MinimalButton);
  });
});
