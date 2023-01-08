<script lang="ts" setup>
defineEmits<{ (e: 'click'): void }>();
</script>

<template>
  <button @click="$emit('click')" data-alternative class="minimal-button">
    <slot>placeholder</slot>
  </button>
</template>

<style lang="scss" scoped>
.minimal-button {
  position: relative;
  border: var(--button-border-width, 0) solid
    var(--button-border-color, var(--clr-neutral-900));
  color: var(--button-text-color, var(--clr-neutral-100));
  background-color: var(--button-background-color, var(--clr-neutral-900));
  padding-block: var(--button-padding-block, var(--spacing-12));
  padding-inline: var(--button-padding-inline, var(--spacing-20));
  border-radius: var(--button-radius, 4px);
  font-size: var(--button-font-size, var(--fs-500));
  cursor: pointer;

  &[data-alternative] {
    border: var(--button-border-width, 4px) solid
      var(--button-border-color, var(--clr-neutral-900));
    background-color: var(--button-background-color, var(--clr-neutral-100));
    color: var(--button-text-color, var(--clr-neutral-900));

    &:hover {
      background-color: var(--button-background-color, var(--clr-neutral-800));
      color: var(--button-text-color, var(--clr-neutral-100));
    }
  }

  &[data-circle='true'] {
    padding-block: var(--button-padding-block, 0);
    padding-inline: var(--button-padding-inline, 0);
    min-width: var(--button-width, min(100%, 5rem));
    aspect-ratio: 1;
    border-radius: 100vmax;
  }
}
</style>
