import { Link } from "react-router-dom";

import { Project, ProjectUpdate } from "../../types.ts";
const ProjectCard = (props: { project: Project }) => {
  const { title, goals, created_at, project_updates, image } = props.project;
  const upDates = project_updates.map((update: ProjectUpdate) =>
    new Date(update.created_at).getTime()
  );
  let lastUpdate = "";
  if (upDates.length) {
    lastUpdate = new Date(Math.max(...upDates)).toDateString();
  }
  return (
    <Link to={`/project/${props.project.id}`} className="w-[70%] md:w-[100%]">
      <div className="card bg-secondary text-secondary-content h-full border-2 border-secondary-content shadow-md">
        {image ? (
          <figure>
            <img src={image} alt={title} className="max-h-40" />
          </figure>
        ) : null}
        <div className="card-body">
          <h3>{title}</h3>
          <p>Goals: {goals}</p>
          <p>Started: {new Date(created_at).toDateString()}</p>
          <p className="italic">
            {lastUpdate ? `Last update: ${lastUpdate}` : "No updates yet."}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
