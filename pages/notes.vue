<template>
  <div>
    <UCard class="px-8">
      <template #header>
        <h1 class="font-bold text-2xl mb-4">Notes</h1>
      </template>

      <UForm :state="formState" class="space-y-4 mt-2">
        <div class="flex justify-between items-center border-b border-gray-200 pb-2">
          <h2 class="font-semibold text-lg">Academic Transcript</h2>
          <div class="flex items-center gap-2">
            <UCheckbox
              v-model="formState.academicTranscript.received"
              label="Received"
            />
            <UCheckbox
              v-model="formState.academicTranscript.certified"
              label="Certified"
            />
            <UCheckbox
              v-model="formState.academicTranscript.meets"
              label="Meets"
            />
          </div>
        </div>

        <div class="flex justify-between items-center border-b border-gray-200 pb-2">
          <h2 class="font-semibold text-lg">English</h2>
          <div class="flex items-center gap-2">
            <UCheckbox v-model="formState.english.received" label="Received" />
            <UCheckbox v-model="formState.english.meets" label="Meets" />
          </div>
        </div>

        <div class="flex justify-between items-center border-b border-gray-200 pb-2">
          <h2 class="font-semibold text-lg">Passport</h2>
          <div class="flex items-center gap-2">
            <UCheckbox v-model="formState.passport.received" label="Received" />
            <UCheckbox
              v-model="formState.passport.certified"
              label="Certified"
            />
          </div>
        </div>

        <div class="flex gap-2 items-start justify-between">
          <h2 class="font-semibold text-lg">Visa</h2>

          <div class="flex gap-2">
            <UFormGroup label="Visa Type" name="visaType">
              <USelect
                v-model="formState.visaType"
                :options="['500', 'No Visa', '408', '485', '600', 'Other']"
              />
            </UFormGroup>

            <UFormGroup label="Visa Expiry Date" name="visaExpiryDate">
              <UInput v-model="formState.visaExpiryDate" type="text" />
            </UFormGroup>
          </div>
        </div>

        <div class="flex justify-between items-center border-b border-t border-gray-200 py-2">
            <h2 class="font-semibold text-lg">Others</h2>
            <div class="flex items-center gap-2">
                <UCheckbox v-model="formState.gsr.formA" label="GSR form part A" />
                <UCheckbox v-model="formState.gsr.formB" label="GSR form part B" />
                <UCheckbox v-model="formState.releaseCondition" label="Release required" />
            </div>
        </div>
      <UTextarea :rows="6" v-model="note" class="w-full py-2" />

        <div class="flex justify-end">
          <UButton
            class="mt-2"
            icon="i-heroicons-clipboard"
            @click="copyToClipboard"
          >
            Copy to Clipboard
          </UButton>
        </div>
      </UForm>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from "@vueuse/core";

const formState = reactive({
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
  visaType: "500",
  visaExpiryDate: "",
  gsr: {
    formA: false,
    formB: false,
  },
  
  releaseCondition: false,


});

const note = computed(() => {
  let note = `- Academic Transcript: ${
    formState.academicTranscript.received ? "Received" : "Not Received"
  }, ${
    formState.academicTranscript.certified ? "Certified" : "Not Certified"
  }, ${formState.academicTranscript.meets ? "Meets" : "Does not meet"}
- English: ${formState.english.received ? "Received" : "Not Received"}, ${
    formState.english.meets ? "Meets" : "Does not meet"
  }
- Passport: ${formState.passport.received ? "Received" : "Not Received"}, ${
    formState.passport.certified ? "Certified" : "Not Certified"
  }
- Visa Type: ${formState.visaType}${
    formState.visaExpiryDate ? ", Expiry Date: " + formState.visaExpiryDate : ""
  }
- ${formState.gsr.formA ? "Received GSR form part A" : "Awaiting GSR A to issue OL"}
- ${formState.gsr.formB ? "Accepted GSR form part B" : "Pending GSR form part B"}
  `;

  return note.trim();
});

const { copy } = useClipboard();
const toast = useToast();

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
</script>
