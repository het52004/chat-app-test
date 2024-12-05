import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { CircleSlash2, House, Pencil, Trash2, Users } from "lucide-react";
import { useUserStore } from "../store/useUserStore";
import { Link } from "react-router-dom";

function Profile() {
  const { userData } = useAuthStore();
  const { isDeletingAccount, deleteUser, disableButtons } = useUserStore();
  const convertToIST = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  };
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="border-3 border-primary border-500 rounded-lg h-[500px] w-[500px]">
        <div className="flex items-center justify-end h-10">
          <div className="flex">
            <Link to="/home" className="flex items-center hover:underline">
              <House size={30} />
              <span className="hidden xs:block">Go Back to home</span>
            </Link>
          </div>
        </div>
        <div className="avatar flex items-center justify-center mt-3">
          <div className="w-24 rounded-full">
            <img src={`${userData?.photoPath}`} />
          </div>
        </div>
        <div className="text-sm xs:text-lg flex flex-col p-3 gap-2">
          <span>Username:- {userData.userName}</span>
          <span>Uniquename:- {userData.uniqueName}</span>
          <span>Email:- {userData.email}</span>
          <span>Account created on:- {convertToIST(userData.createdAt)}</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 p-4">
          <div className="flex items-center justify-center gap-4">
            {!isDeletingAccount ? (
              <button
                className="btn bg-red-500 xs:h-[40px] xs:w-[200px]"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
                disabled={disableButtons}
              >
                <span className="hidden xs:inline">Delete Account</span>
                <Trash2 className="cursor-pointer" />
              </button>
            ) : (
              <span className="loading loading-spinner loading-md"></span>
            )}
            <Link to="/editaccount">
              <button
                className="btn bg-blue-500 xs:h-[40px] xs:w-[200px]"
                disabled={disableButtons}
              >
                <span className="hidden xs:inline">Edit Account Details</span>
                <Pencil className="cursor-pointer" />
              </button>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Link to="/friends">
              <button
                className="btn btn-primary xs:h-[40px] xs:w-[200px]"
                disabled={disableButtons}
              >
                <span className="hidden xs:inline">Friends</span>
                <Users className="cursor-pointer" />
              </button>
            </Link>
            <button
              className="btn btn-primary xs:h-[40px] xs:w-[200px]"
              disabled={disableButtons}
            >
              <span className="hidden xs:inline">Blocked Users</span>
              <CircleSlash2 className="cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Warning!</h3>
          <p className="py-4">
            You will not be able to recover this account once you delete it! Are
            you sure you want to delete your account?
          </p>
          <div className="modal-action flex gap-3">
            <form method="dialog">
              <button className="btn bg-red-500" onClick={deleteUser}>
                Yes
              </button>
            </form>
            <form method="dialog">
              <button className="btn bg-green-500">No</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Profile;
