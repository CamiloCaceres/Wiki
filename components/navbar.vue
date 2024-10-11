<template>
  <nav class="bg-gray-100 dark:bg-gray-800 sticky top-0 z-50 shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <UButton
            size="lg"
            variant="ghost"
            icon="i-heroicons-bars-3"
            @click="isSidebarOpen = true"
            class="mr-2 sm:mr-4"
          />
          <NuxtLink
            class="text-gray-800 dark:text-gray-200 text-xl sm:text-2xl font-bold truncate"
            to="/"
          >
            🦘 AdmissionsWiki
          </NuxtLink>
        </div>
        <div class="flex items-center space-x-2 sm:space-x-4">
          <UInput
            v-if="false"
            icon="i-heroicons-magnifying-glass-20-solid"
            size="sm"
            color="white"
            :trailing="false"
            placeholder="Search..."
            class="hidden sm:block"
          />
          <DarkModeButton />
          <User />
        </div>
      </div>
    </div>
    <USlideover v-model="isSidebarOpen" :overlay="true" side="left">
      <UCard
        class="flex flex-col h-full"
        :ui="{
          body: { base: 'flex-1 overflow-y-auto' },
          ring: '',
          divide: 'divide-y divide-gray-200 dark:divide-gray-700',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between p-4">
            <NuxtLink
              class="text-gray-800 dark:text-gray-200 text-2xl font-bold"
              to="/"
              @click="toggleSidebar"
            >
              🦘 AdmissionsWiki
            </NuxtLink>
            <UButton
              @click="toggleSidebar"
              icon="i-heroicons-x-mark"
              size="lg"
              color="gray"
              square
              variant="ghost"
            />
          </div>
        </template>

        <div class="p-4">
          <h2 class="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Main Menu</h2>
          <ul class="space-y-2">
            <li v-for="item in mainItems" :key="item.text">
              <NuxtLink
                :to="item.to"
                @click="toggleSidebar"
                class="block py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 transition"
              >
                {{ item.text }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="p-4">
          <h2 class="text-md font-medium mb-2 text-gray-600 dark:text-gray-400">Additional Resources</h2>
          <ul class="space-y-1">
            <li v-for="item in menuItems" :key="item.text">
              <NuxtLink
                :to="item.to"
                @click="toggleSidebar"
                class="block py-1.5 px-4 rounded-md text-sm text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 transition"
              >
                {{ item.text }}
              </NuxtLink>
            </li>
          </ul>
        </div>

      </UCard>
    </USlideover>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isSidebarOpen = ref(false);

const mainItems = [
  { text: "Templates", to: "/email-templates" },
  { text: "Procedures", to: "/procedures" },
  { text: "Studylink processes", to: "/studylink" },
  { text: "Notes", to: "/notes" },
];

const menuItems = [
  { text: "Conditions", to: "/conditions" },
  { text: "Useful links", to: "/useful-links" },
  { text: "Trimester calculator", to: "/trimester-calculator" },
  { text: "COE", to: "/coe" },
];

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>
