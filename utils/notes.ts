// utils/noteUtils.ts

import type {
  FormState,
  VisaHistory,
  CoEHistory,
  WorkHistory,
  AcademicHistory,
} from "@/types/notes";

export function generateNote(formState: FormState): string {
  const sections = [
    generateDocumentSection(formState),
    generateVisaSection(formState),
    generateFormsSection(formState),
    generateHistorySection(formState),
  ];

  return sections
    .filter(Boolean) // Remove empty sections
    .join("\n\n")
    .trim()
    .replace(/^\s*[\r\n]/gm, "");
}

function generateDocumentSection(formState: FormState): string {
  return `📋 STUDENT APPLICATION STATUS
==============================

📄 DOCUMENT CHECKLIST:
----------------------
📜 Academic Transcript:  ${formatTranscriptStatus(formState.academicTranscript)}
🔤 English Proficiency:  ${formatEnglishStatus(formState.english)}
🛂 Passport:             ${formatPassportStatus(formState.passport)}`;
}

function generateVisaSection(formState: FormState): string {
  if (!formState.visaType || !formState.isOnshore) return "";

  return `---------------------    
🛄 VISA INFORMATION:
--------------------
Type: ${formState.visaType}${
    formState.visaExpiryDate ? `\nExpiry: ${formState.visaExpiryDate}` : ""
  }`;
}

function generateFormsSection(formState: FormState): string {
  const sections = [
    `---------------------    
📝 FORMS AND DOCUMENTS:
----------------------
Final Declaration: ${formState.finalDeclaration ? "✅ Received" : "⏳ Pending"}
Part A: ${formState.gsr.formA ? "✅ Received" : "⏳ Awaiting"}
Part B: ${formState.gsr.formB ? "✅ Accepted" : "⏳ Pending"}`,
  ];

  if (formState.requestedCT) {
    sections.push(`---------------------    
🟠 Requested Credits`);
  }

  if (formState.releaseCondition) {
    sections.push("❗ Requires approval to issue OL with release condition");
  }
  if (formState.isU18) {
    sections.push("❗ Student is under 18");
  }

  return sections.join("\n\n");
}

function generateHistorySection(formState: FormState): string {
  const sections: string[] = [];

  if (formState.coeHistory.length > 0) {
    sections.push(`---------------------    
📜 COE HISTORY: 
---------------------
${formState.coeHistory
  .map(
    (coe: CoEHistory) =>
      `${coe.course} at ${coe.institution} from ${coe.startDate} to ${coe.endDate}`
  )
  .join("\n")}`);
  }

  if (formState.visaHistory.length > 0) {
    sections.push(`---------------------    
📜 VISA HISTORY:
---------------------
${formState.visaHistory
  .map((visa: VisaHistory) => `Type: ${visa.type}, Expiry: ${visa.expiryDate}`)
  .join("\n")}`);
  }
  if (formState.workHistory.length > 0) {
    sections.push(`---------------------    
💼 WORK HISTORY:
---------------------
${formState.workHistory
  .map(
    (work: WorkHistory) =>
      `${work.company} - ${work.position} from ${work.startDate} to ${work.endDate}`
  )
  .join("\n")}`);
  }
  if (formState.academicHistory.length > 0) {
    sections.push(`---------------------    
📜 ACADEMIC HISTORY:
---------------------
${formState.academicHistory
  .map(
    (academic: AcademicHistory) =>
      `${academic.course} at ${academic.institution} from ${academic.startDate} to ${academic.endDate}`
  )
  .join("\n")}`);
  }

  return sections.join("\n\n");
}

function formatTranscriptStatus(transcript: {
  received: boolean;
  certified: boolean;
  meets: boolean;
}): string {
  return `${transcript.received ? "✅ Received" : "❌ Not Received"}${
    transcript.received
      ? `  ${transcript.certified ? "✅ Certified" : "❌ Not Certified"}  ${
          transcript.meets ? "✅ Meets" : "❌ Does not meet"
        }`
      : ""
  }`;
}

function formatEnglishStatus(english: {
  received: boolean;
  meets: boolean;
}): string {
  return `${english.received ? "✅ Received" : "❌ Not Received"}${
    english.received
      ? `  ${english.meets ? "✅ Meets" : "❌ Does not meet"}`
      : ""
  }`;
}

function formatPassportStatus(passport: {
  received: boolean;
  certified: boolean;
}): string {
  return `${passport.received ? "✅ Received" : "❌ Not Received"}${
    passport.received
      ? `  ${passport.certified ? "✅ Certified" : "❌ Not Certified"}`
      : ""
  }`;
}
