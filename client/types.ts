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
  energy_assessments: EnergyAssessment[];
  recommendations: Recommendation[];
};
type EnergyAssessment = {
  id: string;
  created_at: string;
};
type Recommendation = {
  id: string;
  created_at: string;
  title: string;
  text: string;
  impact_level: number;
};
interface FormData {
  [key: string]: string | number;
}
export type { question, FormData, User, EnergyAssessment, Recommendation };
