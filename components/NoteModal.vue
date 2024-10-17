<template>
  <UButton icon="i-heroicons-eye" variant="outline" color="gray" @click="isOpen = true">Preview Note</UButton>
  <UModal v-model="isOpen" :ui="{ width: 'max-w-2xl' }">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-900">Full Note</h3>
        <UButton
          icon="i-heroicons-x-mark"
          variant="ghost"
          @click="isOpen = false"
        />
      </div>
    </template>
    <UTextarea 
    autoresize  
    resize 
      :model-value="modelValue" 
      @update:model-value="$emit('update:modelValue', $event)"
      class="w-full py-2" 
      />
      <template #footer> 
        <UButton @click="copyNote">Copy Note</UButton>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useClipboard } from '@vueuse/core';

const toast = useToast();

const isOpen = ref(false);

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

async function copyNote() {
  const { copy, copied, isSupported } = useClipboard();
  await copy(props.modelValue);
  if (copied.value) {
    toast.add({
      title: 'Note copied to clipboard',
      icon: 'i-heroicons-check-circle',
      color: 'green',
    });
  }
  
}
</script>