<template>
  <div>
    <h1 class="text-3xl my-4 font-bold">Studylink processes</h1>
    <template v-if="isPending">
      <div
        v-for="i in 5"
        :key="i"
        class="p-4 flex justify-between items-center shadow-md rounded-md mt-4"
      >
        <div class="flex flex-col gap-2 w-full">
          <USkeleton class="h-6 w-3/4" />
          <USkeleton class="h-4 w-full" />
        </div>
      </div>
    </template>
    <span v-else-if="isError">Error: {{ error?.message }}</span>
    <div v-else="data && data.length > 0">
      <SearchProcess :processes="data" />
      <div
        v-for="process in data"
        :key="process.id"
        @click="router.push(`/studylink/${process.slug}`)"
        class="p-4 flex justify-between items-center cursor-pointer dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md mt-4"
        >
        <div class="flex flex-col gap-2">
          <h2 class="text-xl font-bold">{{ process.name }}</h2>
          <div class="flex gap-2">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ process.description }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400 capitalize">
              | {{ process.process }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePocketbase } from "@/composables/usePocketbase";
import { useRouter } from "vue-router";
import { useQuery } from '@tanstack/vue-query'

const router = useRouter();
const { getAllStudylink } = usePocketbase();

const { isPending, isError, data, error } = useQuery({ queryKey: ['getAllStudylink'], queryFn: getAllStudylink })

useHead({
  title: "Studylink processes",
});
</script>
