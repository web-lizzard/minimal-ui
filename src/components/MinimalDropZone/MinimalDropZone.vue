<script lang='ts' setup>
import { onMounted, onUnmounted, ref } from 'vue';

const emit = defineEmits<{ (e: 'file-changed', value: File[]): void }>();

const events = ['dragenter', 'dragover', 'dragleave', 'drop']
const active = ref(false);
let inactiveTimeout: NodeJS.Timeout | null = null;

function onDrop(e: DragEvent) {
    if(!e.dataTransfer?.files) {
    return
}
    setInactive();
    console.log(e.dataTransfer)
    emit('file-changed', [...e.dataTransfer?.files])
}


function setActive() {
    active.value = true;
    inactiveTimeout && clearTimeout(inactiveTimeout);
}

function setInactive() {
    inactiveTimeout = setTimeout(() => {
        active.value = false;
    }, 50)
}

function prevenDefaults(e: Event) {
    e.preventDefault()
}

onMounted(() => {
    events.forEach((eventName) => document.body.addEventListener(eventName, prevenDefaults))
})

onUnmounted(() => {
    events.forEach((eventName) => document.body.removeEventListener(eventName, prevenDefaults))
})

</script>
    
<template>
<div 
    class='minimal-drop-zone' 
    :data-active="active" 
    @dragenter.prevent="setActive"
    @dragleave.prevent="setInactive"  
    @dragover.prevent="setActive"  
    @drop.prevent="onDrop"
>
    <slot :dropZoneActive="active">
        <span v-if="active">Drop Them</span>
        <span v-else>Drag Your Files Here </span>
    </slot>
</div>
</template>
<style lang='scss' scoped> .minimal-drop-zone {
    max-width: var(--drop-zone-max-width, 40rem);
    border: var(--drop-zone-border-width, 4px) solid var(--drop-zone-border-color-width, var(--clr-neutral-900));
    padding-block: var(--drop-zone-padding-block, var(--spacing-12));
    display: grid;
    place-content: center;

    &[data-active="true"] {
        background-color: var(--drop-zone-background-color, var(--clr-neutral-800));
        color: var(--drop-zone-text-color, var(--clr-neutral-100));
    }
    
}</style>