<template>
    <div v-if="isPending">
      <div class="space-y-4">
        <USkeleton class="h-8 w-3/4" />
        <USkeleton class="h-4 w-1/2" />
        <div class="space-y-2">
          <USkeleton class="h-4 w-full" v-for="i in 5" :key="i" />
        </div>
      </div>
    </div>
    <div v-else-if="isError">
      <h1 class="text-2xl font-bold">Error: {{ error?.message }}</h1>
    </div>
    <div v-else-if="data" class="bg-white dark:bg-gray-800 rounded-lg p-4">
      <h1 class="text-3xl font-extrabold">{{ data.name }}</h1>
      <p class="text-gray-500 mt-2 mb-4">{{ data.description }}</p>
      <div v-html="data.content" class="prose md:prose-lg dark:prose-invert p-2"></div>
      <p class="text-sm text-gray-500 my-2 italic">Last updated {{ new Date(data.updated).toLocaleDateString() }}</p>
    </div>
    <div v-else>
      <h1 class="text-2xl font-bold">Procedure not found, either reload the page or contact the admin</h1>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { usePocketbase } from '@/composables/usePocketbase';
  import { useQuery } from '@tanstack/vue-query';
  
  const route = useRoute();
  const { getProcedureBySlug } = usePocketbase();
  
  const slug = route.params.slug as string;
  
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['getProcedureBySlug', slug],
    queryFn: () => getProcedureBySlug(slug),
  });
  
  watch(() => data.value, (newData) => {
    if (newData) {
      useHead({
        title: newData.name
      });
    }
  }, { immediate: true });
  
  definePageMeta({
    layout: 'studylink'
  });
  </script>