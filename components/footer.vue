<template>
    <footer class="bg-gray-100 py-4 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-0">
            © {{ currentYear }} Camilo Caceres
          </div>
   <!--        <div class="flex space-x-4 mb-2 md:mb-0">
            <a href="#" class="text-sm text-gray-600 hover:text-gray-800">IT Support</a>
            <a href="#" class="text-sm text-gray-600 hover:text-gray-800">Internal Resources</a>
            <a href="#" class="text-sm text-gray-600 hover:text-gray-800">Employee Portal</a>
          </div> -->
          <div class="text-xs text-gray-500">
            App Version 1.0.1
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  const currentYear = new Date().getFullYear();
  </script>