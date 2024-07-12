<template>
  <h1 class="font-bold text-2xl mb-4">Credit Transfer Templates</h1>

  <div class="flex flex-col space-y-6">
    <div v-for="(template, index) in creditTransferTemplates" :key="index">
      <div class="rounded-md p-4 flex items-center justify-between border-2">
        <div>
          <h3 class="font-semibold text-lg mb-2">{{ template.title }}</h3>
          <div class="flex">
            <UBadge color="orange" variant="soft" size="xs">{{
              template.process
            }}</UBadge>
            <UBadge
              :color="template.category === 'Email' ? 'green' : 'red'"
              variant="soft"
              >{{ template.category }}</UBadge
            >
          </div>
        </div>
        <div class="flex justify-between space-x-2">
          <UButton color="primary" variant="soft" @click="openPreview(template)"
            >Preview</UButton
          >

          <UButton
            color="primary"
            @click="copyToClipboard(template.content(userName))"
            >Copy Template</UButton
          >
        </div>
      </div>
    </div>
  </div>
  <UModal v-model="isOpen">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <h3 class="font-semibold text-xl mb-2">
          {{ selectedTemplate?.title ?? "" }}
        </h3>
      </template>

      <div class="p-4">
        <pre class="text-wrap font-sans">{{
          selectedTemplate?.content(userName) ?? ""
        }}</pre>
      </div>

      <template #footer>
        <div class="flex justify-end">
          <UButton
            color="primary"
            @click="copyToClipboard(selectedTemplate?.content(userName) ?? '')"
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
import { type Template } from "~/types/template";

const selectedTemplate = ref<Template>();

//Read username from local storage
const userName = ref("");
onMounted(() => {
  let userNameIsStored = window.localStorage.getItem("localUserName");
  if (userNameIsStored) {
    userName.value = userNameIsStored;
  }
});

const isOpen = ref(false);
const openPreview = (template: Template) => {
  selectedTemplate.value = template;
  isOpen.value = true;
};

const toast = useToast();

//Clipboard Handler
const { copy, copied } = useClipboard();
const copyToClipboard = async (content: string) => {
  await copy(content);
  if (copied) {
    toast.add({
      title: "Template Copied",
      icon: "i-heroicons-check-circle",
      color: "green",
    });
  }
};
</script>
