<script setup lang="ts">
import { type Template } from "~/types/template";

const props = defineProps<{
  template: Template;
}>();

import { useClipboard } from "@vueuse/core";

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

<template>
  <div class="rounded-md p-4 flex items-center justify-between border-2">
    <div>
      <h3 class="font-semibold text-lg mb-2">{{ props.template.title }}</h3>
      <div class="flex space-x-1">
        <UBadge color="orange" variant="soft" size="xs">{{
          props.template.process
        }}</UBadge>
        <UBadge
          :color="props.template.category === 'Email' ? 'green' : 'red'"
          variant="soft"
          >{{ props.template.category }}</UBadge
        >
        <UBadge v-if="props.template.isInternal" color="red" variant="soft" size="xs">Internal</UBadge>
      </div>
    </div>
    <div class="flex justify-between space-x-2">
      <UButton color="primary" variant="soft" @click="openPreview(template)"
        >Preview</UButton
      >

      <UButton
        color="primary"
        @click="copyToClipboard(template.content({ userName: userName }))"
        >Copy Template</UButton
      >
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
          selectedTemplate?.content({ userName: userName }) ?? ""
        }}</pre>
      </div>

      <template #footer>
        <div class="flex justify-end">
          <UButton
            color="primary"
            @click="copyToClipboard(selectedTemplate?.content({ userName: userName }) ?? '')"
            >Copy</UButton
          >
        </div>
      </template>
    </UCard>
  </UModal>
</template>
