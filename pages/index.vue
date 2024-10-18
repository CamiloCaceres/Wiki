<template>
  <div class="min-h-screen">
    <header>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl text-center font-bold text-gray-900 dark:text-white">Internal Wiki</h1>
      </div>
    </header>
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Main Apps Section -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Main Applications</h2>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <NuxtLink 
            v-for="item in mainItems" 
            :key="item.to" 
            :to="item.to"
            class="block p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div class="flex items-center justify-center h-16 w-16 rounded-md bg-primary text-white mb-4">
              <UIcon :name="getIcon(item.text)" class="h-8 w-8" />
            </div>
            <h3 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{{ item.text }}</h3>
            <p class="text-gray-600 dark:text-gray-300">Access {{ item.text.toLowerCase() }} information and tools.</p>
          </NuxtLink>
        </div>
      </section>

      <!-- Menu Items Section -->
      <section>
        <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Additional Resources</h2>
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <NuxtLink 
            v-for="item in menuItems" 
            :key="item.to" 
            :to="item.to"
            class="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <UIcon :name="getIcon(item.text)" class="h-6 w-6 mr-3 text-primary" />
            <span class="font-medium text-gray-900 dark:text-white">{{ item.text }}</span>
          </NuxtLink>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>

const mainItems = [
  { text: "Templates", to: "/email-templates" },
  { text: "Procedures", to: "/procedures" },
  { text: "Studylink processes", to: "/studylink" },
  { text: "Notes", to: "/notes" },
  
]
const menuItems = [
  { text: "Conditions", to: "/conditions" },
  { text: "Useful links", to: "/useful-links" },
  { text: "Trimester calculator", to: "/trimester-calculator" },
  { text: "COE", to: "/coe" },
  { text: "Keyboard shortcuts", to: "/shortcuts" },
];

const getIcon = (text) => {
  const iconMap = {
    "Conditions": "i-heroicons-book-open",
    "Templates": "i-heroicons-envelope",
    "Procedures": "i-heroicons-arrow-path",
    "Studylink processes": "i-heroicons-academic-cap",
    "Useful links": "i-heroicons-link",
    "Trimester calculator": "i-heroicons-calculator",
    "Notes": "i-heroicons-document-text",
    "COE": "i-heroicons-document",
    "Keyboard shortcuts": "i-heroicons-computer-desktop",
  };
  return iconMap[text] || "i-heroicons-book-open";
};

useHead({
  title: "Admissions Wiki",
});
</script>
