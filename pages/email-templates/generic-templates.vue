<template>
    <h1 class="font-bold text-2xl mb-4">Generic Templates</h1>
  
    <div class="flex flex-col space-y-6">
      <div v-for="(template, index) in genericTemplates" :key="index">
        <TemplateCard :template="template" />
      </div>
    </div>
   
  </template>
  
  <script setup lang="ts">
  import {
    genericTemplates,
  } from "@/utils/templates/genericTemplates";
  
  
  </script>
  