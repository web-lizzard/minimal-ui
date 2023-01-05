<script lang="ts" setup>
import MinimalButton from '@/components/MinimalButton/MinimalButton.vue';
import { computed, ref } from 'vue';

type SelectOption = {
  value: string;
  label: string;
};

type Props = {
  id?: string;
  buttonPlaceholder?: string;
  options?: SelectOption[];
  modelValue?: string;
  multiselect?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  id: 'select-id',
  buttonPlaceholder: 'Placeholder',
  options: () => [],
  multiselect: false,
});

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

const open = ref(false);
const higlightedIndex = ref(0);

const currentItem = computed(() =>
  props.options.find(({ value }) => value === props.modelValue)
);

const placeholder = computed(
  () => currentItem.value?.label || props.buttonPlaceholder
);

function handleKeyDown(e: KeyboardEvent) {
  e.preventDefault();
  switch (e.code) {
    case 'Enter':
    case 'Space':
      if (!open.value) {
        toggleListVisibility();
        return;
      }
      handleSelectOption(props.options[higlightedIndex.value].value);
      break;
    case 'Escape':
      closeDropdown();
      break;
    case 'ArrowDown':
    case 'ArrowUp':
      if (!open.value) {
        toggleListVisibility();
        break;
      }
      handleArrowsDown(e.code);
      break;
  }
}

function handleArrowsDown(code: 'ArrowUp' | 'ArrowDown') {
  const newValue = code === 'ArrowUp' ? -1 : 1;
  if (higlightedIndex.value === 0 && newValue - 1) {
    return;
  }

  if (newValue === 1 && higlightedIndex.value === props.options.length - 1) {
    return;
  }

  higlightedIndex.value += newValue;
}

function closeDropdown() {
  open.value = false;
  higlightedIndex.value = 0;
}

function toggleListVisibility() {
  open.value = !open.value;
}

function handleSelectOption(value: string) {
  emit('update:modelValue', value);
  closeDropdown();
}

function higlightOption(index: number) {
  return index === higlightedIndex.value;
}
</script>

<template>
  <div class="minimal-select" v-click-outside="closeDropdown">
    <MinimalButton
      @keydown="handleKeyDown"
      class="flex | minimal-select__button"
      data-alternative
      :aria-expanded="open"
      aria-haspopup="listbox"
      :aria-controls="id"
      :aria-activedescendant="currentItem?.label || ''"
      role="combobox"
      @click="toggleListVisibility"
      ><span>{{ placeholder }} </span>
      <span aria-hidden="true" :data-opened="open" class="minimal-select__arrow"
        >&#8594;</span
      >
    </MinimalButton>
    <ul
      :id="id"
      :aria-multiselectable="multiselect"
      v-show="open"
      class="minimal-select__listbox"
      role="listbox"
    >
      <li
        role="option"
        class="minimal-select__item"
        v-for="(option, index) in options"
        :key="option.value"
        :data-highlighted="higlightOption(index)"
        :aria-selected="option.value === modelValue"
        :id="option.value"
        @click="handleSelectOption(option.value)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.minimal-select {
  position: relative;
  max-width: var(--select-max-width, min(24rem, 100%));

  &__button {
    --button-padding-block: var(--spacing-4);
    justify-content: space-between;
    width: 100%;
  }

  &__listbox {
    position: absolute;
    width: 100%;
    top: var(--select-list-top-position, 130%);
    left: 0;
    max-height: var(--select-list-max-height, 50rem);
    overflow: auto;
    border: var(--select-list-border-width, 4px) solid
      var(--select-list-border-width, var(--clr-neutral-900));
  }

  &__arrow {
    transition: transform 150ms ease;

    &[data-opened='true'] {
      transform: rotate(90deg);
    }
  }

  &__item {
    padding-block: var(--select-item-padding-block, var(--spacing-8));
    padding-inline: var(--select-item-padding-inline, var(--spacing-4));
    cursor: pointer;

    &:hover {
      background-color: var(--clr-neutral-700);
      color: var(--clr-neutral-100);
    }

    &[data-highlighted='true'] {
      background-color: var(--clr-neutral-700);
      color: var(--clr-neutral-100);
    }

    &[aria-selected='true'] {
      background-color: var(--clr-neutral-800);
      color: var(--clr-neutral-100);
    }
  }

  &__item:not(:last-of-type) {
    border-bottom: var(--select-item-border-width, 2px) solid
      var(--select-item-border-color, var(--clr-neutral-900));
  }
}
</style>
