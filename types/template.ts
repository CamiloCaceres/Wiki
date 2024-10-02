export interface TemplateParams {
  userName: string;
  [key: string]: string;  // Allow any string keys with string values
}

export interface Template {
  title: string;
  content: (params: TemplateParams) => string;
  process: string;
  category: 'AP' | 'Email';
  isInternal: boolean;
  requiredParams: string[];  // List of required parameters
}