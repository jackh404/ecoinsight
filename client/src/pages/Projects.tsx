import axios from "axios";

import { useAuth } from "../context/AuthContext.tsx";
import ProjectCard from "../components/ProjectCard.tsx";
import { Project } from "../../types.ts";
import NewProjectForm from "../components/NewProjectForm.tsx";

const Projects = () => {
  const auth = useAuth()!;
  let projectDisplay = null;
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    formData: FormData
  ) => {
    e.preventDefault();
    try {
      const response = await axios.post(`api/projects`, {
        user_id: auth.user?.id,
        ...formData,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  if (auth.user?.projects.length) {
    projectDisplay = (
      <div className="m-8">
        <h2>Ongoing Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {auth.user?.projects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="p-8">
      <h1>Projects</h1>
      <p>
        Welcome to the Projects homepage. Here you can view your ongoing and
        completed projects and submit new ones. Click a project title to see its
        full details and submit an update to it when you make progress!
      </p>
      {projectDisplay}
      <NewProjectForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default Projects;
