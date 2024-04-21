<template>
    <div>
        <h2 class="font-semibold text-3xl mb-4">Browse Templates</h2>
        <NuxtLink to='/email-templates/offer-email' class="text-gray-300 hover:text-white">
            <UButton>New Offer Letter Email</UButton>
        </NuxtLink>
        <div class="grid grid-cols-4 gap-4">
            <div v-for="(template, index) in templates" :key="index" class="col-span-4 md:col-span-2 lg:col-span-2">
                <UCard>
                    <template #header>
                        <h3 class="font-semibold text-xl mb-2">{{ template.name }}</h3>
                    </template>
                    <p>{{ template.content }}</p>
                    <template #footer>
                        <div class="flex justify-end space-x-4">
                            <UButton color="primary" @click="showModal(template)">View Template</UButton>
                            <UButton color="primary" @click="copyToClipboard(template.content)">Copy to Clipboard
                            </UButton>

                        </div>
                    </template>
                </UCard>
            </div>
        </div>

        <UModal v-model="showingModal" :title="selectedTemplate?.name" :footer="false">
            <UModalBody>
                <pre class="bg-gray-100 p-4 rounded-md">{{ selectedTemplate?.content }}</pre>
                <span v-if="selectedTemplate">
                    <UButton color="primary" @click="copyToClipboard(selectedTemplate.content)">Copy to Clipboard
                    </UButton>
                </span>

            </UModalBody>
        </UModal>
    </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { ref } from 'vue'

interface Template {
    id: number
    name: string
    content: string
}

const { copy } = useClipboard()
const showingModal = ref(false)
const selectedTemplate = ref<Template | null>(null)

const templates: Template[] = [
    {
        id: 1,
        name: 'Template 1',
        content: `
  # Template 1
  This is the content of Template 1.
  You can copy this template to the clipboard.
      `
    },
    {
        id: 2,
        name: 'Template 2',
        content: `
  # Template 2
  This is the content of Template 2.
  You can also copy this template to the clipboard.
      `
    },
    // Add more templates as needed
]

const copyToClipboard = (content: string) => {
    copy(content)
    alert('Content copied to clipboard!')
}

const showModal = (template: Template) => {
    selectedTemplate.value = template
    showingModal.value = true
}
</script>