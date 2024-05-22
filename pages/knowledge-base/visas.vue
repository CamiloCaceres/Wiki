<template>
  <h2 class="font-bold text-2xl mb-8">
    New Visa information for Onshore students
  </h2>

  <div class="grid grid-cols-1 gap-8">
    <div v-for="visa in visas">
      <UCard>
        <template #header>
          <h2 class="font-semibold text-xl mb-4">
            Onshore Students on Visa {{ visa.visaNumber }}
          </h2>
        </template>
        <div class="whitespace-pre-line">{{ visa.text }}</div>
        <template #footer>
          <div class="flex items-center justify-end space-x-4">
            <UButton
            v-if="visa.emailTemplate"
              variant="soft"
              trailing
              icon="i-heroicons-clipboard-document"
              @click="copyEmail(visa.emailTemplate)"
              >Rejection email to Sales</UButton
            >
            <UButton
              variant="soft"
              trailing
              icon="i-heroicons-clipboard-document"
              @click="copyEmail(rejectionEmailToAgent)"
              >Rejection email to agency</UButton
            >
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>

<script setup>
import { useClipboard } from "@vueuse/core";

const { copy, copied } = useClipboard();

const copyEmail = (text) => {
  copy(text);
};

const rejectionEmailToAgent = `
Hi team,

We appreciate your interest in our services and the time you invested in submitting the application. However, we regret to inform you that after careful consideration, we have decided to reject the application. Our internal review process has identified potential concerns with the GSR that prevent us from proceeding further at this time.

Kind regards,

`;

const visas = reactive([
  {
    visaNumber: "408",
    text: `If you have a student on a Covid visa (408), you will have to reject 99% of the cases. The reason for this is that one of the reasons COVID visas were granted was for students to save money by working legally in Australia so they could return home. Of course, 99% of the applicants said they were in financial hardship and got the visa but didn't leave.

The only time you're probably going to accept a student on a COVID visa is if they are a jewel. For example, students who got COVID visas to work in the frontline during the pandemic and some institutions or government-sponsored visas. Something quite rare to find.


In any other case that you think they might come in, you'll need to ask what was the reason for applying for a COVID visa (probably will be financial hardship), and ask for financial documents (bank statements from the last 3 months). If the student does not have upwards of $100,000 in their account, reject the case.`,
    emailTemplate: `Hi team,

We are currently not processing visas 408 unless specific circumstances, not met by this student. Due to this, we are rejecting this application.

Thanks for understanding,
Kind regards,`,
  },
  {
    visaNumber: "600",
    text: ` Basically out the window. You cannot process anything for these students. If they are offshore we will have no control over what they do and they might go and apply onshore and will be refused. So nothing for anyone on a tourist visa, please. You can tell Sales we are not processing these at the moment.`,
    emailTemplate: `Hi team,
    We are currently not processing any visa 600 applications. Due to this, we are rejecting the application.

    Thanks for understanding. 

Best regards, `,
  },
  {
    visaNumber: "485",
    text: ` These are a bit easier. If the visa is expiring in the next few months and the student will be requiring a COE to apply for a new student visa; please continue as you have been doing: Check their entire history.

If the visa will last them a lot of time, you don't need to worry. This visa has no limitations on study and the student won't need a COE anyway.`,
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
