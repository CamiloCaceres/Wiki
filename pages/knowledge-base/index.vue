
<template>
      <h1 class="font-bold text-2xl mb-4">Knowledge Base</h1>
      <h2 class="font-semibold text-xl mb-4">New Visa information for Onshore students</h2>

<div v-for="visa in visas">
  <UCard>
        <template #header>
            <h2 class="font-semibold text-xl mb-4">Onshore Students on Visa {{ visa.visaNumber }}</h2>
    </template>
    <p>{{ visa.text }}</p>
   
      </UCard>
</div>
   

  </template>

<script setup>
const visas = reactive([
  {
    visaNumber: "500",
    text: "",
  }
])

</script>