<template>
  <UButton variant="link" @click="openModal = true"> View </UButton>
  <UModal v-model="openModal" :fullscreen="message ? true : false">
    <UCard>
      <template v-if="message" #header>
        <div class="flex justify-between items-center">
          <h1>{{ title }}</h1>
          <UButton
            icon="i-heroicons-x-mark"
            color="red"
            @click="openModal = false"
          >
          </UButton>
        </div>
      </template>
      <div v-if="message" v-html="message"></div>
      <div v-else>
        <h1>{{ title }}</h1>
      </div>
      <template #footer>
        <div class="flex justify-end">
          <UButton color="red" variant="outline" @click="openModal = false"
            >Close</UButton
          >
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
const openModal = ref(false);

const props = defineProps<{
  title: string;
  message: string;
}>();
</script>
