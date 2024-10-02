<template>
  <h1 class="font-bold text-2xl mb-4">Generic Templates</h1>

  <SearchTemplates />
  <div class="flex flex-col space-y-6">

    <div v-for="template in genericTemplates" :key="template.title">
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

const genericTemplates = ref<Template[]>([]);

onMounted(() => {
  genericTemplates.value = getTemplatesByProcess("Generic");
});

definePageMeta({
  layout: 'templates'
})
</script>