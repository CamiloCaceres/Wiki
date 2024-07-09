<template>
  <h1 class="font-bold text-2xl mb-4">Credfit Transfer Templates</h1>

  <div v-for="(template, index) in creditTransferTemplates" :key="index" class="col-span-4 md:col-span-2 lg:col-span-2">
                <UCard>
                    <template #header>
                        <h3 class="font-semibold text-xl mb-2">{{ template.title }}</h3>
                    </template>
                    

                    <template #footer>
                        <div class="flex justify-end space-x-4">
                            <UButton color="primary" @click="copyToClipboard(template.content(userName))">Go to template</UButton>
                        </div>
                    </template>
                </UCard>
            </div>
  </template>

<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
import { creditTransferTemplates  } from "@/utils/templates/creditTransfer";

//Read username from local storage
const userName = ref("");
onMounted(() => {
  let userNameIsStored = window.localStorage.getItem("localUserName");
  if (userNameIsStored) {
    userName.value = userNameIsStored;
  }
});

//Clipboard Handler
const { copy, copied } = useClipboard();

const copyToClipboard = async (content) => {
  await copy(content);
};

</script>