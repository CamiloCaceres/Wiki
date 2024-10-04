<template>
<UContainer class="max-w-4xl">
    <div v-if="studylink">
        <h1 class="text-3xl font-extrabold">{{ studylink.name }}</h1>
        <p class="text-gray-500 mt-2 mb-4">{{ studylink.description }}</p>
        <div v-html="studylink.content" class="prose md:prose-lg dark:prose-invert p-2"></div>
        <p class="text-sm text-gray-500 my-2 italic">Last updated {{ new Date(studylink.updated).toLocaleDateString() }}</p>
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
        <h1 class="text-2xl font-bold">Studylink posts not found, either reload the page or contact the admin</h1>
    </div>

</UContainer>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import { usePocketbase } from '@/composables/usePocketbase';

const route = useRoute();
const { getStudylinkBySlug } = usePocketbase();

const slug = route.params.slug as string;
const studylink = ref();
const loading = ref(true);

onMounted(async () => {
    try {
        studylink.value = await getStudylinkBySlug(slug);
    } finally {
        loading.value = false;
    }
});

definePageMeta({
    layout: 'studylink'
});
</script>

