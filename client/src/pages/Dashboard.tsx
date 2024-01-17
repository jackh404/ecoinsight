import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext.tsx";
import Modal from "../components/Modal.tsx";
import AccountEditForm from "../components/AccountEditForm.tsx";
import { Recommendation, Project } from "../../types.ts";
import Loading from "../components/Loading.tsx";
const Dashboard = () => {
  const navigate = useNavigate();
  const handleAccountDelete = async () => {
    try {
      await axios.delete(`api/users/${auth.user?.id}`);
      alert("Account deleted");
      auth.logout();
      navigate("/");
    } catch (error: any) {
      console.error("Error deleting account:", error);
      alert("Error deleting account: " + error.message);
    }
  };
  const auth = useAuth()!;
  return (
    <div className="p-8">
      <h1 className="text-center">Dashboard</h1>
      <div className="grid md:grid-cols-2 md:grid-rows-2 grid-flow-row">
        <div className="text-center border-2 border-base-content rounded-lg p-8">
          <h2>My Account</h2>
          {auth.user ? (
            <>
              <table className="table w-full">
                <tbody>
                  <tr>
                    <td>Username:</td>
                    <td>{auth.user?.username}</td>
                  </tr>
                  <tr>
                    <td>First Name:</td>
                    <td>{auth.user?.first_name}</td>
                  </tr>
                  <tr>
                    <td>Last Name:</td>
                    <td>{auth.user?.last_name}</td>
                  </tr>
                  <tr>
                    <td>Display Name:</td>
                    <td>{auth.user?.display_name}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>{auth.user?.email}</td>
                  </tr>
                </tbody>
              </table>

              <div className="text-left">
                <button
                  className="btn btn-primary ml-4"
                  title="Edit Account"
                  type="button"
                  onClick={() =>
                    (
                      document.getElementById(
                        "editAccount"
                      ) as HTMLDialogElement
                    )?.showModal()
                  }
                >
                  Edit
                </button>
                <button
                  className="btn btn-error ml-4"
                  title="Delete Account"
                  type="button"
                  onClick={() =>
                    (
                      document.getElementById(
                        "deleteAccount"
                      ) as HTMLDialogElement
                    )?.showModal()
                  }
                >
                  Delete my account
                </button>
              </div>
            </>
          ) : (
            <Loading />
          )}
        </div>
        <div className="text-center border-2 border-base-content rounded-lg p-8">
          <h2>Assessments</h2>
          {auth.user?.energy_assessments.length ? (
            <div>
              <p>
                Energy Assessment last taken:&nbsp;
                {/* You know how sometimes toward the end of a project you just
                 can't stand the idea of doing something the "right" way? */}
                {new Date(
                  Math.max(
                    ...auth.user?.energy_assessments.map(ea =>
                      new Date(ea.created_at).getTime()
                    )
                  )
                ).toDateString()}
              </p>
              <button className="btn btn-primary m-2 mt-10">
                <Link to="/energy-assessment">Retake Energy Assessment</Link>
              </button>
            </div>
          ) : (
            <button className="btn btn-primary mt-10">
              <Link to="/energy-assessment">Take Energy Assessment</Link>
            </button>
          )}
        </div>

        <div className="p-8 text-center border-2 border-base-content rounded-lg">
          <h2>Recommendations</h2>
          {auth.user ? (
            <div className="text-left">
              <p>
                View full recommendations&nbsp;
                <Link to="/assessment-results" className="link-primary">
                  here
                </Link>
              </p>
              <ul className="list-disc">
                {auth.user.recommendations ? (
                  auth.user?.recommendations.map((rec: Recommendation) => (
                    <li key={rec.id}>
                      <h3>{rec.title}</h3>
                    </li>
                  ))
                ) : (
                  <p className="italic">
                    No Recommendations yet. Take an assessment to get started!
                  </p>
                )}
              </ul>
            </div>
          ) : (
            <Loading />
          )}
        </div>
        <div className="p-8 text-center border-2 border-base-content rounded-lg">
          <h2>My Projects</h2>
          {auth.user ? (
            <ul className="list-disc text-left">
              {auth.user.projects.map((project: Project) => (
                <li key={project.id}>
                  <Link className="link-primary" to={`/project/${project.id}`}>
                    <h3>{project.title}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <Loading />
          )}
          <button className="btn btn-primary mt-8">
            <Link to="/projects">Projects Page</Link>
          </button>
        </div>
      </div>
      <Modal id="editAccount">
        <AccountEditForm
          close={() =>
            (
              document.getElementById("editAccount") as HTMLDialogElement
            )?.close()
          }
        />
      </Modal>
      <Modal id="deleteAccount">
        <h1>Are you sure you want to delete your account?</h1>
        <h2>This action cannot be undone</h2>
        <button
          className="btn btn-error ml-4"
          title="Confirm Delete Account"
          type="button"
          onClick={handleAccountDelete}
        >
          Delete my account
        </button>
      </Modal>
    </div>
  );
};

export default Dashboard;
