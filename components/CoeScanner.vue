<template>
  <div>
    <div class="flex flex-col gap-4">
      <UFormGroup label="Upload CoE">
        <input
          type="file"
          @change="handleFileChange"
          accept="application/pdf"
        />
      </UFormGroup>
      <UButton block @click="uploadFile" :disabled="!selectedFile"> Scan CoE </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const selectedFile = ref<File | null>(null);
const result = ref();

const token = useRuntimeConfig().public.querySecretKey;

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files?.length) {
    selectedFile.value = input.files[0];
  }
};

const emit = defineEmits<{
  "scan-complete": [coeData: any]; // Type this based on your API response
}>();

const uploadFile = async () => {
  if (!selectedFile.value) return;

  const formData = new FormData();
  formData.append("file", selectedFile.value);

  try {
    const data = await $fetch("http://localhost:8000/parse-coe", {
      method: "POST",
      body: formData,
      query: { token: token },
      headers: { Accept: "application/json" },
    });
    result.value = data;
    console.log(result.value);
    emit("scan-complete", result.value);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
</script>
