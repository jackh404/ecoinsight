import { useState } from "react";

const NewProjectUpdateForm = (props: { handleSubmit: Function }) => {
  const { handleSubmit } = props;
  const [formData, setFormData] = useState({
    text: "",
  });
  return (
    <form
      onSubmit={e => handleSubmit(e, formData)}
      className="flex flex-col gap-2"
    >
      <label htmlFor="text" className="hidden">
        Text
      </label>
      <textarea
        value={formData.text}
        name="text"
        id="text"
        placeholder="Describe the progress you have made on your project"
        cols={30}
        rows={6}
        onChange={e => setFormData({ ...formData, text: e.target.value })}
      ></textarea>
      <button type="submit" className="btn btn-primary w-20">
        Submit
      </button>
    </form>
  );
};

export default NewProjectUpdateForm;
