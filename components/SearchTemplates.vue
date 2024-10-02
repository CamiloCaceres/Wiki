<template>
    <div class="relative">
      <UInput
        v-model="searchQuery"
        icon="i-heroicons-magnifying-glass-20-solid"
        size="sm"
        color="white"
        :trailing="false"
        placeholder="Search..."
        @input="handleSearch"
        class="w-full"
      />
      <div
        v-if="searchResults.length > 0 || (searchQuery && !isLoading)"
        class="absolute z-10 mt-2 w-full max-h-60 overflow-y-auto bg-white dark:bg-gray-800 rounded-md shadow-lg"
      >
        <div v-if="searchResults.length > 0" class="p-4">
          <h2 class="text-lg font-semibold mb-2 dark:text-gray-200">Search Results:</h2>
          <div v-for="template in searchResults" :key="template.title" class="mb-2">
              <NuxtLink
                :to="`/email-templates/${encodeURIComponent(template.title)}`"
                class="block hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md transition-colors duration-200"
              >
                <h3 class="font-medium dark:text-gray-200">{{ template.title }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ template.process }} | {{ template.category }}
                </p>
              </NuxtLink>
            </div>
        </div>
        <p
          v-else
          class="p-4 text-sm text-gray-600 dark:text-gray-400"
        >
          No results found.
        </p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import type { Template } from '@/types/template';
  import { searchTemplates } from '@/utils/templates';
  
  const props = defineProps<{
    process?: string;
    category?: 'AP' | 'Email';
  }>();
  
  const emit = defineEmits<{
    (e: 'results', results: Template[]): void;
  }>();
  
  const searchQuery = ref('');
  const searchResults = ref<Template[]>([]);
  const isLoading = ref(false);
  
  const handleSearch = () => {
    isLoading.value = true;
    searchResults.value = searchTemplates(
      searchQuery.value,
      props.process,
      props.category
    );
    isLoading.value = false;
    emit('results', searchResults.value);
  };
  
  watch(searchQuery, () => {
    if (searchQuery.value === '') {
      searchResults.value = [];
      emit('results', []);
    } else {
      handleSearch();
    }
  });
  </script>
  
  <style scoped>
  @media (max-width: 640px) {
    .absolute {
      position: fixed;
      top: 210px; /* Adjust based on your header height */
      left: 0;
      right: 0;
      max-height: calc(100vh - 60px);
    }
  }
  </style>