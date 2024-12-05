import React from "react";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";

function AddNewFriends() {
  const { searchUser, isSearchingUser, searchedUsers, setViewUserProfileData } =
    useUserStore();
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="xs:border-4 border-primary rounded-lg h-[500px] w-[350px] p-1 overflow-y-auto">
        <label className="input input-bordered flex items-center gap-2 m-2 mb-4">
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
        <div className="flex items-center justify-center">
          {!isSearchingUser ? (
            searchedUsers &&
            searchedUsers.map((users) => (
              <button
                className="w-full h-[70px] p-3 flex items-center rounded-lg gap-3 hover:bg-base-300 transition-colors"
                key={users._id}
                onClick={() => {
                  setViewUserProfileData(users._id, navigate);
                }}
              >
                <div className="avatar flex items-center justify-center">
                  <div className="w-[60px] h-[60px] xs:w-[45px] xs:h-[45px] rounded-full">
                    <img src={`${users?.photoPath}`} />
                  </div>
                </div>
                <span>{users?.uniqueName}</span>
              </button>
            ))
          ) : (
            <span className="loading loading-infinity loading-lg"></span>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddNewFriends;
