export interface Template {
    title: string;
    content: (userName: string) => string;
    process: string;
    category: 'AP' | 'Email';
    isInternal: boolean
  }