export interface Condition {
  id: number;
  name: string;
  text: string;
  isNursing: boolean;
  isSelected: boolean;
}

export const conditionsFile: Condition[] = [
  {
    id: 1,
    name: 'English PG',
    text: 'Providing IELTS result score 6.5 (academic) with no skills band less than 6.0 or equivalent.',
    isNursing: false,
    isSelected: false,
  },
  {
    id: 2,
    name: 'English UG',
    text: 'Providing IELTS result score 6.0 (academic) with no skills band less than 5.5 or equivalent.',
    isNursing: false,
    isSelected: false,
  },
  {
    id: 3,
    name: 'English Nurse',
    text: 'Providing IELTS result score 7.0 (academic) with no skills band less than 7.0 or equivalent.',
    isNursing: true,
    isSelected: false,
  },
  {
    id: 4,
    name: 'GSR',
    text: 'Meeting the Genuine Student (GS) Requirement. No Confirmation of Enrolment (CoE) will be issued until a successful GS outcome has been recorded.',
    isNursing: false,
    isSelected: false,
  },
  {
    id: 5,
    name: 'Release',
    text: 'Providing release letter from principal course provider.',
    isNursing: false,
    isSelected: false,
  },
  {
    id: 6,
    name: 'EAP',
    text: 'Successful completion of EAP program at Torrens University Language Centre.',
    isNursing: false,
    isSelected: false,
  },
  {
    id: 7,
    name: 'CV',
    text: 'Providing Resume / CV Showing 3 years relevant working experience.',
    isNursing: false,
    isSelected: false,
  },
  {
    id: 8,
    name: 'Passport',
    text: 'Providing certified copy of the passport.',
    isNursing: false,
    isSelected: false,
  },
  {
    id: 9,
    name: 'Transcripts',
    text: 'Providing a certified copy of all academic documents (transcripts and completion certificates).',
    isNursing: false,
    isSelected: false,
  },
  {
    id: 10,
    name: 'LLN',
    text: 'Passing the Numeracy Component of the Language, Literacy and Numeracy (LLN) assessment. LLN assessment log in details has been sent to the student ',
    isNursing: true,
    isSelected: false,
  },
  {
    id: 11,
    name: 'NMBA',
    text: 'Providing signed Nursing and Midwifery Board of Australia English Language Skills Declaration (NMBA) Form',
    isNursing: true,
    isSelected: false,
  },
  {
    id: 12,
    name: 'capacity',
    text: 'Limited capacity at campus. Enrolment with the University is subject to space availability. COE will confirm enrolment once issued, subject to visa grant',
    isNursing: true,
    isSelected: false,
  },
  {
    id: 13,
    name: 'APRHA',
    text: 'Providing certified copy of the passport.',
    isNursing: true,
    isSelected: false,
  },
  {
    id: 14,
    name: 'Complete DoN',
    text: 'Successful completion of Diploma of Nursing at Think education.',
    isNursing: true,
    isSelected: false,
  },
  {
    id: 15,
    name: 'Credits',
    text: 'Upon completing Diploma of Nursing, course credits, duration and tuition fee will be revised and adjusted accordingly.',
    isNursing: true,
    isSelected: false,
  },
];