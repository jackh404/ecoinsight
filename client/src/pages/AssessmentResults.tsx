// client/src/pages/AssessmentResults.tsx

import { Recommendation } from "../../types.ts";
import { useAuth } from "../context/AuthContext.tsx";

const AssessmentResults = () => {
  const auth = useAuth()!;
  if (auth.user?.recommendations && auth.user?.recommendations.length > 0) {
    return (
      <div>
        <h1>Assessment Results</h1>
        <ul>
          {auth.user?.recommendations.map((rec: Recommendation) => (
            <li key={rec.id}>
              <h3 className="underline">{rec.title}</h3>
              <p>{rec.text}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div>
      <h1>Assessment Results</h1>
      <h3>Loading...</h3>
    </div>
  );
};

export default AssessmentResults;
