<template>
  <div>
    <UCard class="px-4 dark:bg-gray-800">
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex flex-col items-start gap-y-2">
            <h1 class="font-bold text-2xl mb-4">Notes</h1>
            <UCheckbox v-model="useEmojis" label="Use Emojis" />
          </div>
          <UFormGroup
            :label="formState.isOnshore ? 'Onshore' : 'Offshore'"
            name="isOnshore"
          >
            <UToggle v-model="formState.isOnshore" color="green" />
          </UFormGroup>
        </div>
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

      <UForm :state="formState" class="space-y-4 mt-2" v-auto-animate>
        <!-- Academic Transcript Section -->
        <div
          class="flex flex-col items-start gap-y-4 md:flex-row md:justify-between md:items-center border-b border-gray-200 pb-2"
        >
          <h2 class="font-semibold text-lg">Academic Transcript</h2>
          <div v-auto-animate class="flex items-center gap-6 justify-center">
            <UFormGroup name="received">
              <UCheckbox
                v-model="formState.academicTranscript.received"
                label="Received"
              />
            </UFormGroup>
            <UFormGroup
              v-if="formState.academicTranscript.received"
              label="Certified"
              name="certified"
            >
              <UToggle
                v-model="formState.academicTranscript.certified"
                label="Certified"
                color="green"
              />
            </UFormGroup>
            <UFormGroup
              v-if="formState.academicTranscript.received"
              label="Meets"
              name="meets"
            >
              <UToggle
                v-model="formState.academicTranscript.meets"
                label="Meets"
                color="green"
              />
            </UFormGroup>
          </div>
        </div>

        <!-- English Section -->
        <div
          class="flex flex-col items-start gap-y-4 md:flex-row md:justify-between md:items-center border-b border-gray-200 pb-2"
        >
          <h2 class="font-semibold text-lg">English</h2>
          <div v-auto-animate class="flex items-center gap-6">
            <UFormGroup name="received">
              <UCheckbox
                v-model="formState.english.received"
                label="Received"
              />
            </UFormGroup>
            <UFormGroup
              v-if="formState.english.received"
              label="Meets"
              name="meets"
            >
              <UToggle
                v-model="formState.english.meets"
                label="Meets"
                color="green"
              />
            </UFormGroup>
          </div>
        </div>

        <!-- Passport Section -->
        <div
          class="flex flex-col items-start gap-y-4 md:flex-row md:justify-between md:items-center border-b border-gray-200 pb-2"
        >
          <h2 class="font-semibold text-lg">Passport</h2>
          <div v-auto-animate class="flex items-center gap-6">
            <UFormGroup name="received">
              <UCheckbox
                v-model="formState.passport.received"
                label="Received"
              />
            </UFormGroup>
            <UFormGroup
              v-if="formState.passport.received"
              label="Certified"
              name="certified"
            >
              <UToggle
                v-model="formState.passport.certified"
                label="Certified"
                color="green"
              />
            </UFormGroup>
          </div>
        </div>

        <!-- Visa Section -->
        <div
          v-if="formState.isOnshore"
          class="flex flex-col items-start gap-y-4 md:flex-row md:justify-between md:items-center border-b border-gray-200 pb-2"
        >
          <h2 class="font-semibold text-lg">Visa</h2>
          <div class="flex gap-2">
            <UFormGroup label="Visa Type" name="visaType">
              <USelect
                v-model="formState.visaType"
                :options="['500', 'No Visa', '408', '485', '600', 'Other']"
              />
            </UFormGroup>
            <UFormGroup label="Visa Expiry Date" name="visaExpiryDate">
              <UInput
                autocomplete="off"
                v-model="formState.visaExpiryDate"
                type="text"
              />
            </UFormGroup>
          </div>
        </div>

        <!-- Forms Section -->
        <div
          class="flex flex-col items-start gap-y-4 md:flex-row md:justify-between md:items-center border-b border-gray-200 py-2"
        >
          <h2 class="font-semibold text-lg">Forms</h2>
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-2 w-full md:w-auto"
          >
            <UCheckbox v-model="formState.gsr.formA" label="GSR form part A" />
            <UCheckbox v-model="formState.gsr.formB" label="GSR form part B" />
            <UCheckbox
              v-model="formState.finalDeclaration"
              label="Final Declaration"
            />
          </div>
        </div>

        <!-- Toggle Section -->
        <div v-auto-animate class="flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <h1 class="font-semibold text-lg">Full Assessment</h1>
            <UButton
            
              class="transition-all duration-300 w-28"
              variant="outline"
              square
              color="gray"
              :icon="showFullAssessment ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
              @click="toggleFullAssessment"
              >{{ showFullAssessment ? 'Show less' : 'Show all ' }}</UButton
            >
          </div>
          <div v-if="showFullAssessment">
            <!-- Others Section -->
            <div
            class="flex flex-col items-start gap-y-4 md:flex-row md:justify-between md:items-center border-b border-gray-200 py-2"
          >
            <h2 class="font-semibold text-lg">Others</h2>
            <div
              class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2 w-full md:w-auto"
            >
              <UCheckbox
                v-model="formState.requestedCT"
                label="Requested Credits"
              />
              <UCheckbox
                v-model="formState.releaseCondition"
                label="Release required"
              />
              <UCheckbox v-model="formState.isU18" label="Under 18" />
              <UCheckbox
                v-model="formState.requestedOSHC"
                label="Requested OSHC"
              />
            </div>
          </div>

          <!-- Visa and CoE History Section -->
          <div
            class="flex flex-col items-start gap-y-4 md:flex-row md:justify-between md:items-center border-b border-gray-200 py-2"
          >
            <h2 class="font-semibold text-lg">Visa and CoE history</h2>
            <div
              class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2 w-full md:w-auto"
            >
              <AddVisaModal
                :visa-history="formState.visaHistory"
                @add-visa="addVisaHistory"
                @remove-visa="removeVisaHistory"
              />

              <AddCoeModal
                :coe-history="formState.coeHistory"
                @add-coe="addCoEHistory"
                @remove-coe="removeCoEHistory"
              />
              <AddAcademicHistoryModal
                :academic-history="formState.academicHistory"
                @add-academic="addAcademicHistory"
                @remove-academic="removeAcademicHistory"
              />
              <AddWorkHistoryModal
                :work-history="formState.workHistory"
                @add-work="addWorkHistory"
                @remove-work="removeWorkHistory"
              />
            </div>
          </div>
          </div>
        </div>

        <UTextarea
          resize
          :rows="6"
          v-model="editableNote"
          class="w-full py-2"
        />

        <div class="flex flex-col md:flex-row justify-end gap-2">
          <UButton
            icon="i-heroicons-arrow-path"
            color="red"
            variant="ghost"
            @click="resetForm"
            >Reset</UButton
          >
          <NoteModal v-model="editableNote" />
          <UButton icon="i-heroicons-clipboard" @click="copyToClipboard"
            >Copy to Clipboard</UButton
          >
        </div>
      </UForm>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
import { ref, reactive, computed, watch, onMounted } from "vue";
import type {
  VisaHistory,
  CoEHistory,
  FormState,
  WorkHistory,
  AcademicHistory,
} from "@/types/notes";
import AddVisaModal from "~/components/Modals/AddVisaModal.vue";
import AddCoeModal from "~/components/Modals/AddCoeModal.vue";
import NoteModal from "~/components/Modals/NoteModal.vue";
import AddAcademicHistoryModal from "~/components/Modals/AddAcademicHistoryModal.vue";
import AddWorkHistoryModal from "~/components/Modals/AddWorkHistoryModal.vue";

// Constants
const T4_START_DATE = new Date(2024, 10, 4); // November 4, 2024
const T1_START_DATE = new Date(2025, 1, 17); // February 17, 2025
const STORAGE_KEY = "assessment-form-state";

// Form state
const formState = reactive<FormState>({
  id: "",
  isOnshore: false,
  isU18: false,
  requestedOSHC: false,
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
  workHistory: [] as WorkHistory[],
  academicHistory: [] as AcademicHistory[],
});
// Save form state to sessionStorage
function saveFormState() {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
    console.log("Form state saved to sessionStorage");
  } catch (error) {
    console.error("Error saving form state:", error);
  }
}

// Load form state from sessionStorage
function loadFormState() {
  try {
    const savedState = sessionStorage.getItem(STORAGE_KEY);
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      Object.assign(formState, parsedState);
    }
  } catch (error) {
    console.error("Error loading form state:", error);
  }
}

// Watch for changes in form state and save to sessionStorage
watch(
  formState,
  () => {
    saveFormState();
  },
  { deep: true }
);

// Computed properties
const useEmojis = ref(true);
const note = computed(() => generateNote(formState, { useEmojis: useEmojis.value }));

const visaExpiryCheck = computed(() =>
  checkVisaExpiry(formState.visaExpiryDate, T4_START_DATE, T1_START_DATE)
);

const showVisaExpiryAlert = computed(() => visaExpiryCheck.value.showAlert);
const visaExpiryAlertDescription = computed(() =>
  visaExpiryCheck.value.messages.join(" ")
);

const editableNote = ref("");

// Watchers
watch(
  note,
  (newValue) => {
    editableNote.value = newValue;
  },
  { immediate: true }
);

const showFullAssessment = ref(false);

function toggleFullAssessment() {
  showFullAssessment.value = !showFullAssessment.value;
}

function addVisaHistory() {
  formState.visaHistory.push({
    id: crypto.randomUUID(),
    type: "",
    expiryDate: "",
    grantDate: "",
  });
}

function addCoEHistory(coe?: CoEHistory) {
  if (coe) {
    formState.coeHistory.push(coe);
  } else {
    formState.coeHistory.push({
      id: crypto.randomUUID(),
      course: "",
      institution: "",
      startDate: "",
      endDate: "",
    });
  }
}

function addAcademicHistory() {
  formState.academicHistory.push({
    id: crypto.randomUUID(),
    course: "",
    institution: "",
    startDate: "",
    endDate: "",
  });
}

function addWorkHistory() {
  formState.workHistory.push({
    id: crypto.randomUUID(),
    company: "",
    position: "",
    startDate: "",
    endDate: "",
  });
}

function removeVisaHistory(visa: VisaHistory) {
  formState.visaHistory = formState.visaHistory.filter((v) => v !== visa);
}

function removeCoEHistory(coe: CoEHistory) {
  formState.coeHistory = formState.coeHistory.filter((c) => c !== coe);
}

function removeAcademicHistory(academic: AcademicHistory) {
  formState.academicHistory = formState.academicHistory.filter(
    (a) => a !== academic
  );
}

function removeWorkHistory(work: WorkHistory) {
  formState.workHistory = formState.workHistory.filter((w) => w !== work);
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
  sessionStorage.removeItem(STORAGE_KEY);
}

// Lifecycle hooks
onMounted(() => {
  formState.id = crypto.randomUUID();
  loadFormState();
});

useHead({
  title: "Assessment Notes",
});
</script>
