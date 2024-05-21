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

  <div class="grid grid-cols-3 gap-x-12 gap-y-4">
    <div v-for="trimester in trimesters">
      <div
        class="border-2 border-orange-500 transition rounded-xl flex flex-col items-center py-2 px-4 w-full cursor-pointer"
        @click="getCourseEndDate(trimester.code)"
      >
        <h2 class="text-lg font-semibold text-orange-600">{{ trimester.name }}</h2>
        <h5 class="text-sm text-gray-600">
          {{ convertToDateString(trimester.startDate) }} -
          {{ convertToDateString(trimester.endDate) }}
        </h5>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { trimestersFile, type Trimester } from "@/utils/trimesters";
import { useClipboard } from "@vueuse/core";

const { copy, copied } = useClipboard();

const copyToClipboard = () => {
  copy(outputTrimester.value);
};

const options = [
  {
    value: 5,
    label: "DoN - 5 Trimesters",
  },
  {
    value: 6,
    label: "PG - 6 Trimesters",
  },
  {
    value: 9,
    label: "UG - 9 trimesters",
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
