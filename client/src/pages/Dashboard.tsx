import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext.tsx";
import Modal from "../components/Modal.tsx";
import AccountEditForm from "../components/AccountEditForm.tsx";
import { Recommendation } from "../../types.ts";
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
    <div>
      <h1 className="text-center">Dashboard</h1>
      <div className="grid md:grid-cols-2 grid-flow-row">
        <div className="text-center border-2 border-base-300 rounded p-8">
          <h2>My Account</h2>
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
                  document.getElementById("editAccount") as HTMLDialogElement
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
                  document.getElementById("deleteAccount") as HTMLDialogElement
                )?.showModal()
              }
            >
              Delete my account
            </button>
          </div>
        </div>
        <div className="text-center border-2 border-base-300 rounded p-8">
          <h2>Assessments</h2>
          <p>
            {auth.user?.energy_assessments.length ? (
              <>
                Energy Assessment last taken:&nbsp;
                {(auth.user?.energy_assessments[0].created_at).split(" ")[0]}
                <Link to="/energy-assessment">
                  <button className="btn btn-primary m-2">
                    Retake Energy Assessment
                  </button>
                </Link>
              </>
            ) : (
              <button className="btn btn-primary">
                Take Energy Assessment
              </button>
            )}
          </p>
        </div>
      </div>
      <div className="p-8 mx-[20%] text-center border-2 border-base-300 rounded">
        <h2>Recommendations</h2>
        <div className="text-left">
          <p>
            View full recommendations{" "}
            <Link to="/assessment-results" className="link-primary">
              here
            </Link>
          </p>
          <ul className="list-disc">
            {auth.user?.recommendations.map((rec: Recommendation) => (
              <li key={rec.id}>
                <h3>{rec.title}</h3>
              </li>
            ))}
          </ul>
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
