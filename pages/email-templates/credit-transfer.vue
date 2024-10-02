<template>
  <h1 class="font-bold text-2xl mb-4">Credit Transfer Templates</h1>

  <SearchTemplates />
  <div class="flex flex-col space-y-6">

    <div v-for="template in creditTransferTemplates" :key="template.title">
      <TemplateCard 
        :template="template" 
        
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Template } from "@/types/template";
import { getTemplatesByProcess } from "@/utils/templates";
import TemplateCard from "@/components/templateCard.vue";

const creditTransferTemplates = ref<Template[]>([]);

onMounted(() => {
  creditTransferTemplates.value = getTemplatesByProcess("Credit Transfer");
});

definePageMeta({
  layout: 'templates'
})
</script>