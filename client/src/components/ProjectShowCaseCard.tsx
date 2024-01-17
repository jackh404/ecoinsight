import { Link } from "react-router-dom";

import { Project, ProjectUpdate } from "../../types.ts";
const ProjectShowCaseCard = (props: { project: Project }) => {
  const { title, goals, created_at, project_updates, user } = props.project;
  const upDates = project_updates.map((update: ProjectUpdate) =>
    new Date(update.created_at).getTime()
  );
  let lastUpdate = "";
  if (upDates.length) {
    lastUpdate = new Date(Math.max(...upDates)).toDateString();
  }
  return (
    <div className="w-[70%] md:w-[100%] hover:scale-105">
      <Link to={`/project/${props.project.id}`}>
        <div className="card bg-secondary text-secondary-content">
          <div className="card-body">
            <h3>{title}</h3>
            <p>- {user.display_name}</p>
            <p>Goals: {goals}</p>
            <p>Started: {new Date(created_at).toDateString()}</p>
            <p className="italic">
              {lastUpdate ? `Last update: ${lastUpdate}` : "No updates yet."}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectShowCaseCard;
