export function parseDate(dateString: string): Date | null {
    const [day, month, year] = dateString.split(" ");
    const monthIndex = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ].indexOf(month);
  
    if (monthIndex === -1) return null;
    return new Date(parseInt(year), monthIndex, parseInt(day));
  }
  
  export function transformDate(dateString: string): string {
    if (!dateString) return "";
    const [day, month, year] = dateString.split(" ");
    const transformedMonth = month.slice(0, 3).charAt(0).toUpperCase() + 
      month.slice(1, 3).toLowerCase();
    return `${day}-${transformedMonth}-${year}`;
  }
  