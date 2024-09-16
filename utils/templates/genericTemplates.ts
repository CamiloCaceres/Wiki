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

const llnCreated: Template = {
  title: "LLN created",
  content: (userName: string) => `We have already sent the login details for the L&N test to the student's personal email. Kindly let us know when the student completes the test so we can assess the result.`,
  process: "Generic",
  category: "Email",
  isInternal: false,
};

const gsrCondition: Template = {
  title: "GSR condition",
  content: (userName: string) => `Please note that to proceed with the GSR assessment at this stage we will need:  
•	Proof of how they will be financing her studies and stay in Australia: 3 months bank statement as a minimum showing transactions and/or Fixed deposits less than a year old, renewed accepted if the original provided. 
•	If this is through a financial sponsor, we will also require proof of relationship - e.g. birth certificate or family card. 
•	Source of income- e.g. employment contracts, tax return or pay slip - this must show the evidence of where the funds have come from.    

Upon successful completion of GSR screening the student can then progress to payment of the deposit`,
  process: "Generic",
  category: "Email",
  isInternal: false,
};
export const genericTemplates: Template[] = [
  genericRejection,
  confirmDecline,
  releaseRequired,
  specialEntry,
  llnCreated,
  gsrCondition,
];