<template>
  <h1 class="font-bold text-2xl mb-4">Knowledge Base</h1>
  <h2 class="font-semibold text-xl mb-4">
    New Visa information for Onshore students
  </h2>

  <div v-for="visa in visas">
    <UCard>
      <template #header>
        <h2 class="font-semibold text-xl mb-4">
          Onshore Students on Visa {{ visa.visaNumber }}
        </h2>
      </template>
      <div class="whitespace-pre-line">{{ visa.text }}</div>
      <template #footer>
        <UButton @click="copyEmail(visa.emailTemplate)"
          >Copy email template</UButton
        >
      </template>
    </UCard>
  </div>
</template>

<script setup>
import { useClipboard } from "@vueuse/core";

const { copy } = useClipboard();

const copyEmail = (text) => {
  copy(text);
};

const visas = reactive([
  {
    visaNumber: "408 and 600",
    text: `- These requirements are directed only to the sales owner.
    - If Sales asks to reconsider a rejection, they need approval from Tamara. Otherwise, reject.
- Handle these cases at level 3, similar to subcontinent cases.
- Approved onshore students must have the GSR condition on their offer.
- GSR condition is the same as GTE, just changing two letters.
- For financials, check they have sufficient funds for their time in Australia.
- SOP/final GSR approval will be handled by the speaker or onshore team currently, but start reviewing SOPs based on the template and Carolina Bailey's key points.`,
    emailTemplate: `As the student is currently on a 408 visa, we require the following additional documents to proceed with the application process:

Certified copies of any previous Student Visa(s) held.
Certified copies of all Confirmations of Enrolment (CoEs) that the previous Student Visa(s) were granted based on.
Certified copies of study proofs matching the provided CoEs.
Justification for any gap period after graduation, including employment letter(s) and payslips, if applicable.
Please kindly provide the requested documents at your earliest convenience, so we can move forward with processing the application.

Your cooperation is highly appreciated.



Best regards, `,
  },
  {
    visaNumber: "500",
    text: `- Check visa expiry date (if 6 months or more, good to proceed)- Check if transitioning from VET to HE course or vice versa
- Check for gaps in education or extended duration of stay in Australia
- Check age and treat with suspicion if:Undergraduate course and age 25 or older; Postgraduate course and age 35 or older
- Check onshore study progress and completion details
- Request additional information if needed (SOP, financial documents, proof of study, etc.)`,
  },
]);
</script>
