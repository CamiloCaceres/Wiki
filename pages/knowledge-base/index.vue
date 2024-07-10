<template>
  <h1 class="font-bold text-2xl mb-4">Knowledge Base</h1>
  <UCard class="mb-4" v-for="page in pages">
    <h2 class="font-semibold text-xl">{{ page.name }}</h2>
    <template #footer>
      <div class="flex justify-end">
        <UButton>
          <NuxtLink :to="page.to"> Go </NuxtLink>
        </UButton>
      </div>
    </template>
  </UCard>
</template>

<script setup>
const pages = [
  {
    name: "Visa Information",
    to: "/knowledge-base/visas",
  },
  {
    name: "Credit Transfer",
    to: "/knowledge-base/credit-transfer-guide",
  },
];
</script>
