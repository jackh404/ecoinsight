import { useEffect, useState } from "react";
import axios from "axios";
import { question, FormData } from "../../types.ts";

const FormFromDB = (props: { formUrl: string; handleSubmit: Function }) => {
  const [questions, setQuestions] = useState([] as question[]);
  const [formData, setFormData] = useState({} as FormData);
  const { formUrl, handleSubmit } = props;
  const fetchQuestions = async () => {
    const response = await axios.get(formUrl);
    console.log(response);
    setQuestions(response.data);
    const formObj = {} as FormData;
    for (let q in response.data) {
      if (response.data[q].type !== "heading") {
        formObj[response.data[q].short] = "";
      }
    }
    setFormData(formObj);
  };
  const handleChange = (e: any) => {
    console.log(typeof e);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const makeForm = () => {
    if (questions) {
      return questions.map((question: question) => {
        if (question.type == "select") {
          return (
            <div key={question.short} className="my-4">
              <label htmlFor={question.short} className="block">
                {question.full}
              </label>
              <select
                name={question.short}
                id={question.short}
                value={formData[question.short] ?? ""}
                onChange={handleChange}
                className="w-[95%] md:w-80"
              >
                {question.options.map(option => (
                  <option key={`${question.short}:${option}`} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          );
        } else if (question.type == "heading") {
          return (
            <div key={question.short} className="divider my-8">
              <h2 className="text-center">{question.full}</h2>
            </div>
          );
        }
        return (
          <div key={question.short} className="my-4">
            <label htmlFor={question.short} className="block">
              {question.full}
            </label>
            <input
              type={question.type}
              name={question.short}
              id={question.short}
              value={formData[question.short] ?? ""}
              onChange={handleChange}
              className="w-[95%] md:w-80"
            />
          </div>
        );
      });
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, []);
  if (questions.length > 0) {
    return (
      <form
        onSubmit={e => {
          for (let f in formData) {
            if (formData[f] === "") {
              delete formData[f];
            }
          }
          handleSubmit(e, formData);
        }}
      >
        {makeForm()}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default FormFromDB;
