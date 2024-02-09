import { useState, useEffect } from "react";
import axios from "axios";

import { Project } from "../../types.ts";
import ProjectShowCaseCard from "../components/ProjectShowCaseCard.tsx";
import Loading from "../components/Loading.tsx";

const ProjectShowcase = () => {
  const server: string = import.meta.env.VITE_BACK_END_SERVER;
  const [projects, setProjects] = useState([] as Project[]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${server}/projects`);
      console.log(response);
      setProjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const displayProjects = () => {
    return projects.map(project => {
      return <ProjectShowCaseCard key={project.id} project={project} />;
    });
  };
  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <div className="bg-lush-stream bg-fixed bg-cover bg-center min-h-svh">
      <div className="bg-base-100 bg-opacity-70 min-h-svh p-8 z-1 lg:p-12">
        <h1 className="text-center pt-4">Project Showcase</h1>
        {projects.length ? (
          <div className="p-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayProjects()}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default ProjectShowcase;
