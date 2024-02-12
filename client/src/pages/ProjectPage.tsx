import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import { Project, ProjectUpdate } from "../../types.ts";
import NewProjectUpdateForm from "../components/NewProjectUpdateForm.tsx";
import Loading from "../components/Loading.tsx";
import { useAuth } from "../context/AuthContext.tsx";

const ProjectPage = () => {
  const auth = useAuth()!;
  const server: string = import.meta.env.VITE_BACK_END_SERVER;
  const { id } = useParams();
  const [project, setProject] = useState({} as Project);
  const fetchProject = async () => {
    try {
      const response = await axios.get(`${server}/projects/${id}`);
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
      const response = await axios.post(`${server}/project_updates`, {
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
    <div className="p-8 lg:w-2/3 flex flex-col mx-auto items-center gap-4">
      {project ? (
        <>
          {project.image ? (
            <img
              src={project.image}
              className="max-w-xl lg:max-w-3xl rounded-2xl shadow-xl"
              alt={`${project.title} image`}
            />
          ) : null}
          <h1>{project.title}</h1>
          <h3>{project.goals}</h3>
          <p>{project.description}</p>
          <div>{updatesDisplay}</div>
          {auth.user && auth.user.id == project.user_id ? (
            <div>
              <h2 className="mb-4">
                Have an update? Let us know how it's going!
              </h2>
              <NewProjectUpdateForm handleSubmit={handleSubmit} />
            </div>
          ) : null}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ProjectPage;
