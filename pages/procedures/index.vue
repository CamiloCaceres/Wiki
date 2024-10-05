<template>
  <div>
    <h1 class="text-3xl my-4 font-bold">Procedures</h1>
  </div>
  <div v-if="isPending">
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
  </div>
  <div v-else-if="isError">
    <h1>Error: {{ error?.message }}</h1>
  </div>
  <div v-else>
    <SearchProcess :processes="data" />
    <div
      v-for="procedure in data"
      :key="procedure.id"
      @click="router.push(`/procedures/${procedure.slug}`)"
      class="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-md mt-4"
    >
      <div class="flex flex-col gap-2">
        <h2 class="text-xl font-bold">{{ procedure.name }}</h2>
        <div class="flex gap-2">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ procedure.description }}
          </p>
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
const { getAllProcedures } = usePocketbase();

const { isPending, isError, data, error } = useQuery({ queryKey: ['getAllProcedures'], queryFn: getAllProcedures })
</script>
