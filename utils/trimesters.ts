interface Trimester {
    name: string;
    code: string;
    startDate: Date;
    endDate: Date;
  }
  
  const trimesters: Trimester[] = [
    { name: "Trimester 1, 2022", code: "223100", startDate: new Date("2022-02-14"), endDate: new Date("2022-05-08") },
    { name: "Trimester 2, 2022", code: "223200", startDate: new Date("2022-05-30"), endDate: new Date("2022-08-21") },
    { name: "Trimester 3, 2022", code: "223300", startDate: new Date("2022-09-12"), endDate: new Date("2022-12-04") },
    
    { name: "Trimester 1, 2023", code: "233100", startDate: new Date("2023-02-20"), endDate: new Date("2023-05-14") },
    { name: "Trimester 2, 2023", code: "233200", startDate: new Date("2023-06-05"), endDate: new Date("2023-08-27") },
    { name: "Trimester 3, 2023", code: "233300", startDate: new Date("2023-09-18"), endDate: new Date("2023-12-10") },
    
    { name: "Trimester 1, 2024", code: "243100", startDate: new Date("2024-02-19"), endDate: new Date("2024-05-12") },
    { name: "Trimester 2, 2024", code: "243200", startDate: new Date("2024-06-03"), endDate: new Date("2024-08-25") },
    { name: "Trimester 3, 2024", code: "243300", startDate: new Date("2024-09-16"), endDate: new Date("2024-12-08") },
    
    { name: "Trimester 1, 2025", code: "253100", startDate: new Date("2025-02-17"), endDate: new Date("2025-05-11") },
    { name: "Trimester 2, 2025", code: "253200", startDate: new Date("2025-06-02"), endDate: new Date("2025-08-24") },
    { name: "Trimester 3, 2025", code: "253300", startDate: new Date("2025-09-15"), endDate: new Date("2025-12-07") },
    
    { name: "Trimester 1, 2026", code: "263100", startDate: new Date("2026-02-16"), endDate: new Date("2026-05-10") },
    { name: "Trimester 2, 2026", code: "263200", startDate: new Date("2026-06-01"), endDate: new Date("2026-08-23") },
    { name: "Trimester 3, 2026", code: "263300", startDate: new Date("2026-09-14"), endDate: new Date("2026-12-06") },
    
    { name: "Trimester 1, 2027", code: "273100", startDate: new Date("2027-02-15"), endDate: new Date("2027-05-09") },
    { name: "Trimester 2, 2027", code: "273200", startDate: new Date("2027-05-31"), endDate: new Date("2027-08-22") },
    { name: "Trimester 3, 2027", code: "273300", startDate: new Date("2027-09-13"), endDate: new Date("2027-12-05") },
    
    { name: "Trimester 1, 2028", code: "283100", startDate: new Date("2028-02-14"), endDate: new Date("2028-05-07") },
    { name: "Trimester 2, 2028", code: "283200", startDate: new Date("2028-05-29"), endDate: new Date("2028-08-20") },
    { name: "Trimester 3, 2028", code: "283300", startDate: new Date("2028-09-11"), endDate: new Date("2028-12-03") },
    
    { name: "Trimester 1, 2029", code: "293100", startDate: new Date("2029-02-19"), endDate: new Date("2029-05-13") },
    { name: "Trimester 2, 2029", code: "293200", startDate: new Date("2029-06-04"), endDate: new Date("2029-08-26") },
    { name: "Trimester 3, 2029", code: "293300", startDate: new Date("2029-09-17"), endDate: new Date("2029-12-09") }
  ];