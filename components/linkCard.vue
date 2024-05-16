<template>
    <div class="rounded-md p-4 flex items-center justify-between border-2">
        <h4>{{ props.name }}</h4>
          <UButton
          @click="handleClick(props.link)"
    :icon="copied ? 'i-heroicons-check' : 'i-heroicons-clipboard-document'"
    size="md"
    color="primary"
    square
    variant="outline"
  />

    </div>
</template>

<script setup lang="ts">
import { useClipboardItems } from '@vueuse/core'

const { copy, copied } = useClipboardItems()

const handleClick = (text:any) => {
    copy(text)
}

const props = defineProps({
  name: String,
  id: Number,
  link: String,
})

</script>