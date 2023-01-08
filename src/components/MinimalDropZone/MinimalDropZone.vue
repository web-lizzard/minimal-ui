<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';

type Props = {
  namespace: string;
};

const emit = defineEmits<{ (e: 'file-changed', value: File[]): void }>();
const props = withDefaults(defineProps<Props>(), {
  namespace: 'file-drop-zone',
});

const events = ['dragenter', 'dragover', 'dragleave', 'drop'];
const active = ref(false);
const inputId = `${props.namespace}-input`;
let inactiveTimeout: NodeJS.Timeout | null = null;

function onDrop(e: DragEvent) {
  if (!e.dataTransfer?.files) {
    return;
  }
  setInactive();
  emit('file-changed', [...e.dataTransfer?.files]);
}

function setActive() {
  active.value = true;
  inactiveTimeout && clearTimeout(inactiveTimeout);
}

function setInactive() {
  inactiveTimeout = setTimeout(() => {
    active.value = false;
  }, 50);
}

function onInputChange(e: Event) {
  const target = e.target as HTMLInputElement;
  const files = target.files;
  files && emit('file-changed', [...files]);
  target.value = '';
}

function prevenDefaults(e: Event) {
  e.preventDefault();
}

onMounted(() => {
  events.forEach((eventName) =>
    document.body.addEventListener(eventName, prevenDefaults)
  );
});

onUnmounted(() => {
  events.forEach((eventName) =>
    document.body.removeEventListener(eventName, prevenDefaults)
  );
});
</script>

<template>
  <label
    class="minimal-drop-zone"
    :for="inputId"
    :data-active="active"
    @dragenter.prevent="setActive"
    @dragleave.prevent="setInactive"
    @dragover.prevent="setActive"
    @drop.prevent="onDrop"
  >
    <slot :dropZoneActive="active">
      <span v-if="active">Drop Them Here to add them</span>
      <span v-else>Drag Your Files Here or click here to select files</span>
    </slot>

    <slot name="input">
      <input
        class="minimal-drop-zone__input"
        type="file"
        :id="inputId"
        multiple
        @change="onInputChange"
      />
    </slot>
  </label>
</template>
<style lang="scss" scoped>
.minimal-drop-zone {
  max-width: var(--drop-zone-max-width, 40rem);
  border: var(--drop-zone-border-width, 4px) solid
    var(--drop-zone-border-color-width, var(--clr-neutral-900));
  padding-block: var(--drop-zone-padding-block, var(--spacing-12));
  display: grid;
  place-content: center;
  cursor: pointer;

  &[data-active='true'] {
    background-color: var(--drop-zone-background-color, var(--clr-neutral-800));
    color: var(--drop-zone-text-color, var(--clr-neutral-100));
  }

  &__input {
    display: none;
  }
}
</style>
