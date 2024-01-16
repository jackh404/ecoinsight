import { useState } from "react";

const NewProjectForm = (props: { handleSubmit: Function }) => {
  const [formData, setFormData] = useState({
    title: "",
    goals: "",
  });
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="flex flex-col mx-auto items-center mt-10">
      <h2>New Project</h2>
      <form
        className="flex flex-col mx-auto items-center gap-2"
        onSubmit={e =>
          props.handleSubmit(e, {
            ...formData,
          })
        }
      >
        <label className="pt-4" htmlFor="title">
          Title
        </label>
        <input
          value={formData.title}
          type="text"
          name="title"
          id="title"
          onChange={e => handleChange(e)}
        />
        <label className="pt-4" htmlFor="goals">
          Goals
        </label>
        <textarea
          value={formData.goals}
          name="goals"
          id="goals"
          cols={50}
          rows={3}
          placeholder="Give a short explanation of what you hope to accomplish with this
          project"
          onChange={e => handleChange(e)}
        ></textarea>
        <label htmlFor="description" className="pt-4">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          cols={70}
          rows={10}
          placeholder="Describe the project in detail"
          onChange={e => handleChange(e)}
        ></textarea>
        <button type="submit" className="btn btn-primary">
          Create Project
        </button>
      </form>
    </div>
  );
};

export default NewProjectForm;
