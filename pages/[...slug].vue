<template>
  <div class="grid md:grid-cols-8">
    <main class="prose md:col-span-6 md: col-start-2 ">
      <ContentDoc />
    </main>

    <nav class="col-span-2">
      <ul>
        <li v-for="item in links?.children" :key="item.id">
          <UButton variant="link" :to="`/process/${links?.id}#${item.id}`"
            >- {{ item.text }}</UButton
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () =>
  queryContent(route.path).findOne()
);

const links = page.value?.body?.toc?.links[0];
</script>
