<template>
  <h1 class="font-bold text-2xl mb-4">Request Nursing Spot</h1>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <div class="flex items-center space-x-4">
      <UFormGroup label="Student Name" name="studentName">
        <UInput v-model="state.studentName" />
      </UFormGroup>

      <UFormGroup label="Student ID" name="studentId">
        <UInput v-model="state.studentId" />
      </UFormGroup>
    </div>
    <div class="flex items-center space-x-8">
      <UFormGroup label="Campus" name="campus">
        <USelect v-model="state.campus" :options="campuses" />
      </UFormGroup>

      <UFormGroup label="Mode" name="program">
        <USelect v-model="state.program" :options="programs" />
      </UFormGroup>
      <UFormGroup v-if="state.program === 'EN'" label="Intake" name="intake">
        <USelect v-model="state.intake" :options="ENIntakes" />
      </UFormGroup>
      <UFormGroup v-if="state.program === 'BN'" label="Intake" name="intake">
        <USelect v-model="state.intake" :options="BNIntakes" />
      </UFormGroup>
    </div>
    <div class="flex"></div>

    <UButton type="submit"> Generate Email </UButton>
  </UForm>

  <UModal v-model="modalVisible">
    <UCard>
      <template #header>
        <div class="text-xl">Generated Email</div>
      </template>
      <pre class="whitespace-pre-wrap">{{ generatedEmail }}</pre>

      <template #footer>
        <div class="flex justify-end">
          <UButton
            :icon="
              copied
                ? 'i-heroicons-clipboard-document-check'
                : 'i-heroicons-clipboard-document'
            "
            @click="copyToClipboard"
          >
            Copy to Clipboard
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import { z } from "zod";
import { useClipboard } from "@vueuse/core";
import { requestSpotEmail } from "@/utils/templates/nursingSpot";

const programs = ["EN", "BN"];
const campuses = ["Adelaide", "Surry Hills", "Flinders St.", "Brisbane"];
const BNIntakes = ["T1, 2025", "T1, 2026", "T1, 2027"];
const ENIntakes = [
  "T3, 2024",
  "T1, 2025",
  "T3, 2025", 
  "T1, 2026",
  "T3, 2026",
  "T1, 2027",
];
const userName = ref("");
onMounted(() => {
  let userNameIsStored = window.localStorage.getItem("localUserName");
  if (userNameIsStored) {
    userName.value = userNameIsStored;
  }
});

const modalVisible = ref(false);
const state = reactive({
  studentName: "",
  studentId: "",
  intake: "",
  campus: "",
  program: "",
});

const schema = z.object({
  studentName: z.string().min(1, "Student name is required"),
  studentId: z.string().min(1, "Student ID is required"),
  intake: z.string().min(1, "Intake is required"),
  campus: z.string().min(1, "Campus is required"),
  program: z.enum(["EN", "BN"]),
});

const generatedEmail = computed(() =>
  requestSpotEmail(
    state.studentName,
    state.studentId,
    state.intake,
    state.campus,
    state.program,
    userName.value
  )
);

async function onSubmit() {
  modalVisible.value = true;
}

const { copy, copied } = useClipboard();

const copyToClipboard = async () => {
  await copy(generatedEmail.value);
};
</script>