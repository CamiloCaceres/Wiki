import type {
  FormState,
  VisaHistory,
  CoEHistory,
  WorkHistory,
  AcademicHistory,
} from "@/types/notes";

interface FormatOptions {
  useEmojis?: boolean;
}

export function generateNote(formState: FormState, options: FormatOptions = { useEmojis: true }): string {
  const sections = [
    generateDocumentSection(formState, options),
    generateVisaSection(formState, options),
    generateFormsSection(formState, options),
    generateHistorySection(formState, options),
  ];

  return sections
    .filter(Boolean)
    .join("\n\n")
    .trim()
    .replace(/^\s*[\r\n]/gm, "");
}

function generateDocumentSection(formState: FormState, { useEmojis }: FormatOptions): string {
  const prefix = useEmojis ? "📋 " : "";
  const docPrefix = useEmojis ? "📄 " : "";
  const transcriptPrefix = useEmojis ? "📜 " : "";
  const englishPrefix = useEmojis ? "🔤 " : "";
  const passportPrefix = useEmojis ? "🛂 " : "";

  return `${prefix}STUDENT APPLICATION STATUS
==============================

${docPrefix}DOCUMENT CHECKLIST:
----------------------
${transcriptPrefix}Academic Transcript:  ${formatTranscriptStatus(formState.academicTranscript, { useEmojis })}
${englishPrefix}English Proficiency:  ${formatEnglishStatus(formState.english, { useEmojis })}
${passportPrefix}Passport:             ${formatPassportStatus(formState.passport, { useEmojis })}`;
}

function generateVisaSection(formState: FormState, { useEmojis }: FormatOptions): string {
  if (!formState.visaType || !formState.isOnshore) return "";

  const prefix = useEmojis ? "🛄 " : "";

  return `---------------------    
${prefix}VISA INFORMATION:
--------------------
Type: ${formState.visaType}${
    formState.visaExpiryDate ? `\nExpiry: ${formState.visaExpiryDate}` : ""
  }`;
}

function generateFormsSection(formState: FormState, { useEmojis }: FormatOptions): string {
  const formPrefix = useEmojis ? "📝 " : "";
  const warningPrefix = useEmojis ? "❗ " : "! ";
  const creditPrefix = useEmojis ? "🟠 " : "";

  const sections = [
    `---------------------    
${formPrefix}FORMS AND DOCUMENTS:
----------------------
Final Declaration: ${formatStatus(formState.finalDeclaration, { useEmojis })}
Part A: ${formatStatus(formState.gsr.formA, { useEmojis })}
Part B: ${formatStatus(formState.gsr.formB, { useEmojis })}`,
  ];

  if (formState.requestedCT) {
    sections.push(`---------------------    
${creditPrefix}Requested Credits`);
  }

  if (formState.releaseCondition) {
    sections.push(`${warningPrefix}Requires approval to issue OL with release condition`);
  }
  if (formState.isU18) {
    sections.push(`${warningPrefix}Student is under 18`);
  }

  return sections.join("\n\n");
}

function generateHistorySection(formState: FormState, { useEmojis }: FormatOptions): string {
  const sections: string[] = [];
  const historyPrefix = useEmojis ? "📜 " : "";
  const workPrefix = useEmojis ? "💼 " : "";

  if (formState.coeHistory.length > 0) {
    sections.push(`---------------------    
${historyPrefix}COE HISTORY: 
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
${historyPrefix}VISA HISTORY:
---------------------
${formState.visaHistory
  .map((visa: VisaHistory) => `Type: ${visa.type}, Expiry: ${visa.expiryDate}`)
  .join("\n")}`);
  }
  if (formState.workHistory.length > 0) {
    sections.push(`---------------------    
${workPrefix}WORK HISTORY:
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
${historyPrefix}ACADEMIC HISTORY:
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

function formatStatus(status: boolean, { useEmojis }: FormatOptions): string {
  if (useEmojis) {
    return status ? "✅ Received" : "⏳ Pending";
  }
  return status ? "[X] Received" : "[ ] Pending";
}

function formatTranscriptStatus(
  transcript: {
    received: boolean;
    certified: boolean;
    meets: boolean;
  },
  { useEmojis }: FormatOptions
): string {
  const check = useEmojis ? "✅" : "[X]";
  const cross = useEmojis ? "❌" : "[ ]";

  return `${transcript.received ? `${check} Received` : `${cross} Not Received`}${
    transcript.received
      ? `  ${transcript.certified ? `${check} Certified` : `${cross} Not Certified`}  ${
          transcript.meets ? `${check} Meets` : `${cross} Does not meet`
        }`
      : ""
  }`;
}

function formatEnglishStatus(
  english: {
    received: boolean;
    meets: boolean;
  },
  { useEmojis }: FormatOptions
): string {
  const check = useEmojis ? "✅" : "[X]";
  const cross = useEmojis ? "❌" : "[ ]";

  return `${english.received ? `${check} Received` : `${cross} Not Received`}${
    english.received
      ? `  ${english.meets ? `${check} Meets` : `${cross} Does not meet`}`
      : ""
  }`;
}

function formatPassportStatus(
  passport: {
    received: boolean;
    certified: boolean;
  },
  { useEmojis }: FormatOptions
): string {
  const check = useEmojis ? "✅" : "[X]";
  const cross = useEmojis ? "❌" : "[ ]";

  return `${passport.received ? `${check} Received` : `${cross} Not Received`}${
    passport.received
      ? `  ${passport.certified ? `${check} Certified` : `${cross} Not Certified`}`
      : ""
  }`;
}