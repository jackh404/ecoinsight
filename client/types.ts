type question = {
  id: string;
  short: string;
  full: string;
  type: string;
  options: string[];
};
interface formData {
  [key: string]: string | number;
}
export type { question, formData };
