import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { CircleSlash2, Pencil, Trash2, Users } from "lucide-react";

function Profile() {
  const { userData } = useAuthStore();
  const convertToIST = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  };
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="border-3 border-primary border-500 rounded-lg h-[400px] w-[500px]">
        <div className="flex items-center justify-center h-10">
          <h1 className="text-[20px] xs:text-[25px]">
            {userData.userName}'s profile
          </h1>
        </div>
        <div className="text-sm xs:text-lg mt-3 flex flex-col p-4 gap-2">
          <span>Username:- {userData.userName}</span>
          <span>Uniquename:- {userData.uniqueName}</span>
          <span>Email:- {userData.email}</span>
          <span>Account created on:- {convertToIST(userData.createdAt)}</span>
        </div>
        <div className="flex flex-wrap items-center justify-start gap-3 p-4">
          <button className="btn bg-red-500">
            <span className="hidden xs:inline">Delete Account</span>
            <Trash2 className="cursor-pointer" />
          </button>
          <button className="btn bg-blue-500">
            <span className="hidden xs:inline">Edit Account Details</span>
            <Pencil className="cursor-pointer" />
          </button>
          <button className="btn btn-primary">
            <span className="hidden xs:inline">Friends</span>
            <Users className="cursor-pointer" />
          </button>
          <button className="btn btn-primary">
            <span className="hidden xs:inline">Blocked Users</span>
            <CircleSlash2 className="cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
