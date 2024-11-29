<template>
    <UButton variant="outline" color="blue" icon="i-heroicons-plus" @click="isOpen = true">Add Visa</UButton>
  <UModal 
    v-model="isOpen"
    title="Visa and CoE history" 
    :fullscreen="$device.isMobile"
  >
    <UCard>
      <template #header>
        <h1 class="font-bold text-2xl mb-4">Visa and CoE history</h1>
      </template>
      <div>
        <div class="flex flex-col gap-2" v-auto-animate>
          <h2 class="font-bold text-lg">Visa history</h2>
          <VisaScanner @scan-complete="handleScanComplete" />
          <div 
            v-for="visa in props.visaHistory" 
            :key="visa.id" 
            class="flex flex-col md:flex-row md:items-center md:gap-4"
          >
            <UFormGroup label="Visa type" name="visaType">
              <UInput v-model="visa.type" type="text" />
            </UFormGroup>
            <UFormGroup label="Visa expiry date" name="visaExpiryDate">
              <UInput v-model="visa.expiryDate" type="text" />
            </UFormGroup>

            <UButton 
              class="self-end" 
              icon="i-heroicons-trash" 
              variant="ghost" 
              color="red" 
              @click="removeVisaHistory(visa)"
            >
              Remove
            </UButton>
          </div>
          <UButton 
            class="place-self-start" 
            icon="i-heroicons-plus" 
            variant="outline" 
            @click="addVisaHistory"
          >
            Add Visa
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
import type { VisaHistory } from "@/types/notes";
const isOpen = ref(false);
const props = defineProps<{
  visaHistory: VisaHistory[];
}>();

const localVisaHistory = ref<VisaHistory[]>([]);

const emit = defineEmits<{
  (e: 'add-visa', visa: VisaHistory): void;
  (e: 'remove-visa', visa: VisaHistory): void;
}>();

const addVisaHistory = () => {
  emit('add-visa', {} as VisaHistory);
};

const removeVisaHistory = (visa: VisaHistory) => {
  emit('remove-visa', visa);
};

const handleScanComplete = (data: any) => {
 
  const newVisa: VisaHistory = {
    id: crypto.randomUUID(),
    type: data.type ?? "",
    expiryDate: data.expiry_date ?? "",
    grantDate: data.grant_date ?? "",
  };
  localVisaHistory.value.push(newVisa);
  emit("add-visa", newVisa);
  console.log("Emitted new Visa:", newVisa); // Debug log
};
</script>

