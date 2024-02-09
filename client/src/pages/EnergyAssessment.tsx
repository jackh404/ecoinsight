import axios from "axios";
import { Link } from "react-router-dom";
import React, { ReactNode, useState } from "react";

import FormFromDB from "../components/FormFromDB.tsx";
import { useAuth } from "../context/AuthContext.tsx";
import Modal from "../components/Modal.tsx";

const EnergyAssessment = () => {
  const server: string = import.meta.env.VITE_BACK_END_SERVER;
  const auth = useAuth()!;
  const [modalContents, setModalContents] = useState<ReactNode>(
    <h3 className="italic">Processing...</h3>
  );
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    formData: FormData
  ) => {
    e.preventDefault();
    (
      document.getElementById("energy-assessment-modal") as HTMLDialogElement
    )?.showModal();
    var response = await axios.post(`${server}/energy_assessments`, {
      user_id: auth.user?.id,
      ...formData,
    });
    console.log(response);
    if (response.status >= 200 && response.status < 300) {
      try {
        const recommendationUpdate = await axios.get(
          `${server}/users/${auth.user?.id}/recommendations`
        );
        auth.login({
          ...auth.user!,
          recommendations: recommendationUpdate.data,
        });
        setModalContents(
          <>
            <h3>Nice work!</h3>
            <p>
              Thank you for completing the EcoInsight Energy Assessment.&nbsp;
              <Link to="/assessment-results" className="link-primary">
                Click here
              </Link>
              &nbsp;to see recommendations tailored to your assessment
              responses.
            </p>
          </>
        );
      } catch (error) {
        console.error(error);
        setModalContents(
          <>
            <h3>Oops!</h3>
            <p>
              Your assessment was submitted successfully, but there was an error
              retrieving your recommendations. Please refresh the page then
              access them through the Dashboard.
            </p>
          </>
        );
      }
    } else {
      setModalContents(
        <>
          <h3>Oops!</h3>
          <p>
            There was an error submitting your assessment. Please try again.
          </p>
        </>
      );
    }
  };

  return (
    <div className="p-8">
      <h1>Energy Assessment</h1>
      <FormFromDB
        formUrl={`${server}/energy_assessment_questions`}
        handleSubmit={handleSubmit}
      />
      <Modal id="energy-assessment-modal">{modalContents}</Modal>
    </div>
  );
};

export default EnergyAssessment;
