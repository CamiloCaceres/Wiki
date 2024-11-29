<template>
  <div>
    <div class="flex flex-col gap-4">
      <!-- Upload Form Group -->
      <UFormGroup label="Upload CoE" />

      <!-- Drop Zone -->
      <div
        ref="dropZoneRef"
        class="border-2 border-dashed border-gray-300 p-4 flex justify-center items-center gap-2"
        :class="{ 'border-green-500 bg-green-50': isOverDropZone, 'border-blue-500 bg-blue-50': filesData.length > 0 }"
      >
        <div v-if="filesData.length > 0 && !isLoading" class="flex items-center justify-around gap-2 w-full">
          <p>Files: {{ filesData.map((file) => file.name).join(", ") }}</p>

          <!-- Reset Button -->
          <UButton
            color="red"
            variant="ghost"
            icon="i-heroicons-trash"
            @click="reset"
          />
        </div>
        <UButton v-else :loading="isLoading" color="blue" variant="link" @click="open">{{
          isOverDropZone ? "Drop it!" : "Select or drop your CoE"
        }}</UButton>
      </div>

      <!-- Submit Button -->
      <UButton block @click="handleSubmit" :disabled="!selectedFile" :loading="isLoading">
        <span v-if="isLoading">Scanning...</span>
        <span v-else>Scan CoE</span>
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDropZone } from "@vueuse/core";
import { useFileDialog } from "@vueuse/core";

// Types
interface FileData {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

// Refs
const dropZoneRef = ref<HTMLDivElement>();
const filesData = ref<FileData[]>([]);
const selectedFile = ref<File | null>(null);
const result = ref();
const isLoading = ref(false);

// Config
const token = useRuntimeConfig().public.querySecretKey;
const fastApiUrl = useRuntimeConfig().public.fastApiUrl;

// Emits
const emit = defineEmits<{
  "scan-complete": [coeData: any]; // Type this based on your API response
}>();

// Drop Zone Setup
const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: ["application/pdf"],
  multiple: false,
  preventDefaultForUnhandled: false,
});

// File Handling Functions
function onDrop(files: File[] | null) {
  filesData.value = [];

  if (files && files.length > 0) {
    filesData.value = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    }));
    selectedFile.value = files[0];
  }
}

// File Dialog Setup
const {
  files: selectedFiles,
  open,
  reset: resetDialog,
  onCancel,
  onChange,
} = useFileDialog({
  accept: "application/pdf",
  multiple: false,
});

onChange((files) => {
  if (files && files.length > 0) {
    filesData.value = Array.from(files).map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    }));
    selectedFile.value = files[0];
  }
});

onCancel(() => {
  console.log("File selection cancelled");
});

// Update reset function to handle both drop zone and dialog
function reset() {
  filesData.value = [];
  selectedFile.value = null;
  resetDialog();
}

// API Functions
async function uploadFile() {
  if (!selectedFile.value) return;

  isLoading.value = true;

  const formData = new FormData();
  formData.append("file", selectedFile.value);

  try {
    const data = await $fetch(`${fastApiUrl}/parse-coe`, {
      method: "POST",
      body: formData,
      query: { token },
      headers: { Accept: "application/json" },
    });

    result.value = data;
    console.log(result.value);
    emit("scan-complete", result.value);
  } catch (error) {
    console.error("Error uploading file:", error);
  } finally {
    isLoading.value = false;
  }
}

// Event Handlers
function handleSubmit() {
  uploadFile();
  reset();
}
</script>
