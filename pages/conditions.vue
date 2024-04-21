<template>
    <div>
        <h2 class="font-bold text-xl mb-4">Select Conditions</h2>
        <div>
            <div v-for="condition in conditions" :key="condition.id"
                class="flex items-center justify-between py-2 border-b-2">
                <UHeading tag="h3" size="md" weight="medium">{{ condition.name }}</UHeading>
                <UCheckbox v-model="condition.checked" class="ml-4" />
            </div>
        </div>
        <div class="mt-4">
            <UButton color="primary" @click="generateConditions">Generate Conditions</UButton>
        </div>
        <UModal v-model="showingConditions" title="Generated Conditions" :footer="false">
            <UModalBody>
                <UCard>
                    <UCardBody>
                        <div v-if="selectedConditions.length > 0">
                            <h4 class="text-xl font-semibold mb-2">This offer is conditional upon:</h4>
                            <ul class="list-disc pl-6 mb-4">
                                <li v-for="condition in selectedConditions" :key="condition.id">{{ condition.name }}
                                </li>
                            </ul>
                            <UButton color="primary" @click="copyToClipboard">Copy to Clipboard</UButton>
                        </div>
                        <UAlert v-else type="info">No conditions selected.</UAlert>
                    </UCardBody>
                </UCard>
            </UModalBody>
        </UModal>
    </div>
</template>

<script setup lang="ts">
import { conditions, type Condition } from '@/utils/conditions';
import { ref } from 'vue';
import { useClipboard } from '@vueuse/core';

const { copy } = useClipboard();
const showingConditions = ref(false);
const selectedConditions = ref<Condition[]>([]);

const toggleCondition = (condition: Condition) => {
    condition.checked = !condition.checked;
};

const generateConditions = () => {
    selectedConditions.value = conditions.filter(condition => condition.checked);
    showingConditions.value = true;
};

const copyToClipboard = () => {
    const conditionsList = selectedConditions.value.map(condition => `- ${condition.name}`).join('\n');
    const text = `This offer is conditional upon:\n ${conditionsList}`;
    copy(text);
    alert('Conditions copied to clipboard!');
};
</script>