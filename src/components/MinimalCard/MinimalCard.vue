<script lang='ts' setup>
import MinimalButton from '../MinimalButton/MinimalButton.vue';

</script>
    
<template>
<div class='minimal-card'><slot>
    <MinimalButton>Placeholder</MinimalButton>
</slot></div>
</template>
    
<style lang='scss' scoped> 
.minimal-card {
    padding-inline: var(--card-padding-inline, var(--spacing-20));
    padding-block: var(--card-padding-block, var(--spacing-12));
    border-radius: var(--card-border-radius, 8px);
    border: var(--card-border-width, 4px) solid var(--card-border-color, var(--clr-neutral-900));
    backdrop-filter: blur(2rem);
    background-color: var(--card-background-color, var(--clr-neutral-200));
    color: var(--card-text-color, var(--clr-neutral-900));
}
</style>