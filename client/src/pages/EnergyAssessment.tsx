import axios from "axios";

import FormFromDB from "../components/FormFromDB.tsx";
import { useAuth } from "../context/AuthContext.tsx";

const EnergyAssessment = () => {
  const auth = useAuth()!;

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    formData: FormData
  ) => {
    e.preventDefault();
    const response = axios.post(`api/energy_assessments`, {
      user_id: auth.user?.id,
      ...formData,
    });
    console.log(response);
  };

  return (
    <div>
      <h1>Energy Assessment</h1>
      <FormFromDB
        formUrl={`api/energy_assessment_questions`}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default EnergyAssessment;
