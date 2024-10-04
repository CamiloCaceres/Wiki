<template>
  <UButton
    class="my-4"
    icon="i-heroicons-magnifying-glass"
    label="Search Templates"
    color="gray"
    variant="outline"
    block
    @click="isOpen = true"
  />
  <UModal v-model="isOpen">
    <UCommandPalette
      ref="commandPaletteRef"
      :groups="groups"
      :autoselect="false"
      @update:model-value="onSelect"
    />
  </UModal>
</template>


<script setup lang="ts">
import { ref, computed } from "vue";
import { templates } from "~/utils/templates";

const router = useRouter();
const commandPaletteRef = ref();

const templateCommands = computed(() =>
  templates.map((template) => ({
    id: template.slug,
    label: template.title,
    icon: "i-heroicons-document-text",
    to: `/email-templates/${template.slug}`,
  }))
);

const groups = computed(() => [
  {
    key: "templates",
    label: "Templates",
    commands: templateCommands.value,
  },
]);

function onSelect(option: any) {
  if (option.to) {
    router.push(option.to);
  }
}

const isOpen = ref(false);
</script>
