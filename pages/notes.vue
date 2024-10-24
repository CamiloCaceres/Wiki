<template>
  <div>
    <UCard class="px-4 dark:bg-gray-800">
      <template #header>
        <h1 class="font-bold text-2xl mb-4">Notes</h1>
      </template>

      <UAlert
        v-if="showVisaExpiryAlert"
        title="Visa Expiry Warning"
        :description="visaExpiryAlertDescription"
        color="yellow"
        variant="soft"
        icon="i-heroicons-exclamation-triangle"
        class="mb-4"
      />

      <UForm :state="formState" class="space-y-4 mt-2">
        <!-- Academic Transcript Section -->
        <div class="flex flex-col items-start gap-y-4 md:flex-row md:justify-between md:items-center border-b border-gray-200 pb-2">
          <h2 class="font-semibold text-lg">Academic Transcript</h2>
          <div v-auto-animate class="flex items-center gap-6 justify-center">
            <UFormGroup name="received">
              <UCheckbox v-model="formState.academicTranscript.received" label="Received" />
            </UFormGroup>
            <UFormGroup v-if="formState.academicTranscript.received" label="Certified" name="certified">
              <UToggle v-model="formState.academicTranscript.certified" label="Certified" color="green" />
            </UFormGroup>
            <UFormGroup v-if="formState.academicTranscript.received" label="Meets" name="meets">
              <UToggle v-model="formState.academicTranscript.meets" label="Meets" color="green" />
            </UFormGroup>
          </div>
        </div>

        <!-- English Section -->
        <div class="flex flex-col items-start gap-y-4 md:flex-row md:justify-between md:items-center border-b border-gray-200 pb-2">
          <h2 class="font-semibold text-lg">English</h2>
          <div v-auto-animate class="flex items-center gap-6">
            <UFormGroup name="received">
              <UCheckbox v-model="formState.english.received" label="Received" />
            </UFormGroup>
            <UFormGroup v-if="formState.english.received" label="Meets" name="meets">
              <UToggle v-model="formState.english.meets" label="Meets" color="green" />
            </UFormGroup>
          </div>
        </div>

        <!-- Passport Section -->
        <div class="flex flex-col items-start gap-y-4 md:flex-row md:justify-between md:items-center border-b border-gray-200 pb-2">
          <h2 class="font-semibold text-lg">Passport</h2>
          <div v-auto-animate class="flex items-center gap-6">
            <UFormGroup name="received">
              <UCheckbox v-model="formState.passport.received" label="Received" />
            </UFormGroup>
            <UFormGroup v-if="formState.passport.received" label="Certified" name="certified">
              <UToggle v-model="formState.passport.certified" label="Certified" color="green" />
            </UFormGroup>
          </div>
        </div>

        <!-- Visa Section -->
        <div class="flex flex-col items-start gap-y-4 md:flex-row md:justify-between md:items-center border-b border-gray-200 pb-2">
          <h2 class="font-semibold text-lg">Visa</h2>
          <div class="flex gap-2">
            <UFormGroup label="Visa Type" name="visaType">
              <USelect v-model="formState.visaType" :options="['500', 'No Visa', '408', '485', '600', 'Other']" />
            </UFormGroup>
            <UFormGroup label="Visa Expiry Date" name="visaExpiryDate">
              <UInput autocomplete="off" v-model="formState.visaExpiryDate" type="text" />
            </UFormGroup>
          </div>
        </div>

        <!-- Forms Section -->
        <div class="flex flex-col items-start gap-y-4 md:flex-row md:justify-between md:items-center border-b border-gray-200 py-2">
          <h2 class="font-semibold text-lg">Forms</h2>
          <div class="flex items-center gap-2">
            <UCheckbox v-model="formState.gsr.formA" label="GSR form part A" />
            <UCheckbox v-model="formState.gsr.formB" label="GSR form part B" />
            <UCheckbox v-model="formState.finalDeclaration" label="Final Declaration" />
          </div>
        </div>

        <!-- Others Section -->
        <div class="flex flex-col items-start gap-y-4 md:flex-row md:justify-between md:items-center border-b border-gray-200 py-2">
          <h2 class="font-semibold text-lg">Others</h2>
          <div class="flex items-center gap-2">
            <UCheckbox v-model="formState.requestedCT" label="Requested Credits" />
            <UCheckbox v-model="formState.releaseCondition" label="Release required" />
          </div>
        </div>

        <!-- Visa and CoE History Section -->
        <div class="flex flex-col items-start gap-y-4 md:flex-row md:justify-between md:items-center border-b border-gray-200 py-2">
          <h2 class="font-semibold text-lg">Visa and CoE history</h2>
          <div class="flex items-center gap-2">
            <UButton color="blue" variant="outline" icon="i-heroicons-plus" @click="openVisaModal">Visa History</UButton>
            <UButton color="blue" variant="outline" icon="i-heroicons-plus" @click="openCoEModal">CoE History</UButton>
          </div>
        </div>

        <UTextarea resize :rows="6" v-model="editableNote" class="w-full py-2" />

        <div class="flex flex-col md:flex-row justify-end gap-2">
          <UButton icon="i-heroicons-arrow-path" color="red" variant="ghost" @click="resetForm">Reset</UButton>
          <NoteModal v-model="editableNote" />
          <UButton icon="i-heroicons-clipboard" @click="copyToClipboard">Copy to Clipboard</UButton>
        </div>
      </UForm>
    </UCard>
  </div>

  <!-- Visa Modal -->
  <UModal v-model="visaModal" title="Visa and CoE history" :fullscreen="$device.isMobile">
    <UCard>
      <template #header>
        <h1 class="font-bold text-2xl mb-4">Visa and CoE history</h1>
      </template>
      <div>
        <div class="flex flex-col gap-2" v-auto-animate>
          <h2 class="font-bold text-lg">Visa history</h2>
          <div v-for="visa in formState.visaHistory" :key="visa.id" class="flex flex-col md:flex-row md:items-center md:gap-4">
            <UFormGroup label="Visa type" name="visaType">
              <USelect v-model="visa.type" :options="['500', '408', '485', '600', 'Other']" />
            </UFormGroup>
            <UFormGroup label="Visa expiry date" name="visaExpiryDate">
              <UInput v-model="visa.expiryDate" type="text" />
            </UFormGroup>
            <UFormGroup label="Visa grant date" name="visaGrantDate">
              <UInput v-model="visa.grantDate" type="text" />
            </UFormGroup>
            <UButton class="self-end" icon="i-heroicons-trash" variant="ghost" color="red" @click="removeVisaHistory(visa)">Remove</UButton>
          </div>
          <UButton class="place-self-start" icon="i-heroicons-plus" variant="outline" @click="addVisaHistory">Add Visa</UButton>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end">
          <UButton variant="ghost" color="green" @click="visaModal = false">Save</UButton>
        </div>
      </template>
    </UCard>
  </UModal>

  <!-- CoE Modal -->
  <UModal v-model="coeModal" title="Add CoE" :fullscreen="$device.isMobile">
    <UCard>
      <template #header>
        <h1 class="font-bold text-2xl mb-4">Add CoE</h1>
      </template>
      <div class="flex flex-col gap-2" v-auto-animate>
        <h2 class="font-bold text-lg">CoE history</h2>
        <div v-for="coe in formState.coeHistory" :key="coe.id" class="flex items-center gap-4 border-b border-gray-200 pb-2">
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
          <UButton icon="i-heroicons-trash" variant="ghost" color="red" @click="removeCoEHistory(coe)">Remove</UButton>
        </div>
        <UButton class="place-self-start" icon="i-heroicons-plus" variant="outline" @click="addCoEHistory">Add CoE</UButton>
      </div>
      <template #footer>
        <div class="flex justify-end">
          <UButton variant="ghost" color="green" @click="coeModal = false">Save</UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
import { ref, reactive, computed, watch, onMounted } from 'vue';
import type { VisaHistory, CoEHistory } from "@/types/notes";
import NoteModal from "~/components/Modals/NoteModal.vue";


// Constants
const T4_START_DATE = new Date(2024, 10, 4); // November 4, 2024
const T1_START_DATE = new Date(2025, 1, 17); // February 17, 2025

// Modal states
const visaModal = ref(false);
const coeModal = ref(false);

// Form state
const formState = reactive({
  id: "",
  academicTranscript: {
    received: false,
    certified: false,
    meets: false,
  },
  english: {
    received: false,
    meets: false,
  },
  passport: {
    received: false,
    certified: false,
  },
  visaType: "",
  visaExpiryDate: "",
  gsr: {
    formA: false,
    formB: false,
  },
  finalDeclaration: false,
  releaseCondition: false,
  requestedCT: false,
  visaHistory: [] as VisaHistory[],
  coeHistory: [] as CoEHistory[],
});

// Computed properties
const note = computed(() => generateNote(formState));

const visaExpiryCheck = computed(() => 
  checkVisaExpiry(formState.visaExpiryDate, T4_START_DATE, T1_START_DATE)
);

const showVisaExpiryAlert = computed(() => visaExpiryCheck.value.showAlert);
const visaExpiryAlertDescription = computed(() => visaExpiryCheck.value.messages.join(' '));

const editableNote = ref("");

// Watchers
watch(note, (newValue) => {
  editableNote.value = newValue;
}, { immediate: true });

// Methods
function openVisaModal() {
  visaModal.value = true;
}

function openCoEModal() {
  coeModal.value = true;
}

function addVisaHistory() {
  formState.visaHistory.push({
    id: crypto.randomUUID(),
    type: "",
    expiryDate: "",
    grantDate: "",
  });
}

function addCoEHistory() {
  formState.coeHistory.push({
    id: crypto.randomUUID(),
    course: "",
    institution: "",
    startDate: "",
    endDate: "",
  });
}

function removeVisaHistory(visa: VisaHistory) {
  formState.visaHistory = formState.visaHistory.filter(v => v !== visa);
}

function removeCoEHistory(coe: CoEHistory) {
  formState.coeHistory = formState.coeHistory.filter(c => c !== coe);
}

// Clipboard functionality
const { copy } = useClipboard();
const toast = useToast();

function copyToClipboard() {
  copy(editableNote.value)
    .then(() => {
      toast.add({
        title: "Copied to clipboard",
        description: "The note has been copied to your clipboard.",
        icon: "i-heroicons-clipboard-document-check",
        color: "green",
      });
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
      toast.add({
        title: "Failed to copy",
        description: "An error occurred while copying to clipboard.",
        icon: "i-heroicons-exclamation-triangle",
        color: "red",
      });
    });
}

function resetForm() {
  Object.assign(formState, {
    academicTranscript: { received: false, certified: false, meets: false },
    english: { received: false, meets: false },
    passport: { received: false, certified: false },
    visaType: "500",
    visaExpiryDate: "",
    gsr: { formA: false, formB: false },
    releaseCondition: false,
    visaHistory: [],
    coeHistory: [],
    finalDeclaration: false,
    requestedCT: false,
  });
  editableNote.value = note.value;
}

// Lifecycle hooks
onMounted(() => {
  formState.id = crypto.randomUUID();
});

useHead({
  title: "Assessment Notes",
});
</script>
