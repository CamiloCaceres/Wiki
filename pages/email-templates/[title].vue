<template>
  <UContainer v-if="template" class="py-8">
    <UCard>
      <template #header>
        <h1 class="text-2xl font-bold capitalize">{{ template.title }}</h1>
      </template>

      <pre
        class="whitespace-pre-wrap dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto"
        >{{ renderedContent }}</pre
      >

      <template #footer>
        <div class="flex  justify-between items-center">
          <div class="space-y-4 flex flex-col text-sm">
            <div>
              <UIcon name="i-heroicons-cog-6-tooth" class="mr-2" />
              <span class="font-semibold">Process:</span> {{ template.process }}
            </div>

            <div>
              <UIcon name="i-heroicons-tag" class="mr-2" />
              <span class="font-semibold">Category:</span>
              {{ template.category }}
            </div>
          </div>

          <UButton
            icon="i-heroicons-clipboard"
            color="primary"
            @click="copyToClipboard(renderedContent)"
          >
            Copy Template
          </UButton>
        </div>
      </template>
    </UCard>
  </UContainer>
  <UContainer v-else class="py-8">
    <UAlert
      title="Template Not Found"
      color="red"
      icon="i-heroicons-exclamation-triangle"
    >
      <p>The requested template could not be found.</p>
    </UAlert>
  </UContainer>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import type { Template } from "@/types/template";
import { templates, renderTemplate } from "@/utils/templates";
import { useClipboard } from "@vueuse/core";

const route = useRoute();
const templateTitle = route.params.title as string;

const template = ref<Template | undefined>(
  templates.find((t) => t.slug.toLowerCase() === templateTitle.toLowerCase())
);

const renderedContent = computed(() => {
  if (template.value) {
    return renderTemplate(template.value, { userName: "Example User" });
  }
  return "";
});

const toast = useToast();

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

// Optional: Add meta tags for SEO
useHead({
  title: template.value
    ? `Template: ${template.value.title}`
    : "Template Not Found",
  meta: [
    {
      name: "description",
      content: template.value
        ? `View details of the ${template.value.title} template`
        : "Template not found",
    },
  ],
});
</script>
