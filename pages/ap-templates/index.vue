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
                    <p>{{ template.description }}</p>
                    <template #footer>
                        <div class="flex justify-end space-x-4">
                            <UButton color="primary" @click="router.push(template.route)">View Template</UButton>
                          

                        </div>
                    </template>
                </UCard>
            </div>
        </div>

        <UModal v-model="showingModal" :title="selectedTemplate?.name" :footer="false">
            <UModalBody>
                <pre class="bg-gray-100 p-4 rounded-md">{{ selectedTemplate?.description }}</pre>
                <span v-if="selectedTemplate">
                    <UButton color="primary" @click="copyToClipboard(selectedTemplate.description)">Copy to Clipboard
                    </UButton>
                </span>

            </UModalBody>
        </UModal>
    </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()

interface Template {
    id: number
    name: string
    description: string
    route: string
}

const { copy } = useClipboard()
const showingModal = ref(false)
const selectedTemplate = ref<Template | null>(null)

const templates: Template[] = [
    {
        id: 1,
        name: 'Template 1',
        description: `
  # Template 1
  This is the description of Template 1.
  You can copy this template to the clipboard.
      `,
        route: '/email-templates/offer-email'

    },
    
    // Add more templates as needed
]

const copyToClipboard = (description: string) => {
    copy(description)
    alert('description copied to clipboard!')
}

const showModal = (template: Template) => {
    selectedTemplate.value = template
    showingModal.value = true
}
</script>