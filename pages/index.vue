<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold mb-4 text-center">Welcome to Our Internal Wiki</h1>
      <p class="text-xl mb-8 text-center">Access and share knowledge within our organization.</p>
  
      <div class="flex justify-center">
        <UiButton class="px-6 py-3 bg-blue-500 text-white rounded-md" @click="navigateToWiki">Enter Wiki</UiButton>
      </div>
  
      <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <UiIcon class="mx-auto mb-4" name="search" />
          <h3 class="text-2xl font-semibold mb-2">Search</h3>
          <p class="text-lg">Easily search and find the information you need.</p>
        </div>
        <div class="text-center">
          <UiIcon class="mx-auto mb-4" name="edit" />
          <h3 class="text-2xl font-semibold mb-2">Contribute</h3>
          <p class="text-lg">Contribute your knowledge and help others.</p>
        </div>
        <div class="text-center">
          <UiIcon class="mx-auto mb-4" name="collaboration" />
          <h3 class="text-2xl font-semibold mb-2">Collaborate</h3>
          <p class="text-lg">Collaborate with your colleagues and share insights.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const navigateToWiki = () => {
    router.push('/wiki');
  };
  </script>