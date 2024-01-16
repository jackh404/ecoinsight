import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import { Project } from "../../types.ts";

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState({} as Project);
  const fetchProject = async () => {
    try {
      const response = await axios.get(`api/projects/${id}`);
      console.log(response);
      setProject(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchProject();
  }, [id]);
  return (
    <div>
      <h1>{project.title}</h1>
      <h3>{project.goals}</h3>
      <p>{project.description}</p>
    </div>
  );
};

export default ProjectPage;
