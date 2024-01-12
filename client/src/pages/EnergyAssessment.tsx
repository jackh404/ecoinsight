import axios from "axios";

import FormFromDB from "../components/FormFromDB.tsx";
import { useAuth } from "../context/AuthContext.tsx";

const EnergyAssessment = () => {
  const server = import.meta.env.VITE_BACK_END_SERVER;
  const auth = useAuth()!;

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    formData: FormData
  ) => {
    e.preventDefault();
    const response = axios.post(`${server}/energy_assessments`, {
      user_id: auth.user?.id,
      ...formData,
    });
    console.log(response);
  };

  return (
    <div>
      <h1>Energy Assessment</h1>
      <FormFromDB
        formUrl={`${server}/energy_assessment_questions`}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default EnergyAssessment;
