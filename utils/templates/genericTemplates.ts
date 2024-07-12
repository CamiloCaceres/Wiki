import {type Template } from "~/types/template";

const genericRejection: Template = {
    title: 'Generic Rejection',
    content: (userName: string) => `
Dear Team,

Thank you for your assistance with this student's application. Unfortunately, we are unable to proceed further due to an unsuccessful GSR Assessment.
Should you have any questions regarding this decision, please feel free to contact us.

Kind regards,

${userName}
  `,
    process: 'Generic',
    category: 'Email',
    isInternal: false
  };

  
const confirmDecline: Template = {
    title: 'Confirm Decline',
    content: (userName: string) => `
Hi team,

Thanks for confirming. We have declined the offer.

Kind regards,
${userName}
  `,
    process: 'Generic',
    category: 'Email',
    isInternal: false
  };

  export const genericTemplates: Template[] = [
    genericRejection,
    confirmDecline
  ];