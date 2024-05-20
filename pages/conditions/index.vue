<template>
  <div>
    <h1 class="font-bold text-xl my-4">Conditions:</h1>
    <UPopover class="h-full" v-model:open="copied" :popper="{ placement: 'top-end' }">
      <div class="flex w-full mb-6">
      <div class="whitespace-pre-line grow text-gray-600 rounded p-2 h-40 overflow-auto">{{ outputText }}</div>

      <UButton @click="copyToClipboard"
        :icon="copied ? 'i-heroicons-clipboard-document-check' : 'i-heroicons-clipboard-document'" size="lg"
        color="primary" square variant="solid" />


    </div>
      <template #panel>
        <div class="p-2 bg-lime-200">
          <p class=" text-lime-700">Copied!</p>
        </div>
      </template>
    </UPopover>
    
  </div>
  <h2 class="font-bold text-lg mb-4">Select conditions:</h2>
  <div class="grid grid-cols-4 gap-4 mb-4">
    <div v-for="condition in conditions.filter((condition) => !condition.isNursing)">
      <Condition v-bind="condition" @toggle-select="toggleSelect(condition.id)" />
    </div>
  </div>


  <h2 class="font-bold text-lg mb-4">Nursing Conditions:</h2>
  <div class="grid grid-cols-4 gap-4">
    <div v-for="condition in conditions.filter((condition) => condition.isNursing)">
      <Condition v-bind="condition" @toggle-select="toggleSelect(condition.id)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { conditionsFile, type Condition } from "@/utils/conditions";
import { ref } from "vue";
import { useClipboard } from "@vueuse/core";

const { copy, copied } = useClipboard();

const conditions = reactive(conditionsFile)
/* 
const nursingConditions = computed(() => conditions.value.filter((condition) => condition.isNursing));
const nonNursingConditions = computed(() => conditions.value.filter((condition) => !condition.isNursing));
 */
const selectedConditions = computed(() => conditions.filter((condition) => condition.isSelected));
const conditionsList = computed(() => selectedConditions.value.map((condition) => `- ${condition.text}`).join("\n"));
const outputText = computed(() => `This offer is conditional upon:\n ${conditionsList.value}`);


const toggleSelect = (conditionId: number) => {
  const condition = conditions.find((c) => c.id === conditionId);
  if (condition) {
    condition.isSelected = !condition.isSelected;
  }
}

const copyToClipboard = () => {
  copy(outputText.value);
};
</script>
