<template>
    <UButton variant="outline" color="blue" icon="i-heroicons-plus" @click="isOpen = true">Add CoE</UButton>
    <UModal 
      v-model="isOpen"
      title="Add CoE" 
      :fullscreen="$device.isMobile"
    >
      <UCard>
        <template #header>
          <h1 class="font-bold text-2xl mb-4">Add CoE</h1>
        </template>
        <div class="flex flex-col gap-2" v-auto-animate>
          <h2 class="font-bold text-lg">CoE history</h2>
          <div 
            v-for="coe in coeHistory" 
            :key="coe.id" 
            class="flex items-center gap-4 border-b border-gray-200 pb-2"
          >
            <div>
              <UFormGroup label="Course name" name="coeCourse">
                <UInput v-model="coe.course" />
              </UFormGroup>
              <UFormGroup label="CoE start date" name="coeStartDate">
                <UInput v-model="coe.startDate" />
              </UFormGroup>
            </div>
            <div>
              <UFormGroup label="Institution" name="coeInstitution">
                <UInput v-model="coe.institution" />
              </UFormGroup>
              <UFormGroup label="CoE end date" name="coeEndDate">
                <UInput v-model="coe.endDate" />
              </UFormGroup>
            </div>
            <UButton 
              icon="i-heroicons-trash" 
              variant="ghost" 
              color="red" 
              @click="removeCoEHistory(coe)"
            >
              Remove
            </UButton>
          </div>
          <UButton 
            class="place-self-start" 
            icon="i-heroicons-plus" 
            variant="outline" 
            @click="addCoEHistory"
          >
            Add CoE
          </UButton>
        </div>
        <template #footer>
          <div class="flex justify-end">
            <UButton 
              variant="ghost" 
              color="green" 
              @click="isOpen = false"
            >
              Save
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </template>
  
  <script setup lang="ts">
  import type { CoEHistory } from "@/types/notes";

  const isOpen = ref(false);
  
  // Props definition
  interface Props {
    coeHistory: CoEHistory[];
  }
  
  const props = defineProps<Props>();
  
  // Emits definition
  const emit = defineEmits<{
    'add-coe': [];
    'remove-coe': [coe: CoEHistory];
  }>();
  
  // Methods
  const addCoEHistory = () => {
    emit('add-coe');
  };
  
  const removeCoEHistory = (coe: CoEHistory) => {
    emit('remove-coe', coe);
  };
  </script>