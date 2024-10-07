<template>
  <UButton
    class="my-4"
    icon="i-heroicons-magnifying-glass"
    label="Search Application Processes"
    color="gray"
    variant="outline"
    block
    @click="isOpen = true"
    :loading="isLoading"
  />
  <div v-if="props.processes">
    <UModal :fullscreen="$device.isMobile" v-model="isOpen">
      <UCommandPalette
        ref="commandPaletteRef"
        :groups="groups"
        :autoselect="false"
        @update:model-value="onSelect"
      />
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

//TODO: use the composable, ensure we are also searching by keywords
const props = defineProps<{
  processes: any;
}>();

const router = useRouter();
const commandPaletteRef = ref();

const isOpen = ref(false);
const isLoading = ref(false);

const processCommands = computed(() =>
  props.processes.map((process: any) => ({
    id: process.id,
    label: process.name,
    icon: "i-heroicons-document-text",
    to: `${router.currentRoute.value.path}/${process.slug}`,
    keywords: process.keywords,
  }))
);

const groups = computed(() => [
  {
    key: "processes",
    label: "Application Processes",
    commands: processCommands.value,
  },
]);

function onSelect(option: any) {
  if (option.to) {
    router.push(option.to);
  }
}
</script>
