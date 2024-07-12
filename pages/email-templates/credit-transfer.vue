<template>
  <h1 class="font-bold text-2xl mb-4">Credit Transfer Templates</h1>

  <div class="flex flex-col space-y-6">
    <div v-for="(template, index) in creditTransferTemplates" :key="index">
      <TemplateCard :template="template" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { creditTransferTemplates } from "@/utils/templates/creditTransfer";
</script>