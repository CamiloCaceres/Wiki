<template>
  <h1 class="font-bold text-2xl mb-4">Credit Transfer Guide</h1>
  <h3 class="text-lg font-semibold mb-2">Requirements</h3>
  <p>The credit transfer requires:</p>
  <ol class="list-disc list-inside mb-4">
    <li>Academic Transcript</li>
    <li>Credit Transfer form (fully filled out and signed)</li>
    <li>
      Subject outline for each subject the student wants to receive credit for
    </li>
  </ol>

  <h3 class="text-lg font-semibold mb-2">CRM steps:</h3>
  <ol class="list-decimal list-inside mb-4">
    <li>Go to student's enrollment</li>
    <li>Create new academic process</li>
    <li>Upload all documents (not as zip)</li>
    <li>
      Select
      <NuxtLink
        class="text-green-500 underline"
        to="https://laureateaus-my.sharepoint.com/:x:/r/personal/aphillipou_torrens_edu_au/_layouts/15/doc2.aspx?sourcedoc=%7BF5C2120C-FEAA-4E7F-951D-1D8E5D577ECF%7D&file=Program%20Director%20Master%20file%2C%20AP%20assessment.xlsx&action=default&mobileredirect=true&DefaultItemOpen=1"
        target="_blank"
      >
        Program Director
      </NuxtLink>
    </li>
    <li>Fill Overview and Recommendation (from template)</li>
    <li>Click "Submit for Approval"</li>
  </ol>
  <h3 class="text-lg font-semibold mb-2">After submitting AP</h3>
  <ol class="list-disc list-inside mb-4">
    <li>Tag email with "AP raised"</li>
    <li>Send confirmation email</li>
  </ol>

  <h3 class="text-lg font-semibold mb-2">Once approved</h3>
  <ol class="list-disc list-inside mb-4">
    <li>Check if Credits were applied correctly in enrolled subjects (they should appear as Credit Transfer)</li>
    <li>If they were not applied, check the file left by PD and manually change the approved subjects to "Credit Transfer"</li>
    <li>Change course duration, total sudy periods and finalization date</li>
    <li>Issue offer letter, check if credits appear on the OL and send new email with credits.</li>
  </ol>
  <UButton to="/email-templates/credit-transfer">Go to CT templates</UButton>
</template>
