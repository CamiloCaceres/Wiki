<template>
  <div>
    <h1 class="text-2xl font-bold">Studylink processes</h1>
    <SearchStudylinkProcess />


    <div
      v-if="studylink && studylink.length > 0"
      v-for="process in studylink"
      :key="process.id"
      @click="router.push(`/studylink/${process.slug}`)"
      class="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 shadow-md rounded-md mt-4"
    >
      <div class="flex flex-col gap-2">
        <h2 class="text-xl font-semibold">{{ process.name }}</h2>
        <UDivider class="my-1"/>
        <div class="flex gap-2">
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ process.description }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400 capitalize">
            | {{ process.process }}
          </p>
        </div>
      </div>
    </div>
    <template v-else-if="loading">
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
    <div v-else>
      <h1>No studylink processes found</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePocketbase } from "@/composables/usePocketbase";
import { useRouter } from "vue-router";

const router = useRouter();
const { getAllStudylink } = usePocketbase();

const studylink = ref();
const loading = ref(true);

onMounted(async () => {
  try {
    studylink.value = await getAllStudylink();
  } catch (error) {
    console.error("Error fetching studylinks:", error);
  } finally {
    loading.value = false;
  }
});
</script>
