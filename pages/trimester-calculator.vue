<template>
  <h1 class="font-bold text-xl my-4">Trimester calculator</h1>
  <div class="flex items-center justify-between w-1/2 p-2 rounded mb-10">
    <h1 class="font-semibold text-lg">End date: {{ outputTrimester }}</h1>
    <UPopover v-model:open="copied">
      <UButton
        @click="copyToClipboard"
        :icon="
          copied
            ? 'i-heroicons-clipboard-document-check'
            : 'i-heroicons-clipboard-document'
        "
        size="md"
        color="primary"
        square
        variant="solid"
      />

      <template #panel>
        <div class="p-2 bg-lime-200">
          <p class="text-lime-700">Copied!</p>
        </div>
      </template>
    </UPopover>
  </div>
  <URadioGroup
    v-model="elapsedTrimesters"
    legend="Choose course length"
    :options="options"
    class="mb-4"
  />
  <h1 class="font-bold text-lg mb-4">Select the starting Trimester:</h1>
  <UTabs :items="items">
    <template #item="{ item }">
      <div class="grid grid-cols-3 gap-x-12 gap-y-4">
        <div v-for="trimesterTab in item.content" :key="trimesterTab.code">
          <div
            class="border-2 border-orange-500 transition rounded-xl flex flex-col items-center py-2 px-4 w-full cursor-pointer"
            @click="getCourseEndDate(trimesterTab.code)"
          >
            <h2 class="text-lg font-semibold text-orange-600">
              {{ trimesterTab.name }}
            </h2>
            <h5 class="text-sm text-gray-600">
              {{ convertToDateString(trimesterTab.startDate) }} -
              {{ convertToDateString(trimesterTab.endDate) }}
            </h5>
          </div>
        </div>
      </div>
    </template>
  </UTabs>

</template>

<script setup lang="ts">
import { trimestersFile } from "@/utils/trimesters";
import { type Trimester } from "~/types/trimester";
import { trimestersByYear } from "@/utils/trimesterTabs";
import { useClipboard } from "@vueuse/core";

const items = trimestersByYear.map(({ label, trimestersInfo }) => ({
  label: label.toString(),
  content: trimestersInfo,
}));
const { copy, copied } = useClipboard();

const copyToClipboard = () => {
  copy(outputTrimester.value);
};

const options = [
  {
    value: 5,
    label: "Dip Nurse - 5 Trimesters",
  },
  {
    value: 6,
    label: "Masters - 6 Trimesters",
  },
  {
    value: 9,
    label: "Bachelor - 9 trimesters",
  },
];

const elapsedTrimesters = ref(6);

function convertToDateString(date: Date) {
  return `${date.getUTCDate()}/${
    date.getUTCMonth() + 1
  }/${date.getUTCFullYear()}`;
}

const trimesters = reactive(trimestersFile);
const outputTrimester = ref("");

function getCourseEndDate(startTrimesterCode: string) {
  const startIndex = trimesters.findIndex(
    (trimester) => trimester.code === startTrimesterCode
  );

  if (startIndex !== -1) {
    const endIndex = startIndex + (elapsedTrimesters.value - 1);
    if (endIndex < trimesters.length) {
      const endDate = trimesters[endIndex].endDate;
      outputTrimester.value = `${endDate.getUTCDate()}/${
        endDate.getUTCMonth() + 1
      }/${endDate.getUTCFullYear()}`;
    }
  } else {
    outputTrimester.value = "Trimester not found";
  }
}
</script>
