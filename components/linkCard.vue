<template>
  <div class="rounded-md p-4 flex items-center justify-between border-2 transition">
    <h4>{{ props.name }}</h4>
    <UPopover mode="hover">
      <UButton :to="props.link" target="_blank" size="md" color="primary" square variant="outline" icon="i-heroicons-arrow-top-right-on-square" />
      <template #panel>
        <div class="p-2">
          <p class="text-xs text-gray-400">{{ props.link }}</p>
        </div>
      </template>
    </UPopover>


  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: String,
  id: Number,
  link: String,
})

</script>