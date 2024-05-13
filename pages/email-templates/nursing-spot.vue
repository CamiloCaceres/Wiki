<!-- NursingSpotApproval.vue -->
<template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
       name: {{ userName }}
        <UFormGroup label="Student Name" name="studentName">
            <UInput v-model="state.studentName" />
        </UFormGroup>

        <UFormGroup label="Student ID" name="studentId">
            <UInput v-model="state.studentId" />
        </UFormGroup>

        <UFormGroup label="Intake" name="intake">
            <UInput v-model="state.intake" />
        </UFormGroup>

        <UFormGroup label="Campus" name="campus">
            <UInput v-model="state.campus" />
        </UFormGroup>

        <UFormGroup label="EN or BN" name="program">
            <USelect v-model="state.program"  :options="programs"/>
        </UFormGroup>

        <UButton type="submit">
            Generate Email 
        </UButton>
    </UForm>

    <UModal v-model="modalVisible">
        <UCard>
            <template #header>
                <div class="text-xl">
                    Generated Email
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

<script setup lang="ts">
import { z } from 'zod'
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
            console.log('Email copied to clipboard!')
        } catch (error) {
            console.error('Failed to copy email to clipboard:', error)
        }
    }
}

const schema = z.object({
    studentName: z.string().min(1, 'Student name is required'),
    studentId: z.string().min(1, 'Student ID is required'),
    intake: z.string().min(1, 'Intake is required'),
    campus: z.string().min(1, 'Campus is required'),
    program: z.enum(['EN', 'BN'])
})

type Schema = z.output<typeof schema>

const programs = ['EN', 'BN']

const state = reactive({
    studentName: undefined,
    studentId: undefined,
    intake: undefined,
    campus: undefined,
    program: undefined
})

const modalVisible = ref(false)
const editor = useEditor({
    editable: false,
    content: '',
    extensions: [
        StarterKit,
    ],
})

async function onSubmit(event) {
    const emailContent = `
      <p>Hi Saki, hope you are well!</p>
      <p>Kindly requesting your approval on a Bachelor of Nursing spot for the following student:</p>
      <ol>
        <li>Student Name: <strong>${state.studentName}</strong></li>
        <li>Student ID: <strong>${state.studentId}</strong></li>
        <li>Intake: <strong>${state.intake}</strong></li>
        <li>Campus: <strong>${state.campus}</strong></li>
        <li>${state.program === 'EN' ? 'EN' : 'BN'}</li>
      </ol>
      <p>Kind regards,</p>
    `
    editor.value?.commands.setContent(emailContent)
    modalVisible.value = true
}
</script>