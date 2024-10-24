export type VisaHistory = {
    type: string;
    grantDate: string;
    expiryDate: string;
    id?: string;
  };
  
export type CoEHistory = {
    course: string;
    institution: string;
    startDate: string;
    endDate: string;
    id?: string;
  };
  export interface FormState {
    id: string;
    isOnshore: boolean;
    isU18: boolean;
    academicTranscript: {
      received: boolean;
      certified: boolean;
      meets: boolean;
    };
    english: {
      received: boolean;
      meets: boolean;
    };
    passport: {
      received: boolean;
      certified: boolean;
    };
    visaType: string;
    visaExpiryDate: string;
    gsr: {
      formA: boolean;
      formB: boolean;
    };
    finalDeclaration: boolean;
    releaseCondition: boolean;
    requestedCT: boolean;
    visaHistory: VisaHistory[];
    coeHistory: CoEHistory[];
  }