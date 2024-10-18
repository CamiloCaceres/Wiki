<template>
  <UContainer class="max-w-4xl">
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
      <h1>Error: {{ error?.message }}</h1>
    </div>

    <div v-else>
      <h1 class="text-3xl font-extrabold">{{ data?.name }}</h1>
      <p class="text-gray-500 mt-2 mb-4">{{ data?.description }}</p>
      <div
        v-html="data?.content"
        class="prose md:prose-lg dark:prose-invert p-2"
      ></div>
      <p class="text-sm text-gray-500 my-2 italic">
        Last updated {{ new Date(data?.updated as string).toLocaleDateString() }}
      </p>
    </div>
  </UContainer>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { usePocketbase } from "@/composables/usePocketbase";
import { useQuery } from "@tanstack/vue-query";

const route = useRoute();
const { getStudylinkBySlug } = usePocketbase();

const slug = route.params.slug as string;
const { isPending, isError, data, error } = useQuery({
  queryKey: ["getStudylinkBySlug", slug],
  queryFn: () => getStudylinkBySlug(slug),
});


useHead({
  title: data.value?.name ?? "Studylink",
});

definePageMeta({
  layout: "studylink",
});
</script>
