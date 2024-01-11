import React, { useEffect, useState } from "react";
import { question, FormData } from "../../types.ts";

const FormFromDB = (props: { formUrl: string; dbUrl: string }) => {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({} as FormData);
  const { formUrl, dbUrl } = props;
  const fetchQuestions = async () => {
    const response = await fetch(formUrl);
    const data = await response.json();
    setQuestions(data);
    data.forEach((question: question) => {
      if (typeof formData[question.short] === "string")
        setFormData({ ...formData, [question.short]: "" });
      else setFormData({ ...formData, [question.short]: 0 });
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(typeof e);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(dbUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
  };
  const makeForm = () => {
    if (questions) {
      return questions.map((question: question) => {
        return (
          <div key={question.short}>
            <label htmlFor={question.short}>{question.full}</label>
            <input
              type={question.type}
              name={question.short}
              id={question.short}
              value={formData[question.short]}
              onChange={handleChange}
            />
          </div>
        );
      });
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, []);
  if (questions) {
    return <form onSubmit={handleSubmit}>{makeForm()}</form>;
  } else {
    return <div>Loading...</div>;
  }
};

export default FormFromDB;
