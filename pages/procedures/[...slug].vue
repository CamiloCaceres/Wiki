<template>
  <div v-if="procedure">
    <h1 class="text-3xl font-extrabold">{{ procedure.name }}</h1>
    <p class="text-gray-500 mt-2 mb-4">{{ procedure.description }}</p>
    <div v-html="procedure.content" class="prose md:prose-lg dark:prose-invert p-2"></div>
    <p class="text-sm text-gray-500 my-2 italic">Last updated {{ new Date(procedure.updated).toLocaleDateString() }}</p>
  </div>
  <div v-else-if="loading">
    <div class="space-y-4">
            <USkeleton class="h-8 w-3/4" />
            <USkeleton class="h-4 w-1/2" />
            <div class="space-y-2">
                <USkeleton class="h-4 w-full" v-for="i in 5" :key="i" />
            </div>
        </div>
    </div>
    <div v-else>
        <h1 class="text-2xl font-bold">Procedure not found, either reload the page or contact the admin</h1>
    </div>


</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { usePocketbase } from '@/composables/usePocketbase';

const route = useRoute();
const { getProcedureBySlug } = usePocketbase();

const slug = route.params.slug as string;
const procedure = ref();
const loading = ref(true);

onMounted(async () => {
    try {
        procedure.value = await getProcedureBySlug(slug);
    } catch (error) {
        console.error("Error fetching procedure:", error);
    } finally {
        loading.value = false;
        useHead({
            title: procedure.value?.name
        })
    }
});

definePageMeta({
    layout: 'studylink'
});
</script>
