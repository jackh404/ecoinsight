import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import { Project, ProjectUpdate } from "../../types.ts";
import NewProjectUpdateForm from "../components/NewProjectUpdateForm.tsx";

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState({} as Project);
  const fetchProject = async () => {
    try {
      const response = await axios.get(`/api/projects/${id}`);
      console.log(response);
      setProject(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    formData: FormData
  ) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/project_updates`, {
        project_id: id,
        ...formData,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchProject();
  }, [id]);
  let updatesDisplay = null;
  if (project.project_updates && project.project_updates.length) {
    updatesDisplay = (
      <div>
        <h3 className="text-center">Updates</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {project.project_updates.map((update: ProjectUpdate) => (
            <div
              className="card bg-secondary text-secondary-content"
              key={update.id}
            >
              <div className="card-body">
                <h4>Date: {new Date(update.created_at).toDateString()}</h4>
                <p>{update.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="p-8 flex flex-col mx-auto items-center gap-4">
      <h1>{project.title}</h1>
      <h3>{project.goals}</h3>
      <p>{project.description}</p>
      <div>{updatesDisplay}</div>
      <div>
        <h2 className="mb-4">Have an update? Let us know how it's going!</h2>
        <NewProjectUpdateForm handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default ProjectPage;
