<template>
    <UPopover mode="hover">
        <div @click="$emit('toggleSelect')" :class="{ 'bg-orange-200/90': props.isSelected}" 
        class=" border-2 border-orange-300 space-x-2 transition rounded-xl flex justify-between items-center py-1 px-4 w-full cursor-pointer">
        <p>{{ props.name }}</p>        
        <UIcon v-if="!props.isSelected" class="text-xl text-orange-600" name="i-heroicons-plus" />
        <UIcon v-else class="text-xl text-orange-600" name="i-heroicons-check" />


    </div>
    <template #panel>
      <div class="p-2 text-xs text-gray-600">
       <p>{{ text }}</p>
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
const props = defineProps({
    id: Number,
    name: String,
    text: String,
    isNursing: Boolean,
    isSelected: Boolean,
});

</script>