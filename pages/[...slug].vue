<template>
<nav class="table-of-contents">
      <ul>
        <li v-for="item in links?.children" :key="item.id">
          <UButton variant="link":to="`/process/${links?.id}#${item.id}`">- {{ item.text }}</UButton>
        </li>
      </ul>
    </nav>

  <main class="prose">
    <ContentDoc />
  </main>
</template>

<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())

const links = page.value?.body?.toc?.links[0]

</script>

