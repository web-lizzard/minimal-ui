import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import MinimalSelect from './MinimalSelect.vue';

const mockedOptions = [
  {
    value: '1',
    label: 'first',
  },
  {
    value: '2',
    label: 'second',
  },
];

describe('Minimal Select', () => {
  test("listbox should'nt be visible in default state", () => {
    const wrapper = mount(MinimalSelect);
    const ul = wrapper.find('ul');
    expect(ul.isVisible()).toBe(false);
  });

  test('clicking on button should render list of options', async () => {
    const wrapper = mount(MinimalSelect);
    await wrapper.find('button').trigger('click');

    const ul = wrapper.get('ul');
    expect(ul.isVisible()).toBe(true);
  });

  test('it should emit option value when option is clicked', async () => {
    const wrapper = mount(MinimalSelect, {
      props: {
        options: mockedOptions,
      },
    });
    await wrapper.find('button').trigger('click');

    await wrapper.find('li').trigger('click');

    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['1']);
  });

  test('it should open dropdown when press arrow key', async () => {
    const wrapper = mount(MinimalSelect, {
      props: {
        options: mockedOptions,
      },
    });
    await wrapper.find('button').trigger('keydown', {
      code: 'ArrowDown',
    });

    const ul = wrapper.get('ul');
    expect(ul.isVisible()).toBe(true);
  });

  test('it should change higlighted option element when press arrow down', async () => {
    const wrapper = mount(MinimalSelect, {
      props: {
        options: mockedOptions,
      },
    });
    await wrapper.find('button').trigger('keydown', {
      code: 'ArrowDown',
    });

    await wrapper.find('button').trigger('keydown', {
      code: 'ArrowDown',
    });

    const option = wrapper.find("[data-highlighted='true']");
    expect(option.text()).toBe('second');
  });

  test('it should emit higlighted value and close the dropdown when user press enter', async () => {
    const wrapper = mount(MinimalSelect, {
      props: {
        options: mockedOptions,
      },
    });
    await wrapper.find('button').trigger('keydown', {
      code: 'ArrowDown',
    });

    await wrapper.find('button').trigger('keydown', {
      code: 'ArrowDown',
    });

    wrapper.find("[data-highlighted='true']").trigger('click');
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['2']);
  });

  test('it should not change higlighted value when press arrow up button and first option is already highlighted', async () => {
    const wrapper = mount(MinimalSelect, {
      props: {
        options: mockedOptions,
      },
    });
    await wrapper.find('button').trigger('keydown', {
      code: 'ArrowUp',
    });

    await wrapper.find('button').trigger('keydown', {
      code: 'ArrowUp',
    });

    const option = wrapper.find("[data-highlighted='true']");
    expect(option.text()).toBe('first');
  });

  test('it should not change higlighted value when press arrow down button and last option is already highlighted', async () => {
    const wrapper = mount(MinimalSelect, {
      props: {
        options: mockedOptions,
      },
    });
    await wrapper.find('button').trigger('keydown', {
      code: 'ArrowDown',
    });

    await wrapper.find('button').trigger('keydown', {
      code: 'ArrowDown',
    });

    await wrapper.find('button').trigger('keydown', {
      code: 'ArrowDown',
    });

    const option = wrapper.find("[data-highlighted='true']");
    expect(option.text()).toBe('second');
  });
});
