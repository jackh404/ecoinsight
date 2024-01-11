type question = {
  id: string;
  short: string;
  full: string;
  type: string;
  options: string[];
};
type User = {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  display_name: string;
  created_at: string;
  updated_at: string;
};
interface FormData {
  [key: string]: string | number;
}
export type { question, FormData, User };
