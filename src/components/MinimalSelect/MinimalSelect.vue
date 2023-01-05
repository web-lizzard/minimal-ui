<script lang="ts" setup>
import MinimalButton from '@/components/MinimalButton/MinimalButton.vue';
import { ref } from 'vue';

type SelectOption = {
  value: string;
  label: string;
};

type Props = {
  id?: string;
  buttonPlaceholder?: string;
  options: SelectOption[];
  modelValue?: string;
};

const props = withDefaults(defineProps<Props>(), {
  id: crypto.randomUUID(),
  buttonPlaceholder: 'Placeholder',
  options: () => [],
});

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

const open = ref(false);

function toggleListVisibility() {
  open.value = !open.value;
}
</script>

<template>
  <div class="minimal-select">
    <MinimalButton
      class="flex | minimal-select__button"
      data-alternative
      :aria-expanded="open"
      :aria-controls="id"
      role="combobox"
      @click="toggleListVisibility"
      ><span>{{ buttonPlaceholder }} </span>
      <span aria-hidden="true" class="minimal-select__arrow">&#8594;</span>
    </MinimalButton>
    <ul :id="id" v-show="open" class="minimal-select__listbox" role="listbox">
      <li class="minimal-select__item">first</li>
      <li class="minimal-select__item">second</li>
      <li class="minimal-select__item">third</li>
      <li class="minimal-select__item">fourth</li>
      <li class="minimal-select__item">fifth</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.minimal-select {
  position: relative;
  width: fit-content;

  &__button {
    --button-padding-block: var(--spacing-4);
    --gap: var(--spacing-8);
  }

  &__listbox {
    position: absolute;
    width: 100%;
    top: var(--select-list-top-position, 120%);
    left: 0;
    max-height: var(--select-list-max-height, 30rem);
    border: var(--select-list-border-width, 4px) solid
      var(--select-list-border-width, var(--clr-neutral-900));
  }

  &__item {
    padding-block: var(--spacing-8);
    padding-inline: var(--spacing-4);
    cursor: pointer;

    &:hover {
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
