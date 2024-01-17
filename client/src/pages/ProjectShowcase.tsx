import { useState, useEffect } from "react";
import axios from "axios";

import { Project } from "../../types.ts";
import ProjectShowCaseCard from "../components/ProjectShowCaseCard.tsx";

const ProjectShowcase = () => {
  const [projects, setProjects] = useState([] as Project[]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`/api/projects`);
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
    <div>
      <h1>Project Showcase</h1>
      <div className="p-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayProjects()}
      </div>
    </div>
  );
};

export default ProjectShowcase;
