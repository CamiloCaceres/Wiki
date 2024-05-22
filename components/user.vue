<template>
  <UPopover>
    <UButton
      :ui="{ rounded: 'rounded-full' }"
      icon="i-heroicons-user-circle-solid"
      size="sm"
      color="primary"
      square
      variant="outline"
    />
    <template #panel>
      <div class="p-6 flex flex-col items-center justify-center space-y-2">
        <UIcon class="text-2xl text-orange-500" name="i-heroicons-user" />
        <h2>Your name:</h2>
        <UInput v-model="userName" />
      </div>
    </template>
  </UPopover>
</template>


<script setup lang="ts">
const userName = ref("");
onMounted(() => {
  let userNameIsStored = window.localStorage.getItem("localUserName");
  if (userNameIsStored) {
    userName.value = userNameIsStored;
  }
});

watch(userName, () => {
  window.localStorage.setItem("localUserName", userName.value);
});
</script>
