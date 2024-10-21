<template>
  <div class="bg-gray-50 dark:bg-gray-900 min-h-screen">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>
<script setup>
useHead({
  script: [
    {
      src: 'https://static.cloudflareinsights.com/beacon.min.js',
      defer: true,
      'data-cf-beacon': '{"token": "a9d61fd8ac3b46cfb58ee1654cafb4d8"}',
    }
  ]
})
</script>
