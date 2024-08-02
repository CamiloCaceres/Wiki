import { type Template } from "~/types/template";

const requestDocumentsTemplate: Template = {
  title: "Request Documents",
  content: (userName: string) => `Hi team,

To submit a Credit Transfer request, we need the following documents:
1. Academic Transcript
2. Credit Transfer form (fully filled out and signed)
3. Subject outline for each subject the student wants to receive credit for

Kindly provide these documents so we can proceed with submitting the request.

Warm regards,
${userName}`,
  process: "Credit Transfer",
  category: "Email",
  isInternal: false,
};

const creditsSubmittedTemplate: Template = {
  title: "Credit Transfer Submitted",
  content: (userName: string) => `Hi team,

Thanks for providing the requested documents. We have submitted the Credit Transfer and it is now under review.

Once we receive an outcome, we will gladly let you know and proceed accordingly.

Kind regards,
${userName}`,
  process: "Credit Transfer",
  category: "Email",
  isInternal: false,
};

const creditTransferTemplateAP: Template = {
  title: "Credit Transfer AP",
  content: (userName: string) => `Hi Team,

This student is requesting a Credit Transfer based on their previous studies. We have submitted the signed form, Academic Transcript and Subject Outlines.
Thanks in advance,

${userName}`,
  process: "Credit Transfer",
  category: "AP",
  isInternal: false,
};

const creditTransferRejectedTemplate: Template = {
  title: "Credit Transfer Rejected",
  content: (userName: string) => `Dear team,

The Credit Transfer request has been rejected; therefore, the offer letter will remain without credits.

Best regards,
${userName}`,
  process: "Credit Transfer",
  category: "Email",
  isInternal: false,
};

const approvedCreditTransferTemplate: Template = {
  title: "Approved Credit Transfer",
  content: (userName: string) => `Hi team,

The Credit Transfer request was approved. Attached to this email you will find the revised offer letter with credits and the duration revised.

Please let us know if there is anything else we can assist you with,

Kind regards,
${userName}`,
  process: "Credit Transfer",
  category: "Email",
  isInternal: false,
};

export const creditTransferTemplates: Template[] = [
  requestDocumentsTemplate,
  creditsSubmittedTemplate,
  creditTransferTemplateAP,
  creditTransferRejectedTemplate,
  approvedCreditTransferTemplate,
];