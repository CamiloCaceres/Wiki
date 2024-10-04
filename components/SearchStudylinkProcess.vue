<template>
    <UButton
      icon="i-heroicons-magnifying-glass"
      label="Search Application Processes"
      color="gray"
      variant="soft"
      @click="openSearch"
      :loading="isLoading"
    />
    <div v-if="studylink">
        <UModal v-model="isOpen">
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
  import { ref, computed, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { usePocketbase } from "@/composables/usePocketbase";

  //TODO: use the composable, ensure we are also searching by keywords
  
  const router = useRouter();
  const commandPaletteRef = ref();
  const {pb} = usePocketbase();
  
  const studylink = ref();
  const isOpen = ref(false);
  const isLoading = ref(false);
  
  onMounted(async () => {
    await fetchStudylink();
  });
  
  async function fetchStudylink() {
    isLoading.value = true;
    try {
      const result = await pb.collection('studylink').getList(1, 50, {
        sort: '-created'
      });
      studylink.value = result.items;
    } catch (error) {
      console.error('Error fetching studylink:', error);
    } finally {
      isLoading.value = false;
    }
  }
  
  const studylinkCommands = computed(() =>
    studylink.value.map((studylink: any) => ({
      id: studylink.id,
      label: studylink.name,
      icon: "i-heroicons-document-text",
      to: `/application-processes/${studylink.slug}`,
      keywords: studylink.keywords,
    }))
  );
  
  const groups = computed(() => [
    {
      key: "processes",
      label: "Application Processes",
      commands: studylinkCommands.value,
    },
  ]);
  
  function onSelect(option: any) {
    if (option.to) {
      router.push(option.to);
    }
  }
  
/*   // Add this method to filter commands based on search input
  function filterCommands(input: string) {
    if (!input) return studylinkCommands.value;
    
    return studylinkCommands.value.filter((command: any) => 
      command.label.toLowerCase().includes(input.toLowerCase()) ||
      command.keywords.some((keyword: string) => 
        keyword.toLowerCase().includes(input.toLowerCase())
      )
    );
  }
  
  // Override the default search method of UCommandPalette
  function overrideSearch() {
    if (commandPaletteRef.value) {
      commandPaletteRef.value.search = filterCommands;
    }
  }
  
  // Call this method after the component is mounted
  onMounted(() => {
    overrideSearch();
  }); */
  
  function openSearch() {
    if (!studylink.value) {
      fetchStudylink();
    }
    isOpen.value = true;
  }
  </script>