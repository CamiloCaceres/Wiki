import { type Template } from "~/types/template";

const genericRejection: Template = {
  title: "Generic Rejection",
  content: (userName: string) => `Dear Team,

Thank you for your assistance with this student's application. Unfortunately, we are unable to proceed further due to an unsuccessful GSR Assessment.
Should you have any questions regarding this decision, please feel free to contact us.

Kind regards,

${userName}`,
  process: "Generic",
  category: "Email",
  isInternal: false,
};

const confirmDecline: Template = {
  title: "Confirm Decline",
  content: (userName: string) => `Hi team,

Thanks for confirming. We have declined the offer.

Kind regards,
${userName}`,
  process: "Generic",
  category: "Email",
  isInternal: false,
};

const releaseRequired: Template = {
  title: "Release required",
  content: (userName: string) => `Dear team,
We have noticed that this student has an active CoE with a start date less than 6 months away from the requested course. 
Please seek approval to issue the OL with a release condition.

Best regards,
${userName}`,
  process: "Generic",
  category: "Email",
  isInternal: true,
};

const specialEntry: Template = {
  title: "Academic Alternative Entry",
  content: (userName: string) => `Dear team,

Thank you for your application to Torrens University Australia. 

Based on the assessment, the student does not meet the course entry requirements. If the student is willing to seek Special Entry, please kindly provide the completed Work/Life Experience Form together with a CV for further assessment. 

Kind Regards,
${userName}`,
  process: "Generic",
  category: "Email",
  isInternal: false,
};

export const genericTemplates: Template[] = [
  genericRejection,
  confirmDecline,
  releaseRequired,
  specialEntry,
];