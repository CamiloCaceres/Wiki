import type{ Template, TemplateParams } from "~/types/template";


export const templates: Template[] = [
    // Generic Templates
    {
      title: "Generic Rejection",
      content: ({ userName }: TemplateParams) => `Dear Team,
  
Thank you for your assistance with this student's application. Unfortunately, we are unable to proceed further due to an unsuccessful GSR Assessment.
 Should you have any questions regarding this decision, please feel free to contact us.
  
 Kind regards,
  
${userName}`,
      process: "Generic",
      category: "Email",
      isInternal: false,
      requiredParams: ['userName'],
    },
    {
      title: "Confirm Decline",
      content: ({ userName }: TemplateParams) => `Hi team,
  
Thanks for confirming. We have declined the offer.
  
Kind regards,
${userName}`,
      process: "Generic",
      category: "Email",
      isInternal: false,
      requiredParams: ['userName'],
    },
    {
      title: "Release required",
      content: ({ userName }: TemplateParams) => `Dear team,
We have noticed that this student has an active CoE with a start date less than 6 months away from the requested course. 
Please seek approval to issue the OL with a release condition.
  
Best regards,
${userName}`,
      process: "Generic",
      category: "Email",
      isInternal: false,
      requiredParams: ['userName'],
    },
    {
      title: "Academic Alternative Entry",
      content: ({ userName }: TemplateParams) => `Dear team,
  
Thank you for your application to Torrens University Australia. 
  
Based on the assessment, the student does not meet the course entry requirements. If the student is willing to seek Special Entry, please kindly provide the completed Work/Life Experience Form together with a CV for further assessment. 
  
Kind Regards,
${userName}`,
      process: "Generic",
      category: "Email",
      isInternal: false,
      requiredParams: ['userName'],
    },
    {
      title: "LLN created",
      content: ({ userName }: TemplateParams) =>
     `We have already sent the login details for the L&N test to the student's personal email. Kindly let us know when the student completes the test so we can assess the result.`,
      process: "Generic",
      category: "Email",
      isInternal: false,
      requiredParams: ['userName'],
    },
    {
      title: "GSR condition",
      content: ({ userName }: TemplateParams) => `Please note that to proceed with the GSR assessment at this stage we will need:  
  •	Proof of how they will be financing her studies and stay in Australia: 3 months bank statement as a minimum showing transactions and/or Fixed deposits less than a year old, renewed accepted if the original provided. 
  •	If this is through a financial sponsor, we will also require proof of relationship - e.g. birth certificate or family card. 
  •	Source of income- e.g. employment contracts, tax return or pay slip - this must show the evidence of where the funds have come from.    
  
Upon successful completion of GSR screening the student can then progress to payment of the deposit`,
      process: "Generic",
      category: "Email",
      isInternal: false,
      requiredParams: ['userName'],
    },
    {
      title: "Handwritten Signature Required",
      content: ({ userName }: TemplateParams) => `Dear team,
  
Thank you for sharing the document.
To proceed with the CoE, we kindly request a handwritten signature on the offer letter. Unfortunately, we're unable to process typed, pasted, or computer-made signatures.
Could you please ask the student to:
  1.	Print the offer letter
  2.	Sign it by hand with a pen
  3.	Scan and return the signed document
We appreciate your help with this, and I look forward to receiving the updated document.
  
Kind regards,
${userName}`,
      process: "Generic",
      category: "Email",
      isInternal: false,
      requiredParams: ['userName'],
    },
    // Credit Transfer Templates
    {
      title: "Request Documents",
      content: ({ userName }: TemplateParams) => `Hi team,
  
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
      requiredParams: ['userName'],
    },
    {
      title: "Credit Transfer Submitted",
      content: ({ userName }: TemplateParams) => `Hi team,
  
Thanks for providing the requested documents. We have submitted the Credit Transfer and it is now under review.
  
Once we receive an outcome, we will gladly let you know and proceed accordingly.
  
Kind regards,
${userName}`,
      process: "Credit Transfer",
      category: "Email",
      isInternal: false,
      requiredParams: ['userName'],
    },
    {
      title: "Credit Transfer AP",
      content: ({ userName }: TemplateParams) => `Hi Team,
  
This student is requesting a Credit Transfer based on their previous studies. We have submitted the signed form, Academic Transcript and Subject Outlines.
Thanks in advance,
  
${userName}`,
      process: "Credit Transfer",
      category: "AP",
      isInternal: false,
      requiredParams: ['userName'],
    },
    {
      title: "Credit Transfer Rejected",
      content: ({ userName }: TemplateParams) => `Dear team,
        
The Credit Transfer request has been rejected; therefore, the offer letter will remain without credits.
        
Best regards,
${userName}`,
      process: "Credit Transfer",
      category: "Email",
      isInternal: false,
      requiredParams: ['userName'],
    },
    {
      title: "Approved Credit Transfer",
      content: ({ userName }: TemplateParams) => `Hi team,
  
The Credit Transfer request was approved. Attached to this email you will find the revised offer letter with credits and the duration revised.
  
Please let us know if there is anything else we can assist you with,
  
Kind regards,
${userName}`,
      process: "Credit Transfer",
      category: "Email",
      isInternal: false,
      requiredParams: ['userName'],
    },
  ];
// Utility Functions
export function renderTemplate(template: Template, params: TemplateParams): string {
    const missingParams = template.requiredParams.filter(param => !(param in params));
    if (missingParams.length > 0) {
      throw new Error(`Missing required parameters: ${missingParams.join(', ')}`);
    }
    return template.content(params);
  }
  
  export function getTemplatesByProcess(process: string): Template[] {
    return templates.filter((template) => template.process === process);
  }
  
  export function getTemplatesByCategory(category: 'AP' | 'Email'): Template[] {
    return templates.filter((template) => template.category === category);
  }
  
  export function searchTemplates(
    query: string,
    process?: string,
    category?: 'AP' | 'Email'
  ): Template[] {
    const lowercaseQuery = query.toLowerCase();
  
    return templates.filter((template) => {
      const matchesQuery =
        template.title.toLowerCase().includes(lowercaseQuery) ||
        renderTemplate(template, { userName: 'User' }).toLowerCase().includes(lowercaseQuery);
  
      const matchesProcess = !process || template.process === process;
      const matchesCategory = !category || template.category === category;
  
      return matchesQuery && matchesProcess && matchesCategory;
    });
  }
  
  export function advancedSearchTemplates(options: {
    query?: string;
    titleQuery?: string;
    contentQuery?: string;
    process?: string;
    category?: 'AP' | 'Email';
    isInternal?: boolean;
  }): Template[] {
    const { query, titleQuery, contentQuery, process, category, isInternal } = options;
  
    return templates.filter((template) => {
      const matchesGeneralQuery =
        !query ||
        template.title.toLowerCase().includes(query.toLowerCase()) ||
        renderTemplate(template, { userName: 'User' }).toLowerCase().includes(query.toLowerCase());
  
      const matchesTitleQuery =
        !titleQuery ||
        template.title.toLowerCase().includes(titleQuery.toLowerCase());
  
      const matchesContentQuery =
        !contentQuery ||
        renderTemplate(template, { userName: 'User' }).toLowerCase().includes(contentQuery.toLowerCase());
  
      const matchesProcess = !process || template.process === process;
      const matchesCategory = !category || template.category === category;
      const matchesInternal =
        isInternal === undefined || template.isInternal === isInternal;
  
      return (
        matchesGeneralQuery &&
        matchesTitleQuery &&
        matchesContentQuery &&
        matchesProcess &&
        matchesCategory &&
        matchesInternal
      );
    });
  }