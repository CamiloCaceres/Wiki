<template>
  <nav class="bg-gray-800 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <UiButton class="text-gray-300 hover:text-white focus:outline-none" @click="toggleSidebar">
          <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </UiButton>
        <div class="ml-4">
          <h1 class="text-white text-2xl font-bold">Internal Wiki</h1>
        </div>
        <div>
          <UPopover>
            <UButton :ui="{ rounded: 'rounded-full' }" icon="i-heroicons-user-circle-solid" size="sm" color="primary"
              square variant="outline" />
            <template #panel>
              <div class="p-6 flex flex-col items-center justify-center space-y-2">
                <UIcon class="text-4xl text-orange-500" name="i-heroicons-user" />
                <h2>Your name:</h2>
                <UInput v-model="userName"/>
              </div>
            </template>
          </UPopover>
        </div>
      </div>
    </div>

    <div
      :class="['sidebar', 'fixed', 'inset-y-0', 'left-0', 'w-64', 'bg-gray-900', 'transform', 'transition', 'duration-300', 'ease-in-out', { 'translate-x-0': isSidebarOpen, '-translate-x-full': !isSidebarOpen }]">
      <div class="flex items-center justify-end mt-4 mr-4">
        <UiButton class="text-gray-300 hover:text-white focus:outline-none" @click="toggleSidebar">
          <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </UiButton>
      </div>
      <ul class="mt-8">
        <li v-for="link in links" :key="link.text" class="py-2 px-4">
          <NuxtLink :to="link.to" class="text-gray-300 hover:text-white">
            {{ link.text }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isSidebarOpen = ref(false);

const links = [
  { text: 'Home', to: '/' },
  { text: 'Conditions', to: '/conditions' },
  { text: 'Email templates', to: '/email-templates' },
  { text: 'AP templates', to: '/ap-templates' },

];

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

// Add name component
import { useLocalStorage } from '@vueuse/core';

const userName = ref(useLocalStorage('userName', ''));

watch(userName, (newValue) => {
  useLocalStorage('userName', newValue);
});
</script>