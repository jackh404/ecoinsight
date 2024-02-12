import { Link } from "react-router-dom";

import { Project, ProjectUpdate } from "../../types.ts";
const ProjectShowCaseCard = (props: { project: Project }) => {
  const { title, goals, created_at, project_updates, user, image, category } =
    props.project;
  const upDates = project_updates.map((update: ProjectUpdate) =>
    new Date(update.created_at).getTime()
  );
  const pickImage = () => {
    if (image) {
      return image;
    } else {
      switch (category) {
        case "Energy":
          return "/images/electricity-4666566_1280.jpg";
        case "Water":
          return "/images/drop-3698073_1280.jpg";
        case "Waste":
          return "/images/plastic-bottles-115069_1280.jpg";
        case "Food":
          return "/images/avocado-1838785_1280.jpg";
        case "Transportation":
          return "/images/cycles-4337672_1280.jpg";
        case "Land Use":
          return "/images/castle-teck-1464779_1280.jpg";
        default:
          return "/images/environmental-protection.jpg";
      }
    }
  };
  let lastUpdate = "";
  if (upDates.length) {
    lastUpdate = new Date(Math.max(...upDates)).toDateString();
  }
  return (
    <div className="card hover:scale-105 bg-secondary">
      <Link to={`/project/${props.project.id}`}>
        <figure>
          <img src={pickImage()} alt={title} className="rounded-t-2xl" />
        </figure>
        <div className="card-body text-secondary-content">
          <h3 className="card-title">{title}</h3>
          <p>- {user.display_name}</p>
          <p>Goals: {goals}</p>
          <p>Started: {new Date(created_at).toDateString()}</p>
          <p className="italic">
            {lastUpdate ? `Last update: ${lastUpdate}` : "No updates yet."}
          </p>
          <div className="badge badge-outline">{category}</div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectShowCaseCard;
