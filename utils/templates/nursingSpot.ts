export const requestSpotEmail = (
    studentName: string,
    studentId: string,
    intake: string,
    campus: string,
    program: string,
    userName: string
  ) => `
  Hi Saifon, hope you are well!
  
  Kindly requesting your approval on a Bachelor of Nursing spot for the following student:
  
    1. Student Name: ${studentName}
    2. Student ID: ${studentId}
    3. Intake: ${intake}
    4. Campus: ${campus}
    5. Mode: ${program}
  
  Kind regards,
  ${userName}
  `;