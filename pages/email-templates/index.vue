<template>
  <div>
    <h2 class="font-semibold text-3xl mb-4">Browse Templates</h2>
    <div class="flex space-x-4 mb-4">
      <SearchTemplates @search="handleSearch" />
    </div>
    <div class="flex items-center space-x-6 my-4">
      <div class="font-semibold self-start mr-4">Filter by:</div>
      <UFormGroup label="Process">
        <USelect
        v-model="selectedProcess"
        :options="processOptions"
      />
    </UFormGroup>
    <UFormGroup label="Category">
      <USelect
        v-model="selectedCategory"
        :options="categoryOptions"
        placeholder="Filter by category"
      />
    </UFormGroup>
    </div>
    <div class="flex flex-col space-y-6">
      <div v-for="template in filteredTemplates" :key="template.slug">
        <div class="rounded-md p-4 flex items-center justify-between border-2">
          <div>
            <h3 class="font-semibold text-lg mb-2">{{ template.title }}</h3>
            <p class="text-sm text-gray-600">{{ template.process }} | {{ template.category }}</p>
          </div>
          <UButton 
            color="primary" 
            @click="router.push(`/email-templates/${template.slug}`)"
          >
            Go to template
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { templates, advancedSearchTemplates } from '~/utils/templates';
import type { Template } from '~/types/template';

const router = useRouter();


const processOptions = computed(() => {
  const processes = new Set(templates.map(t => t.process));
  return Array.from(processes).map(process => ({ label: process, value: process }));
});

const categoryOptions = computed(() => {
  return [
    { label: 'All', value: 'AP' && 'Email' },
    { label: 'Email', value: 'Email' },
    { label: 'AP', value: 'AP' },
  ];
});

const searchQuery = ref('');
const selectedProcess = ref(processOptions.value[0].value);
const selectedCategory = ref(categoryOptions.value[0].value);


const filteredTemplates = computed(() => {
  return advancedSearchTemplates({
    query: searchQuery.value,
    process: selectedProcess.value,
    category: selectedCategory.value as 'AP' | 'Email' | undefined
  });
});

const handleSearch = (query: string) => {
  searchQuery.value = query;
};
</script>
