<template>
  <UContainer v-if="template" class="py-8 max-w-4xl">
    <UCard
      :ui="{
        divide: 'dark:divide-gray-700',
        background: 'bg-gray-100 dark:bg-gray-800',
      }"
    >
      <template #header>
        <h1 class="text-2xl font-bold capitalize">{{ template.title }}</h1>
      </template>

      <pre
        class="whitespace-pre-wrap font-sans p-4 rounded-lg overflow-x-auto"
        >{{ renderedContent }}</pre
      >
      <!-- Dynamic parameter inputs -->
      <div v-if="dynamicParams.length > 0" class="mb-4 space-y-4 border-t border-gray-300 pt-4">
        <h1 class="text-lg font-bold">Fill in the required information:</h1>
        <div v-for="param in dynamicParams" :key="param" class="flex flex-col">
          <UFormGroup required :label="param" :name="param" class="capitalize">
            <UInput :id="param" v-model="paramValues[param]" />
          </UFormGroup>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-between items-center">
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
            @click="copyToClipboard(renderedContent as string)"
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
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import type { Template, TemplateParams } from "@/types/template";
import { templates, renderTemplate } from "@/utils/templates";
import { useClipboard } from "@vueuse/core";

const route = useRoute();
const templateTitle = route.params.title as string;

const template = ref<Template | undefined>(
  templates.find((t) => t.slug.toLowerCase() === templateTitle.toLowerCase())
);

const { userName } = useUsername();

// Dynamic parameters handling
const dynamicParams = computed(() =>
  template.value
    ? template.value.requiredParams.filter((param: string) => param !== "userName")
    : []
);

const paramValues = ref<Record<string, string>>({});

// Initialize paramValues with empty strings for each required parameter
watch(
  template,
  (newTemplate) => {
    if (newTemplate) {
      paramValues.value = Object.fromEntries(
        newTemplate.requiredParams
          .filter((param: string) => param !== "userName")
          .map((param: string) => [param, ""])
      );
    }
  },
  { immediate: true }
);

const renderedContent = computed(() => {
  if (template.value) {
    const params = {
      userName: userName.value,
      ...paramValues.value,
    };
    try {
      return renderTemplate(template.value, params);
    } catch (error) {
      return `Error: ${error}`;
    }
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
