<template>
  <UButton
    variant="outline"
    color="blue"
    icon="i-heroicons-plus"
    @click="isOpen = true"
    >Add CoE</UButton
  >
  <UModal v-model="isOpen" title="Add CoE" :fullscreen="$device.isMobile">
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h1 class="font-bold text-2xl mb-4">Add CoE</h1>
          <UButton
            icon="i-heroicons-x-mark"
            variant="ghost"
            color="red"
            @click="isOpen = false"
          ></UButton>
        </div>
      </template>
      <div class="flex flex-col gap-2" v-auto-animate>
        <h2 class="font-bold text-lg">CoE history</h2>
        <CoeScanner @scan-complete="handleScanComplete" />
        <div
          v-for="coe in localCoeHistory"
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
          <UButton variant="ghost" color="green" @click="isOpen = false">
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
const localCoeHistory = ref<CoEHistory[]>([]);

interface Props {
  coeHistory: CoEHistory[];
}

const props = defineProps<Props>();

// Initialize local state from props
watchEffect(() => {
  localCoeHistory.value = [...props.coeHistory];
});

const handleScanComplete = (scanData: any) => {
  const newCoe: CoEHistory = {
    id: crypto.randomUUID(),
    course: scanData.course ?? "",
    institution: scanData.provider ?? "",
    startDate: scanData.start_date ?? "",
    endDate: scanData.end_date ?? "",
  };
  localCoeHistory.value.push(newCoe);
  emit("add-coe", newCoe);
  console.log("Emitted new CoE:", newCoe); // Debug log
};

const emit = defineEmits<{
  "add-coe": [scanData?: any];
  "remove-coe": [coe: CoEHistory];
}>();

const addCoEHistory = () => {
  const newCoe: CoEHistory = {
    id: Date.now().toString(),
    course: "",
    institution: "",
    startDate: "",
    endDate: "",
  };
  localCoeHistory.value.push(newCoe);
  emit("add-coe", newCoe);
};

const removeCoEHistory = (coe: CoEHistory) => {
  localCoeHistory.value = localCoeHistory.value.filter((c) => c.id !== coe.id);
  emit("remove-coe", coe);
};
</script>
