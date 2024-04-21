<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { useClipboardItems } from '@vueuse/core'


const { copy, isSupported } = useClipboardItems()


const copyToClipboard = async () => {
  const html = editor.value?.getHTML()
  if (html) {
    try {
      await copy([
        new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
        })
      ])
      // Optional: Show a success message or perform any other actions
      console.log('Letter copied to clipboard!')
    } catch (error) {
      console.error('Failed to copy letter to clipboard:', error)
    }
  }
}
const schema = z.object({
  studentName: z.string().min(1, 'Student name is required'),
  isConditional: z.boolean().optional(),
  deposit: z.number().min(0, 'Deposit must be a positive number'),
  scholarship: z.number().min(0, 'Scholarship must be a positive number').max(100, 'Scholarship cannot exceed 100%')
})

type Schema = z.output<typeof schema>

const state = reactive({
  studentName: undefined,
  isConditional: undefined,
  deposit: undefined,
  scholarship: undefined
})

const modalVisible = ref(false)
const editor = useEditor({
  editable: false,
  content: '',
  extensions: [
    StarterKit,
  ],
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
  const letterContent = `
    <p>Dear Partner,</p>
    <p>Please kindly find attached ${state.isConditional ? 'a <strong>Conditional</strong>' : 'an Unconditional'} Offer Letter for <strong>${state.studentName}</strong>.</p>
    <p>To accept your offer:</p>
    <ol>
      <li>Meet any conditions stated on this offer, if applicable.</li>
      <li>Total Deposit Payable: <span class="text-red">$ ${state.deposit}</span> (3 units minus ${state.scholarship}% scholarship)</li>
    </ol>
    <p>Please refer to page 2 for payment methods, remember to include your student ID in the payment reference and note that the total tuition fees in the offers are based on the current year's pricing and are subject to annual change.</p>
    <ol start="3">
      <li>Please sign and return all pages of the Letter of Offer and Written Agreement.</li>
    </ol>
    <p>Kindly note that all above information, documents and deposit payment must be received to be issued with a CoE (Confirmation of Enrolment).</p>
    <p>The fastest way is to pay with credit card via phone: <strong>02 8588 4703</strong></p>
    <p>If you have any questions, please contact the International Admissions Team at <a href="mailto:intadmissions@laureate.net.au">intadmissions@laureate.net.au</a>.</p>
    <p>Thank you.</p>
    <p>Regards,</p>
  `
  editor.value?.commands.setContent(letterContent)
  modalVisible.value = true
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Student Name" name="studentName">
      <UInput v-model="state.studentName" />
    </UFormGroup>

    <UFormGroup label="Is Conditional" name="isConditional">
      <UCheckbox v-model="state.isConditional" />
    </UFormGroup>

    <UFormGroup label="Deposit" name="deposit">
      <UInput v-model.number="state.deposit" type="number" />
    </UFormGroup>

    <UFormGroup label="Scholarship" name="scholarship">
      <UInput v-model.number="state.scholarship" type="number" />
    </UFormGroup>

    <UButton type="submit">
      Generate Letter
    </UButton>
  </UForm>

  <UModal v-model="modalVisible">
    <UCard>
    <template #header>
      <div class="text-xl">
        Generated Letter
      </div>
    </template>
    <EditorContent :editor="editor" />

<template #footer>
    <UButton v-if="isSupported" @click="copyToClipboard">
        Copy to Clipboard
      </UButton>
</template>

</UCard>
  </UModal>
</template>