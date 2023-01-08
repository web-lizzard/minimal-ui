<script lang="ts" setup>
import type { UploadableFile } from '@/composables/useFileList';
import MinimalButton from '../MinimalButton/MinimalButton.vue';

type Props = {
  files: UploadableFile[];
};

const props = withDefaults(defineProps<Props>(), {
  files: () => [],
});

const emit = defineEmits<{ (e: 'remove', file: UploadableFile): void }>();

function checkFileType(file: File) {
  return file.type.startsWith('image/');
}

function onRemoveButtonClick(file: UploadableFile) {
  emit('remove', file);
}

function onMouseEnter(e: Event) {
  (e.target as HTMLVideoElement).play();
}

function onMouseLeave(e: Event) {
  (e.target as HTMLVideoElement).pause();
}
</script>

<template>
  <ul class="grid | minimal-file-preview">
    <li
      class="flex | minimal-file-preview__item"
      v-for="file in files"
      :key="file.id"
    >
      <img
        v-if="checkFileType(file.file)"
        class="minimal-file-preview__file"
        :src="file.url"
        :alt="file.name"
      />
      <video
        v-else
        muted
        loop
        tabindex="0"
        @focus="onMouseEnter"
        @blur="onMouseLeave"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        class="focusable | minimal-file-preview__file"
      >
        <source :src="file.url" />
      </video>
      <MinimalButton
        @click="onRemoveButtonClick(file)"
        data-circle="true"
        class="minimal-file-preview__button"
        aria-label="Delete file from list"
        >X</MinimalButton
      >
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.minimal-file-preview {
  --gap: var(--spacing-8);

  padding-block: var(--file-preview-padding-block, var(--spacing-12));

  &__item {
    --gap: var(--spacing-12);

    padding-block: var(--file-item-padding-block, var(--spacing-8));
    padding-inline: var(--file-item-padding-inline, var(--spacing-8));
    background-color: var(--file-item-background-color, lightgray);
    max-width: var(--file-item-max-width, min(40rem, 100%));
    align-items: center;
    flex-wrap: wrap;
  }

  &__button {
    --button-padding-block: 0;
    --button-padding-inline: 0;
    --button-width: 4rem;
    --button-font-size: var(--fs-300);
  }

  &__file {
    border: var(--file-preview-border-width, 4px) solid
      var(--file-preview-border-color, var(--clr-neutral-900));
    border-radius: var(--file-preview-borde-radius, 4px);
    object-fit: cover;
    aspect-ratio: var(--file-aspect-ratio, 16/9);
    max-width: min(20rem, 100%);
  }
}
</style>
