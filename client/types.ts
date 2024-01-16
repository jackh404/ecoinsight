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
  projects: Project[];
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
type Project = {
  id: string;
  user_id: string;
  title: string;
  goals: string;
  description: string;
  created_at: string;
  completed_at: string;
  project_updates: ProjectUpdate[];
};
type ProjectUpdate = {
  id: string;
  created_at: string;
  text: string;
  project_id: string;
};

interface FormData {
  [key: string]: string | number;
}

export type {
  question,
  FormData,
  User,
  EnergyAssessment,
  Recommendation,
  Project,
  ProjectUpdate,
};
