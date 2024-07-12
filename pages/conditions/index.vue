<template>
  
  <div>
    
    <h1 class="font-bold text-xl my-4">Conditions:</h1>
    <UPopover
      class="h-full"
      v-model:open="copied"
      :popper="{ placement: 'top' }"
    >
      <div class="flex w-full mb-6">
        <div
          class="whitespace-pre-line grow text-gray-600 rounded p-2 h-40 overflow-auto"
        >
          {{ outputText }}
        </div>

        <UButton
          @click="copyToClipboard"
          :icon="
            copied
              ? 'i-heroicons-clipboard-document-check'
              : 'i-heroicons-clipboard-document'
          "
          size="lg"
          color="primary"
          square
          variant="solid"
        />
      </div>
      <template #panel>
        <div class="p-2 bg-lime-200">
          <p class="text-lime-700">Copied!</p>
        </div>
      </template>
    </UPopover>
  </div>
  <h2 class="font-bold text-lg my-4">Actions</h2>

  <div class="flex items-center space-x-4">
  <UButton
    @click="deselectAllConditions"
    class="mb-4"
    color="primary"
    variant="solid"
    icon="i-heroicons-trash"
  >
  </UButton>
  <UButton
    @click="addBNConditions"
    class="mb-4"
    color="primary"
    variant="solid"
  >
    Add BN Conditions
  </UButton>
  <UButton
    @click="addDoNConditions"
    class="mb-4"
    color="primary"
    variant="solid"
  >
    Add DoN Conditions
  </UButton>
</div>
  <h2 class="font-bold text-lg mb-4">Select conditions:</h2>
  <div class="grid grid-cols-4 gap-4 mb-4">
    <div
      v-for="condition in conditions.filter(
        (condition) => !condition.isNursing
      )"
    >
      <Condition
        v-bind="condition"
        @toggle-select="toggleSelect(condition.id)"
      />
    </div>
  </div>

  <h2 class="font-bold text-lg mb-4">Nursing Conditions:</h2>
  <div class="grid grid-cols-4 gap-4">
    <div
      v-for="condition in conditions.filter((condition) => condition.isNursing)"
    >
      <Condition
        v-bind="condition"
        @toggle-select="toggleSelect(condition.id)"
      />
    </div>
  </div>


</template>

<script setup lang="ts">
import { conditionsFile } from "@/utils/conditions";
import { type Condition } from "~/types/condition";
import { useClipboard } from "@vueuse/core";

const { copy, copied } = useClipboard();

const conditions = reactive(conditionsFile);

const selectedConditions = computed(() =>
  conditions.filter((condition) => condition.isSelected)
);
const conditionsList = computed(() =>
  selectedConditions.value.map((condition) => `- ${condition.text}`).join("\n")
);
const outputText = computed(
  () => `This offer is conditional upon:\n ${conditionsList.value}`
);

const toggleSelect = (conditionId: number) => {
  const condition = conditions.find((c) => c.id === conditionId);
  if (condition) {
    condition.isSelected = !condition.isSelected;
  }
};
const deselectAllConditions = () => {
  conditions.forEach((condition) => {
    condition.isSelected = false;
  });
};

const addBNConditions = () => {
  const bnConditionNames = [
    "NMBA",
    "capacity",
    "APRHA",
    "Complete DoN",
    "Credits",
  ];
  conditions.forEach((condition) => {
    if (bnConditionNames.includes(condition.name)) {
      condition.isSelected = true;
    }
  });
};

const addDoNConditions = () => {
  const DoNConditionNames = [
    "NMBA",
    "capacity",
    "LLN",
  ];
  conditions.forEach((condition) => {
    if (DoNConditionNames.includes(condition.name)) {
      condition.isSelected = true;
    }
  });
};

const copyToClipboard = () => {
  copy(outputText.value);
};
</script>
