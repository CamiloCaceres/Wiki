<template>
    <div @click="isSelected = !isSelected" :class="{ 'ring-4 ring-blue-500/80 ring-offset-1': isSelected}" class="bg-purple-400 space-x-2 transition text-white rounded-xl flex items-center py-1 px-4 max-w-fit cursor-pointer">
        <p>English Nursing</p>        
        <UIcon v-if="!isSelected" class="text-xl text-white" name="i-heroicons-plus" />
        <UIcon v-else class="text-xl text-white" name="i-heroicons-check" />


    </div>
</template>

<script setup lang="ts">
const isSelected = ref(false)

// TODOS:
// Add Model Value to receive name, emit isSelected
// Add ability to Choose color from parent with props

</script>