<template>
    <Navbar />
    <UButton class="mx-32 translate-y-2" variant="link" icon="i-heroicons-arrow-left-20-solid" color="rose" label="Templates" to="/email-templates"/>
    <div class="max-w-5xl mx-auto mt-10">
      <slot />
    </div>
  </template>
  