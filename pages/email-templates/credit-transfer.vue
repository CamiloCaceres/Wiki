<template>
  <h1 class="font-bold text-2xl mb-4">Credfit Transfer Templates</h1>
  <div class="grid grid-cols-4 gap-4">
    <div
      v-for="(template, index) in creditTransferTemplates"
      :key="index"
      class="col-span-4 md:col-span-2 lg:col-span-2"
    >
      <UCard class="h-full">
        <template #header>
          <h3 class="font-semibold text-xl mb-2">{{ template.title }}</h3>
        </template>

        <template #footer>
          <div class="flex justify-end space-x-4">
            <UButton
              color="primary"
              variant="outline"
              @click="openPreview(template)"
              >Preview</UButton
            >
            <UButton
              color="primary"
              @click="copyToClipboard(template.content(userName))"
              >Go to template</UButton
            >
          </div>
        </template>
      </UCard>
    </div>
  </div>

  <UModal v-model="isOpen" >
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <h3 class="font-semibold text-xl mb-2">{{ selectedTemplate.title }}</h3>
      </template>

      <div class="p-4">
        <pre class="text-wrap">{{ selectedTemplate.content(userName) }}</pre>
      </div>

      <template #footer>
        <div class="flex justify-end">
          <UButton
            color="primary"
            @click="copyToClipboard(selectedTemplate.content(userName))"
            >Copy</UButton
          >
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
import { creditTransferTemplates } from "@/utils/templates/creditTransfer";

const isOpen = ref(false);
const selectedTemplate = ref(null);

//Read username from local storage
const userName = ref("");
onMounted(() => {
  let userNameIsStored = window.localStorage.getItem("localUserName");
  if (userNameIsStored) {
    userName.value = userNameIsStored;
  }
});

const openPreview = (template) => {
  selectedTemplate.value = template;
  isOpen.value = true;
};

//Clipboard Handler
const { copy, copied } = useClipboard();

const copyToClipboard = async (content) => {
  await copy(content);
};
</script>
