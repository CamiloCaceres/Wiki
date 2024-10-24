
export function checkVisaExpiry(
    visaExpiryDate: string, 
    t4Date: Date, 
    t1Date: Date
  ): { showAlert: boolean; messages: string[] } {
    if (!visaExpiryDate) {
      return { showAlert: false, messages: [] };
    }
  
    const expiryDate = parseDate(visaExpiryDate);
    if (!expiryDate) {
      return { showAlert: false, messages: [] };
    }
  
    const sixMonthsFromT4 = new Date(t4Date);
    sixMonthsFromT4.setMonth(sixMonthsFromT4.getMonth() + 6);
  
    const sixMonthsFromT1 = new Date(t1Date);
    sixMonthsFromT1.setMonth(sixMonthsFromT1.getMonth() + 6);
  
    const messages: string[] = [];
  
    if (expiryDate <= sixMonthsFromT4) {
      messages.push(
        "The visa will expire within 6 months from the start of T4 (November 4, 2024)."
      );
    }
  
    if (expiryDate <= sixMonthsFromT1) {
      messages.push(
        "The visa will expire within 6 months from the start of T1 (February 17, 2025)."
      );
    }
  
    if (messages.length > 0) {
      messages.push(
        "If the applicant is applying for this intake, please consider a GSR condition."
      );
    }
  
    return {
      showAlert: messages.length > 0,
      messages
    };
  }
  