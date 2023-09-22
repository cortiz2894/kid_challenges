<template>
    <div>
        <!-- Slot -->
        <slot />

        <!-- Cursor -->
        <Cursor v-if="isDesktop" />
    </div>
</template>

<script setup>
const { isDesktop } = useDevice();
</script>
