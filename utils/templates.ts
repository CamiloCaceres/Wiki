import type { Template, TemplateParams } from "~/types/template";

export const templates: Template[] = [
  // Generic Templates
  {
    title: "Generic Rejection",
    slug: "generic-rejection",
    content: ({ userName }: TemplateParams) => `Dear Team,
  
Thank you for your support with the application for this student. I regret to inform you that we will not be taking the application further due to unsuccessful GSR  Assessment.

If you have any questions regarding this case, please don’t hesitate to contact us.
  
Kind regards,
  
${userName}`,
    process: "Assessment",
    category: "Email",
    isInternal: false,
    requiredParams: ["userName"],
  },
  {
    title: "Confirm Decline",
    slug: "confirm-decline",
    content: ({ userName }: TemplateParams) => `Hi team,
  
Thanks for confirming. We have declined the offer.
  
Kind regards,
${userName}`,
    process: "Assessment",
    category: "Email",
    isInternal: false,
    requiredParams: ["userName"],
  },
  {
    title: "Release required",
    slug: "release-required",
    content: ({ userName }: TemplateParams) => `Dear team,
We have noticed that this student has an active CoE with a start date less than 6 months away from the requested course. 
Please seek Petra's approval to issue the OL with a release condition.
  
Best regards,
${userName}`,
    process: "Assessment",
    category: "Email",
    isInternal: false,
    requiredParams: ["userName"],
  },
  {
    title: "Academic Alternative Entry",
    slug: "academic-alternative-entry",
    content: ({ userName }: TemplateParams) => `Dear team,
Thanks for the application. Upon reviewing student documents, the Bachelor's award certificate is equivalent to an associate degree in Australia. To proceed we need to raise a special entry request to the Program Director, please provide the following:
    •	CV
    •	Work experience letters
    •	Attached form fully completed and signed

${userName}`,
    process: "Assessment",
    category: "Email",
    isInternal: false,
    requiredParams: ["userName"],
  },
  {
    title: "Academic Alternative Entry AP",
    slug: "academic-alternative-entry-ap",
    content: ({ userName }: TemplateParams) => `Dear team,
This student's qualifications are not equivalent to a Bachelor in Australia. Therefore, they are looking for an Alternative Entry. The documents have been submitted (form and cv).
Thanks in advance,
Kind regards,
${userName}`,
    process: "Assessment",
    category: "AP",
    isInternal: true,
    requiredParams: ["userName"],
  },
  {
    title: "GSR condition",
    slug: "gsr-condition",
    content: ({
      userName,
    }: TemplateParams) => `Please note that to proceed with the GSR assessment at this stage we will need:  
  •	Proof of how they will be financing her studies and stay in Australia: 3 months bank statement as a minimum showing transactions and/or Fixed deposits less than a year old, renewed accepted if the original provided. 
  •	If this is through a financial sponsor, we will also require proof of relationship - e.g. birth certificate or family card. 
  •	Source of income- e.g. employment contracts, tax return or pay slip - this must show the evidence of where the funds have come from.    
  
Upon successful completion of GSR screening the student can then progress to payment of the deposit`,
    process: "Assessment",
    category: "Email",
    isInternal: false,
    requiredParams: ["userName"],
  },
  {
    title: "Handwritten Signature Required",
    slug: "handwritten-signature-required",
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
    process: "CoE",
    category: "Email",
    isInternal: false,
    requiredParams: ["userName"],
  },
  // Credit Transfer Templates
  {
    title: "Request Documents",
    slug: "request-documents",
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
    requiredParams: ["userName"],
  },
  {
    title: "Credit Transfer Submitted",
    slug: "credit-transfer-submitted",
    content: ({ userName }: TemplateParams) => `Hi team,
  
Thanks for providing the requested documents. We have submitted the Credit Transfer and it is now under review.
  
Once we receive an outcome, we will gladly let you know and proceed accordingly.
  
Kind regards,
${userName}`,
    process: "Credit Transfer",
    category: "Email",
    isInternal: false,
    requiredParams: ["userName"],
  },
  {
    title: "Credit Transfer AP",
    slug: "credit-transfer-ap",
    content: ({ userName }: TemplateParams) => `Hi Team,
  
This student is requesting a Credit Transfer based on their previous studies. We have submitted the signed form, Academic Transcript and Subject Outlines.
Thanks in advance,
  
${userName}`,
    process: "Credit Transfer",
    category: "AP",
    isInternal: false,
    requiredParams: ["userName"],
  },
  {
    title: "Credit Transfer Rejected",
    slug: "credit-transfer-rejected",
    content: ({ userName }: TemplateParams) => `Dear team,
        
The Credit Transfer request has not been approved; therefore, the offer letter will remain without credits.
        
Best regards,
${userName}`,
    process: "Credit Transfer",
    category: "Email",
    isInternal: false,
    requiredParams: ["userName"],
  },
  {
    title: "Approved Credit Transfer",
    slug: "approved-credit-transfer",
    content: ({ userName }: TemplateParams) => `Hi team,
  
The Credit Transfer request is approved. Please find attached the revised offer letter with credits and the duration revised.
  
Please let us know if there is anything else we can assist you with,
  
Kind regards,
${userName}`,
    process: "Credit Transfer",
    category: "Email",
    isInternal: false,
    requiredParams: ["userName"],
  },
  // Nursing Templates
  {
    title: "LLN created",
    slug: "lln-created",
    content: ({}: TemplateParams) =>
      `We have already sent the login details for the L&N test to the student's personal email. Kindly let us know when the student completes the test so we can assess the result.`,
    process: "Nursing",
    category: "Email",
    isInternal: false,
    requiredParams: ["userName"],
  },
  {
    title: "nursing spot",
    slug: "nursing-spot",
    content: ({ studentName, studentId, intake, campus, program, userName }) =>
      `Hi Saifon,
        
I'm seeking spot approval on a Bachelor of Nursing spot for the student ${studentName} - ${studentId} for ${intake}, ${campus} - ${program}
  
Kind regards,
${userName}`,
    process: "Nursing",
    category: "Email",
    isInternal: true,
    requiredParams: [
      "studentName",
      "studentId",
      "intake",
      "campus",
      "program",
      "userName",
    ],
  },
  {
    title: "Offshore New Application",
    slug: "offshore-new-application",
    content: (params: TemplateParams) => `Hello team,
I hope this message finds you well. Please find the new Offshore application for T1, 2025.
Kindly confirm if we can issue the offer letter for this applicant.
  
Best regards,
${params.userName}
    `,
    process: "Assessment",
    category: "AP",
    isInternal: true,
    requiredParams: ["userName"],
  },
  {
    title: "AP: Special Entry - Accounting",
    slug: "special-entry-accounting",
    content: ({ userName }: TemplateParams) => `Hi Ajay,
This student didn't study Maths in Year 12 so we are seeking special entry.
Please let us know if we can proceed with this case.

Best regards,
${userName}`,
    process: "Assessment",
    category: "AP",
    isInternal: true,
    requiredParams: ["userName"],
  },
];
// Utility Functions
export function renderTemplate(
  template: Template,
  params: TemplateParams
): string {
  const missingParams = template.requiredParams.filter(
    (param) => !(param in params)
  );
  if (missingParams.length > 0) {
    throw new Error(`Missing required parameters: ${missingParams.join(", ")}`);
  }
  return template.content(params);
}

export function getTemplatesByProcess(process: string): Template[] {
  return templates.filter((template) => template.process === process);
}

export function getTemplatesByCategory(category: "AP" | "Email"): Template[] {
  return templates.filter((template) => template.category === category);
}

export function searchTemplates(
  query: string,
  process?: string,
  category?: "AP" | "Email"
): Template[] {
  const lowercaseQuery = query.toLowerCase();

  return templates.filter((template) => {
    const matchesQuery =
      template.title.toLowerCase().includes(lowercaseQuery) ||
      renderTemplate(template, { userName: "User" })
        .toLowerCase()
        .includes(lowercaseQuery);

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
  category?: "AP" | "Email";
  isInternal?: boolean;
}): Template[] {
  const { query, titleQuery, contentQuery, process, category, isInternal } =
    options;

  return templates.filter((template) => {
    const matchesGeneralQuery =
      !query ||
      template.title.toLowerCase().includes(query.toLowerCase()) ||
      renderTemplate(template, { userName: "User" })
        .toLowerCase()
        .includes(query.toLowerCase());

    const matchesTitleQuery =
      !titleQuery ||
      template.title.toLowerCase().includes(titleQuery.toLowerCase());

    const matchesContentQuery =
      !contentQuery ||
      renderTemplate(template, { userName: "User" })
        .toLowerCase()
        .includes(contentQuery.toLowerCase());

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
