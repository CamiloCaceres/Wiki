<template>
  <div class="grid md:grid-cols-8 gap-4">
    <div class="col-span-2">
      <UVerticalNavigation :links="links" />
      
    </div>

    <main class="prose md:col-span-6">
      <ContentDoc />
    </main>

    <nav class="col-span-2">
      <ul>
        <li v-for="item in localLinks?.children" :key="item.id">
          <UButton variant="link" :to="`/process/${localLinks?.id}#${item.id}`"
            >- {{ item.text }}</UButton
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const { data: navigation } = await useAsyncData("navigation", () =>
  fetchContentNavigation()
);

function transformNavigation(data: any) {
  if (!data || data.length === 0 || !data[0].children) {
    return []
  }

  const transformItem = (item: any) => ({
    label: item.title,
    to: item._path
  })

  return data[0].children.map(transformItem)
}


const links = computed(() =>
  navigation.value ? transformNavigation(navigation.value) : []
);
const { data: page } = await useAsyncData(route.path, () =>
  queryContent(route.path).findOne()
);

const localLinks = page.value?.body?.toc?.links[0];
</script>
