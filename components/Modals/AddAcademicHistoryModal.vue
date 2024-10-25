<template>
    <UButton :block="$device.isMobile" variant="outline" color="blue" icon="i-heroicons-plus" @click="isOpen = true">Academic History</UButton>
  <UModal 
    v-model="isOpen"
    title="Academic History" 
    :fullscreen="$device.isMobile"
  >
    <UCard>
      <template #header>
        <h1 class="font-bold text-2xl mb-4">Academic History</h1>
      </template>
      <div>
        <div class="flex flex-col gap-2" v-auto-animate>
          <h2 class="font-bold text-lg">Academic history</h2>
          <div 
            v-for="academic in props.academicHistory" 
            :key="academic.id" 
            class="flex flex-col md:flex-row md:items-center md:gap-4"
          >
            <UFormGroup label="Course" name="course">
              <UInput v-model="academic.course" type="text" />
            
            </UFormGroup>
            <UFormGroup label="Institution" name="institution">
              <UInput v-model="academic.institution" type="text" />
            </UFormGroup>
            <UFormGroup label="Start date" name="startDate">
              <UInput v-model="academic.startDate" type="text" />
            </UFormGroup>
            <UFormGroup label="End date" name="endDate">
              <UInput v-model="academic.endDate" type="text" />
            </UFormGroup>
            <UButton 
              class="self-end" 
              icon="i-heroicons-trash" 
              variant="ghost" 
              color="red" 
              @click="removeAcademicHistory(academic)"
            >
              Remove
            </UButton>
          </div>
          <UButton 
            class="place-self-start" 
            icon="i-heroicons-plus" 
            variant="outline" 
            @click="addAcademicHistory"
          >
            Add Academic History
          </UButton>
        </div>
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
import type { AcademicHistory } from "@/types/notes";
const isOpen = ref(false);
const props = defineProps<{
  academicHistory: AcademicHistory[];
}>();

const emit = defineEmits<{
  (e: 'add-academic'): void;
  (e: 'remove-academic', academic: AcademicHistory): void;
}>();

const addAcademicHistory = () => {
  emit('add-academic');
};

const removeAcademicHistory = (academic: AcademicHistory) => {
  emit('remove-academic', academic);
};
</script>