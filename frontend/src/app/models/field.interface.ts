export interface Field {
  name: string;
  text: string;
  widget: string;
  type: string;
  mandatory: boolean;
  value?: any;
  rules?: { type: string, value?: any, message?: string }[];
  options?: string[];
  datasource?: string[];
}
