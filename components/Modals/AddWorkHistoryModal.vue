<template>
    <UButton variant="outline" color="blue" icon="i-heroicons-plus" @click="isOpen = true">Add Work History</UButton>
  <UModal 
    v-model="isOpen"
    title="Work History" 
    :fullscreen="$device.isMobile"
  >
    <UCard>
      <template #header>
        <h1 class="font-bold text-2xl mb-4">Work History</h1>
      </template>
      <div>
        <div class="flex flex-col gap-2" v-auto-animate>
          <h2 class="font-bold text-lg">Work history</h2>
          <div 
            v-for="work in props.workHistory" 
            :key="work.id" 
            class="flex flex-col md:flex-row md:items-center md:gap-4"
          >
            <UFormGroup label="Company" name="company">
              <UInput v-model="work.company" type="text" />
            </UFormGroup>
            <UFormGroup label="Position" name="position">
              <UInput v-model="work.position" type="text" />
            </UFormGroup>
            <UFormGroup label="Start date" name="startDate">
              <UInput v-model="work.startDate" type="text" />
            </UFormGroup>
            <UFormGroup label="End date" name="endDate">
              <UInput v-model="work.endDate" type="text" />
            </UFormGroup>
            <UButton 
              class="self-end" 
              icon="i-heroicons-trash" 
              variant="ghost" 
              color="red" 
              @click="removeWorkHistory(work)"
            >
              Remove
            </UButton>
          </div>
          <UButton 
            class="place-self-start" 
            icon="i-heroicons-plus" 
            variant="outline" 
            @click="addWorkHistory"
          >
            Add Work History
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
import type { WorkHistory } from "@/types/notes";
const isOpen = ref(false);
const props = defineProps<{
  workHistory: WorkHistory[];
}>();

const emit = defineEmits<{
  (e: 'add-work'): void;
  (e: 'remove-work', work: WorkHistory): void;
}>();

const addWorkHistory = () => {
  emit('add-work');
};

const removeWorkHistory = (work: WorkHistory) => {
  emit('remove-work', work);
};
</script>
