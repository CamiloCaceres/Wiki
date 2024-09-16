<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-semibold mb-4 text-center">Admissions Wiki</h1>
    <p class="text-xl mb-8 text-center">Love what you do 🫰</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="hover:shadow-lg transition-shadow"
      >
        <template #header>
          <h2 class="text-xl font-semibold">{{ link.text }}</h2>
        </template>
        <template #footer>
          <div class="flex justify-end">
            <UButton color="primary" icon="i-heroicons-arrow-right" :to="link.to"></UButton>
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const links = [
  { text: "Conditions", to: "/conditions" },
  { text: "Templates", to: "/email-templates" },
  { text: "CRM Processes", to: "/process" },
  { text: "Studylink processes", to: "/studylink" },
  { text: "Useful links", to: "/useful-links" },
  { text: "Trimester calculator", to: "/trimester-calculator" },
  { text: "Notes", to: "/notes" },
  { text: "COE", to: "/coe" },
];
</script>