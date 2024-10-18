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
        <div
          class="flex flex-col items-start gap-y-4 md:flex-row md:justify-between md:items-center border-b border-gray-200 pb-2"
        >
          <h2 class="font-semibold text-lg">Academic Transcript</h2>
          <div class="flex items-center gap-6 justify-center">
            <UFormGroup name="received" v-motion-fade-visible>
              <UCheckbox
                v-model="formState.academicTranscript.received"
                label="Received"
              />
            </UFormGroup>
            <UFormGroup
              v-if="formState.academicTranscript.received"
              label="Certified"
              name="certified"
              v-motion-fade-visible
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
              v-motion-fade-visible
            >
              <UToggle
                v-model="formState.academicTranscript.meets"
                label="Meets"
                color="green"
              />
            </UFormGroup>
          </div>
        </div>

        <div
          class="flex flex-col items-start gap-y-4 md:flex-row md:justify-between md:items-center border-b border-gray-200 pb-2"
        >
          <h2 class="font-semibold text-lg">English</h2>
          <div class="flex items-center gap-6">
            <UFormGroup name="received" v-motion-slide-right>
              <UCheckbox
                v-model="formState.english.received"
                label="Received"
              />
            </UFormGroup>
            <UFormGroup
              v-if="formState.english.received"
              label="Meets"
              name="meets"
              v-motion-fade-visible
            >
              <UToggle
                v-model="formState.english.meets"
                label="Meets"
                color="green"
              />
            </UFormGroup>
          </div>
        </div>

        <div
          class="flex flex-col items-start gap-y-4 md:flex-row md:justify-between md:items-center border-b border-gray-200 pb-2"
        >
          <h2 class="font-semibold text-lg">Passport</h2>
          <div class="flex items-center gap-6">
            <UFormGroup name="received" v-motion-slide-right>
              <UCheckbox
                v-model="formState.passport.received"
                label="Received"
              />
            </UFormGroup>
            <UFormGroup
              v-if="formState.passport.received"
              label="Certified"
              name="certified"
              v-motion-fade-visible
            >
              <UToggle
                v-model="formState.passport.certified"
                label="Certified"
                color="green"
              />
            </UFormGroup>
          </div>
        </div>

        <div
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

        <div
          class="flex flex-col items-start gap-y-4 md:flex-row md:justify-between md:items-center border-b border-gray-200 py-2"
        >
          <h2 class="font-semibold text-lg">Forms</h2>
          <div class="flex items-center gap-2">
            <UCheckbox v-model="formState.gsr.formA" label="GSR form part A" />
            <UCheckbox v-model="formState.gsr.formB" label="GSR form part B" />
            <UCheckbox
              v-model="formState.finalDeclaration"
              label="Final Declaration"
            />
          </div>
        </div>
        <div
          class="flex flex-col items-start gap-y-4 md:flex-row md:justify-between md:items-center border-b border-gray-200 py-2"
        >
          <h2 class="font-semibold text-lg">Others</h2>
          <div class="flex items-center gap-2">
            <UCheckbox
              v-model="formState.requestedCT"
              label="Requested Credits"
            />
            <UCheckbox
              v-model="formState.releaseCondition"
              label="Release required"
            />
          </div>
        </div>
        <div
          class="flex flex-col items-start gap-y-4 md:flex-row md:justify-between md:items-center border-b border-gray-200 py-2"
        >
          <h2 class="font-semibold text-lg">Visa and CoE history</h2>
          <div class="flex items-center gap-2">
            <UButton
              color="blue"
              variant="outline"
              icon="i-heroicons-plus"
              @click="openVisaModal"
              >Visa History</UButton
            >
            <UButton
              color="blue"
              variant="outline"
              icon="i-heroicons-plus"
              @click="openCoEModal"
              >CoE History</UButton
            >
          </div>
        </div>

        <UTextarea resize :rows="6" v-model="note" class="w-full py-2" />

        <div class="flex flex-col md:flex-row justify-end gap-2">
          <UButton
            icon="i-heroicons-arrow-path"
            color="red"
            variant="ghost"
            @click="resetForm"
          >
            Reset
          </UButton>
          <NoteModal v-model="note" />
          <UButton icon="i-heroicons-clipboard" @click="copyToClipboard">
            Copy to Clipboard
          </UButton>
        </div>
      </UForm>
    </UCard>
  </div>

  <!-- visa modal -->
  <UModal
    v-model="visaModal"
    title="Visa and CoE history"
    :fullscreen="$device.isMobile"
  >
    <UCard>
      <template #header>
        <h1 class="font-bold text-2xl mb-4">Visa and CoE history</h1>
      </template>
      <div>
        <div class="flex flex-col gap-2">
          <h2 class="font-bold text-lg">Visa history</h2>
          <div
            v-for="visa in formState.visaHistory"
            :key="visa.type"
            class="flex flex-col md:flex-row md:items-center md:gap-4"
          >
            <UFormGroup label="Visa type" name="visaType">
              <USelect
                v-model="visa.type"
                :options="['500', '408', '485', '600', 'Other']"
              />
            </UFormGroup>
            <UFormGroup label="Visa expiry date" name="visaExpiryDate">
              <UInput v-model="visa.expiryDate" type="text" />
            </UFormGroup>
            <UFormGroup label="Visa grant date" name="visaGrantDate">
              <UInput v-model="visa.grantDate" type="text" />
            </UFormGroup>
            <UButton
              class="self-end"
              icon="i-heroicons-trash"
              variant="ghost"
              color="red"
              @click="removeVisaHistory(visa)"
              >Remove</UButton
            >
          </div>
          <UButton
            class="place-self-start"
            icon="i-heroicons-plus"
            variant="outline"
            @click="addVisaHistory"
            >Add Visa</UButton
          >
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end">
          <UButton variant="ghost" color="green" @click="visaModal = false"
            >Save</UButton
          >
        </div>
      </template>
    </UCard>
  </UModal>

  <!-- coe modal -->
  <UModal v-model="coeModal" title="Add CoE" :fullscreen="$device.isMobile">
    <UCard>
      <template #header>
        <h1 class="font-bold text-2xl mb-4">Add CoE</h1>
      </template>
      <div class="flex flex-col gap-2">
        <h2 class="font-bold text-lg">CoE history</h2>
        <div
          v-for="coe in formState.coeHistory"
          :key="coe.course"
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
            >Remove</UButton
          >
        </div>

        <UButton
          class="place-self-start"
          icon="i-heroicons-plus"
          variant="outline"
          @click="addCoEHistory"
          >Add CoE</UButton
        >
      </div>

      <template #footer>
        <div class="flex justify-end">
          <UButton variant="ghost" color="green" @click="coeModal = false"
            >Save</UButton
          >
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
import type { VisaHistory, CoEHistory } from "@/types/notes";
import NoteModal from "~/components/Modals/NoteModal.vue";
onMounted(() => {
  formState.id = crypto.randomUUID();
});

const visaModal = ref(false);
function openVisaModal() {
  visaModal.value = true;
}

const coeModal = ref(false);
function openCoEModal() {
  coeModal.value = true;
}

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

const note = computed(() => {
  let note = `📋 STUDENT APPLICATION STATUS
==============================

📄 DOCUMENT CHECKLIST:
----------------------
📜 Academic Transcript:  ${
    formState.academicTranscript.received ? "✅ Received" : "❌ Not Received"
  }${
    formState.academicTranscript.received
      ? `  ${
          formState.academicTranscript.certified
            ? "✅ Certified"
            : "❌ Not Certified"
        }  ${
          formState.academicTranscript.meets ? "✅ Meets" : "❌ Does not meet"
        }`
      : ""
  }
🔤 English Proficiency:  ${
    formState.english.received ? "✅ Received" : "❌ Not Received"
  }${
    formState.english.received
      ? `  ${formState.english.meets ? "✅ Meets" : "❌ Does not meet"}`
      : ""
  }
🛂 Passport:             ${
    formState.passport.received ? "✅ Received" : "❌ Not Received"
  }${
    formState.passport.received
      ? `  ${
          formState.passport.certified ? "✅ Certified" : "❌ Not Certified"
        }`
      : ""
  }
---------------------    
🛄 VISA INFORMATION:
--------------------
Type: ${formState.visaType}
${formState.visaExpiryDate ? `Expiry: ${formState.visaExpiryDate}` : ""}
---------------------    
📝 FORMS AND DOCUMENTS:
----------------------
Final Declaration: ${formState.finalDeclaration ? "✅ Received" : "⏳ Pending"}
Part A: ${formState.gsr.formA ? "✅ Received" : "⏳ Awaiting"}
Part B: ${formState.gsr.formB ? "✅ Accepted" : "⏳ Pending"}
${
  formState.requestedCT
    ? `---------------------    
🟠 Requested Credits`
    : ""
}

${
  formState.releaseCondition
    ? "❗ Requires approval to issue OL with release condition"
    : ""
}
${
  formState.coeHistory.length > 0
    ? `
---------------------    
📜 COE HISTORY: 
---------------------
${formState.coeHistory
  .map(
    (coe: CoEHistory) =>
      `${coe.course} at ${coe.institution} from ${coe.startDate} to ${coe.endDate}`
  )
  .join("\n")}`
    : ""
}
${
  formState.visaHistory.length > 0
    ? `
---------------------    
📜 VISA HISTORY:
---------------------
${formState.visaHistory
  .map((visa: VisaHistory) => `Type: ${visa.type}, Expiry: ${visa.expiryDate}`)
  .join("\n")}`
    : ""
}`
    .trim()
    .replace(/^\s*[\r\n]/gm, "");

  return note;
});

function addVisaHistory() {
  formState.visaHistory.push({
    type: "",
    expiryDate: "",
    grantDate: "",
  });
}

function addCoEHistory() {
  formState.coeHistory.push({
    course: "",
    institution: "",
    startDate: "",
    endDate: "",
  });
}

function removeVisaHistory(visa: VisaHistory) {
  formState.visaHistory = formState.visaHistory.filter(
    (v: VisaHistory) => v !== visa
  );
}

function removeCoEHistory(coe: CoEHistory) {
  formState.coeHistory = formState.coeHistory.filter(
    (c: CoEHistory) => c !== coe
  );
}

const { copy } = useClipboard();
const toast = useToast();

const t4StartDate = new Date(2024, 10, 4); // November 4, 2024
const sixMonthsFromT4Start = new Date(t4StartDate);
sixMonthsFromT4Start.setMonth(sixMonthsFromT4Start.getMonth() + 6);

const t1StartDate = new Date(2025, 1, 17); // February 17, 2025
const sixMonthsFromT1Start = new Date(t1StartDate);
sixMonthsFromT1Start.setMonth(sixMonthsFromT1Start.getMonth() + 6);

const showVisaExpiryAlert = computed(() => {
  if (!formState.visaExpiryDate) return false;

  const expiryDate = parseDate(formState.visaExpiryDate);
  if (!expiryDate) return false;

  return (
    expiryDate <= sixMonthsFromT4Start || expiryDate <= sixMonthsFromT1Start
  );
});

const visaExpiryAlertDescription = computed(() => {
  if (!formState.visaExpiryDate) return "";

  const expiryDate = parseDate(formState.visaExpiryDate);
  if (!expiryDate) return "";

  const warningMessages = [];

  if (expiryDate <= sixMonthsFromT4Start) {
    warningMessages.push(
      "The visa will expire within 6 months from the start of T4 (November 4, 2024)."
    );
  }

  if (expiryDate <= sixMonthsFromT1Start) {
    warningMessages.push(
      "The visa will expire within 6 months from the start of T1 (February 17, 2025)."
    );
  }

  return (
    warningMessages.join(" ") +
    "If the applicant is applying for this intake, please consider a GSR condition."
  );
});

function copyToClipboard() {
  copy(note.value)
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

function transformDate(dateString: string): string {
  if (dateString) {
    const [day, month, year] = dateString.split(" ");
    const transformedMonth =
      month.slice(0, 3).charAt(0).toUpperCase() +
      month.slice(1, 3).toLowerCase();
    return `${day}-${transformedMonth}-${year}`;
  } else return "";
}

function parseDate(dateString: string): Date | null {
  const [day, month, year] = dateString.split(" ");
  const monthIndex = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].indexOf(month);

  if (monthIndex === -1) return null;

  return new Date(parseInt(year), monthIndex, parseInt(day));
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
}

useHead({
  title: "Assessment Notes",
});
</script>
