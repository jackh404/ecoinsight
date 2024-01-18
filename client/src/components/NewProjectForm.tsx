import { useState } from "react";

const NewProjectForm = (props: { handleSubmit: Function }) => {
  const emptyFormData = {
    title: "",
    goals: "",
    category: "Energy",
    description: "",
    image: "",
  };
  const [formData, setFormData] = useState(emptyFormData);
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
          props.handleSubmit(
            e,
            {
              ...formData,
            },
            () => setFormData(emptyFormData)
          )
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
          required
        />
        <label className="pt-4" htmlFor="category">
          {" "}
          Category{" "}
        </label>
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={e => handleChange(e)}
          required
        >
          <option value="Energy">Energy</option>
          <option value="Food">Food</option>
          <option value="Land Use">Land Use</option>
          <option value="Transportation">Transportation</option>
          <option value="Waste">Waste</option>
          <option value="Water">Water</option>
        </select>
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
          required
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
          value={formData.description}
          onChange={e => handleChange(e)}
          required
        ></textarea>
        <label htmlFor="image" className="pt-4">
          <em>optional: </em>Image (url)
        </label>
        <input
          name="image"
          id="image"
          value={formData.image}
          onChange={e => handleChange(e)}
        />
        <button type="submit" className="btn btn-primary">
          Create Project
        </button>
      </form>
    </div>
  );
};

export default NewProjectForm;
