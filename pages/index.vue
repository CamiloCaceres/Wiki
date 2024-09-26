<template>
  <div class="min-h-screen dark:bg-gray-900">
    <header class="bg-white dark:bg-gray-800 ">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl text-center font-bold text-gray-900 dark:text-white">Internal Wiki</h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <NuxtLink 
              v-for="item in menuItems" 
              :key="item.to" 
              :to="item.to"
              class="block p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-4">
                <UIcon :name="getIcon(item.text)" class="h-6 w-6" />
              </div>
              <h2 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{{ item.text }}</h2>
              <p class="text-gray-600 dark:text-gray-300">Access {{ item.text.toLowerCase() }} information and tools.</p>
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const menuItems = [
  { text: "Conditions", to: "/conditions" },
  { text: "Templates", to: "/email-templates" },
  { text: "CRM Processes", to: "/process" },
  { text: "Studylink processes", to: "/studylink" },
  { text: "Useful links", to: "/useful-links" },
  { text: "Trimester calculator", to: "/trimester-calculator" },
  { text: "Notes", to: "/notes" },
  { text: "COE", to: "/coe" },
];

const getIcon = (text) => {
  const iconMap = {
    "Conditions": "i-heroicons-book-open",
    "Templates": "i-heroicons-envelope",
    "CRM Processes": "i-heroicons-arrow-path",
    "Studylink processes": "i-heroicons-academic-cap",
    "Useful links": "i-heroicons-link",
    "Trimester calculator": "i-heroicons-calculator",
    "Notes": "i-heroicons-document-text",
    "COE": "i-heroicons-document",
  };
  return iconMap[text] || "i-heroicons-book-open";
};
</script>