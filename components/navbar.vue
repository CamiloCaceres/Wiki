<template>
  <nav class="bg-gray-100 dark:bg-gray-800 sticky top-0 z-50 shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex space-x-16 items-center">
          <UButton
            size="xl"
            variant="ghost"
            icon="i-heroicons-bars-3"
            @click="isSidebarOpen = true"
          />
          <div class="ml-4">
            <NuxtLink
              class="text-gray-800 dark:text-gray-200 text-2xl font-bold"
              to="/"
            >
              🦘 AdmissionsWiki
            </NuxtLink>
          </div>

          <UInput
            v-if="false"
            icon="i-heroicons-magnifying-glass-20-solid"
            size="sm"
            color="white"
            :trailing="false"
            placeholder="Search..."
          />
        </div>
        <div class="flex items-center space-x-4">
          <DarkModeButton />
          <User />

          
        </div>
      </div>
    </div>
    <USlideover v-model="isSidebarOpen" :overlay="false" side="left">
      <UCard
        class="flex flex-col flex-1"
        :ui="{
          body: { base: 'flex-1' },
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <NuxtLink
              class="text-gray-800 dark:text-gray-200 text-2xl font-bold"
              to="/"
            >
              🦘 AdmissionsWiki
            </NuxtLink>
            <UButton
              @click="toggleSidebar"
              icon="i-heroicons-x-mark"
              size="xl"
              color="primary"
              square
              variant="ghost"
            />
          </div>
        </template>

        <ul class="mt-8">
          <li v-for="link in links" :key="link.text" class="py-2 px-4">
            <NuxtLink
              :to="link.to"
              @click="toggleSidebar"
              class="text-gray-700 hover:text-gray-900 dark:text-gray-200 pl-4 hover:underline transition"
            >
              {{ link.text }}
            </NuxtLink>
          </li>
        </ul>

        <template #footer>
        </template>
      </UCard>
    </USlideover>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isSidebarOpen = ref(false);

const links = [
  { text: "Home", to: "/" },
  { text: "Conditions", to: "/conditions" },
  { text: "Templates", to: "/email-templates" },
  { text: "CRM Processes", to: "/process" },
  { text: "Studylink processes", to: "/studylink" },
  { text: "Useful links", to: "/useful-links" },
  { text: "Trimester calculator", to: "/trimester-calculator" },
  { text: "Notes", to: "/notes" },
];

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};


</script>
