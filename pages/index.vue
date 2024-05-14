<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-semibold mb-4 text-center">Admissions Wiki</h1>
    <p class="text-xl mb-8 text-center">Love what you do 🫰</p>


    <div>
      <h2>Updates:</h2>
      <EditorContent :editor="editor" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const router = useRouter();


const editor = useEditor({
  editable: false,
  content: `<html>
<body>
<h2>Important:</h2>
<ol>
  <li>You can follow up on your APs. The PDs should not take more than 2 or 3 days to answer. Maximum one week. If they take longer, please write to them for a follow-up.</li>
  <li>Likewise, for those with awaiting deposits, if the payment receipt arrived more than 3-5 days ago, you must write to Finance asking them to please find the money in order to issue the CoE.</li>
  <li>NO COEs or Offers to be issued before July for level 3 countries that are Offshore (Nepal, Pakistan, and India) unless they have approval from Tamara or the student has the VISA granted.</li>
  <li>The problem with the new apps is already improving, most of them work, and those that don't are already classified, but if you find one that doesn't work, please leave the tag Awaiting Study Link App and send that application to Carolina.
    <ol>
      <li>If the app is not working, tag it as Awaiting Study Link App.</li>
      <li>Send the application to Carolina.</li>
    </ol>
  </li>
  <li>OSHC 2024 is active in CRM. You can continue using the same OSHC calculator, this is no longer necessary to change, nor will a new file arrive, when you make deferrals don't forget to adjust the OSHC dates.</li>
  <li>Have you already activated your IELTS account?</li>
  <li>TULC courses for 2026 are already available!</li>
</ol>
</body>
</html>`,
  extensions: [
    StarterKit,
  ],
  editorProps: {
    attributes: {
      class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-base xl:prose-base m-5 focus:outline-none h-20',
    },
  },
})
  const updates = `You can follow up on your APs. The PDs should not take more than 2 or 3 days to answer. Maximum one week. If they take longer, please write to them for a follow-up.

  Likewise, for those with awaiting deposits, if the payment receipt arrived more than 3-5 days ago, you must write to Finance asking them to please find the money in order to issue the CoE.
NO COEs or Offers to be issued before July for level 3 countries that are Offshore (Nepal, Pakistan, and India) unless they have approval from Tamara or the student has the VISA granted.
The problem with the new apps is already improving, most of them work, and those that don't are already classified, but if you find one that doesn't work, please leave the tag Awaiting Study Link App and send that application to Carolina.
OSHC 2024 is active in CRM. You can continue using the same OSHC calculator, this is no longer necessary to change, nor will a new file arrive, when you make deferrals don't forget to adjust the OSHC dates.
Have you already activated your IELTS account?
TULC courses for 2026 are already available!`
</script>