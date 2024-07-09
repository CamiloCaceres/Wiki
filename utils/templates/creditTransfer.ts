export interface CreditTransferTemplate {
    title: string;
    content: (userName: string) => string;
    process: string;
    category: 'AP' | 'Email';
  }
  
  const requestDocumentsTemplate: CreditTransferTemplate = {
    title: 'Request Documents',
    content: (userName: string) => `
  Hi team,
  
  To submit a Credit Transfer request, we need the following documents:
  1. Academic Transcript
  2. Credit Transfer form (fully filled out and signed)
  3. Subject outline for each subject the student wants to receive credit for
  
  Kindly provide these documents so we can proceed with submitting the request.
  
  Warm regards,
  ${userName}
  `,
    process: 'Credit Transfer',
    category: 'Email',
  };
  
  const creditsSubmittedTemplate: CreditTransferTemplate = {
    title: 'Credit Transfer Submitted',
    content: (userName: string) => `
  Hi team,
  
  Thanks for providing the requested documents. We have submitted the Credit Transfer and it is now under review.
  
  Once we receive an outcome, we will gladly let you know and proceed accordingly.
  
  Kind regards,
  ${userName}
  `,
    process: 'Credit Transfer',
    category: 'Email',
  };
  
  const requestCreditTransferTemplate: CreditTransferTemplate = {
    title: 'Credit Transfer AP',
    content: (userName: string) => `
  Hi Team,
  
  This student is requesting a Credit Transfer based on their previous studies. We have submitted the signed form, Academic Transcript and Subject Outlines.
  
  Thanks in advance,
  ${userName}
  `,
    process: 'Credit Transfer',
    category: 'AP',
  };
  
  export const creditTransferTemplates: CreditTransferTemplate[] = [
    requestDocumentsTemplate,
    creditsSubmittedTemplate,
    requestCreditTransferTemplate,
  ];