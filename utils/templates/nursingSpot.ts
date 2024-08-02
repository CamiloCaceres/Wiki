export const requestSpotEmail = (
    studentName: string,
    studentId: string,
    intake: string,
    campus: string,
    program: string,
    userName: string
  ) => `Hi Saifon,
  
I'm seeking spot approval on a Bachelor of Nursing spot for the student ${studentName} - ${studentId} for ${intake}, ${campus} - ${program}

Kind regards,
${userName}`;