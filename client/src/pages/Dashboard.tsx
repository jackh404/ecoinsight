import axios from "axios";

import { useAuth } from "../context/AuthContext.tsx";
import Modal from "../components/Modal.tsx";
import AccountEditForm from "../components/AccountEditForm.tsx";
import { useNavigate } from "react-router";
const Dashboard = () => {
  const navigate = useNavigate();
  const server = import.meta.env.VITE_BACK_END_SERVER;
  const handleAccountDelete = async () => {
    try {
      await axios.delete(`${server}/users/${auth.user?.id}`);
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
      <div className="grid grid-cols-2 gap-4 grid-flow-row">
        <div className="text-center">
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
        </div>
      </div>
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
