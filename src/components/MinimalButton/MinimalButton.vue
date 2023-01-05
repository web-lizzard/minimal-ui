<script lang="ts" setup></script>

<template>
  <button data-alternative class="minimal-button">
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
  }
}
</style>
