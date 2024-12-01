import React from "react";
import { useUserStore } from "../store/useUserStore";

function AddNewFriends() {
  const { searchUser } = useUserStore();
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="xs:border-4 border-primary rounded-lg h-[500px] w-[350px] p-1 overflow-y-auto">
        <label className="input input-bordered flex items-center gap-2 m-3">
          <input
            type="text"
            className="grow"
            placeholder="Search by uniqueName"
            onChange={(e) => searchUser(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <div>
          <div className="flex items-center border-4 border-primary rounded-lg h-[70px] cursor-pointer hover:bg-primary-focus hover:text-primary-content m-3.5">
            <span>Demo</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewFriends;
