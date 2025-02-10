export interface Field {
  type: string;
  name: string;
  label: string;
  required: boolean;
  value?: any;
  options?: string[];
}
