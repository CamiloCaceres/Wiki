<template>
    <div>
        <h2 class="font-bold text-xl mb-4">Nursing Conditions:</h2>
        <div class="flex items-center space-x-4">
        <UButton color="primary" @click="copyDipNurse">Dip. Nurse Conditions</UButton>
        <UButton color="primary" @click="copyBachNurse">Bach. Nurse Conditions</UButton>
    </div>
        <h2 class="font-bold text-xl my-4">Select Conditions</h2>
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

const copyDipNurse = () => {
    const text = `This offer is conditional upon:
- Providing signed Nursing and Midwifery Board of Australia English Language Skills Declaration (NMBA) Form
- Passing the Numeracy Component of the Language, Literacy and Numeracy (LLN) assessment. LLN assessment log in details has been sent to the student directly.
- Limited capacity at campus. Enrolment with the University is subject to space availability. COE will confirm enrolment once issued, subject to visa grant.`;
copy(text)
alert('Dip Nurse Conditions copied to clipboard!');

}

const copyBachNurse = () => {
    const text = `This offer is conditional upon:
- Successful completion of Diploma of Nursing at Think education.
- Active AHPRA registration at the time of the course start date
- Providing complete NMBA form
- Upon completing Diploma of Nursing, course credits, duration and tuition fee will be revised and adjusted accordingly.
- Limited capacity at campus. Enrolment with University is subject to space availability and student must have AHPRA registration to be considered for COE. COE will confirm enrolment once issued, subject to Visa grant.
`;
copy(text)
alert('Bach Nurse Conditions copied to clipboard!');

}

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