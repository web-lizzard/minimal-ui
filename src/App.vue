<script setup lang="ts">
import MinimalDropZone from './components/MinimalDropZone/MinimalDropZone.vue';
import MinimalFilePreview from './components/MinimalFilePreview/MinimalFilePreview.vue';
import { useFileList } from './composables/useFileList';

const { addFiles, removeFile, files } = useFileList()

</script>

<template>
  <div>
    <MinimalDropZone @file-changed="addFiles" />
    <MinimalFilePreview :files="files" @remove="removeFile" />
  </div>
</template>

<style scoped>
  div {
    padding: 5rem;
  }
</style>
