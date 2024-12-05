import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { useFriendRequest } from "../store/useFriendRequest";

function ViewUserProfile() {
  const { viewUserProfileData, isFetchingUserData } = useUserStore();
  const { userData } = useAuthStore();
  const {
    sendFriendRequest,
    disableButtons,
    isSendingFriendRequest,
    acceptFriendRequest,
    isAcceptingFriendRequest,
    isWithdrawingFriendRequest,
    withdrawFriendRequest,
    isRejectingFriendRequest,
    rejectFriendRequest,
    isRemovingFriend,
    removeFriend,
    isFriend,
    isIncoming,
    isOutgoing,
    isBlocked,
    checkStatus,
    removeStatus,
    isInitializing,
  } = useFriendRequest();

  const navigate = useNavigate();
  if (isBlocked) {
    toast.error("You cannot view this profile!");
    navigate("/addnewfriend");
  }
  if (userData._id === viewUserProfileData._id) {
    navigate("/profile");
  }
  
  return (
    <div className="flex items-center justify-center h-screen w-full">
      {!isInitializing && !isFetchingUserData ? (
        <div className="border-3 border-primary border-500 rounded-lg h-[400px] w-[500px]">
          <div className="flex items-center justify-end h-10">
            <div className="flex">
              <Link to="/home" className="flex items-center hover:underline">
                <span>Go Back</span>
              </Link>
            </div>
          </div>
          <div className="avatar flex items-center justify-center mt-3">
            <div className="w-24 rounded-full">
              <img src={`${viewUserProfileData?.photoPath}`} />
            </div>
          </div>
          <div className="text-sm xs:text-lg flex flex-col p-3 gap-2">
            <span>Username:- {viewUserProfileData?.userName}</span>
            <span>Uniquename:- {viewUserProfileData?.uniqueName}</span>
            <span>Email:- {viewUserProfileData?.email}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 p-2">
            {!isFriend &&
              !isIncoming &&
              !isOutgoing &&
              (!isSendingFriendRequest ? (
                <button
                  className="btn btn-primary"
                  onClick={() => sendFriendRequest(viewUserProfileData._id)}
                  disabled={disableButtons}
                >
                  Send friend Request
                </button>
              ) : (
                <span className="loading loading-dots loading-lg"></span>
              ))}
            {isIncoming &&
              !isOutgoing &&
              !isFriend &&
              (!isAcceptingFriendRequest ? (
                <button
                  className="btn btn-primary"
                  disabled={disableButtons}
                  onClick={() => acceptFriendRequest(viewUserProfileData._id)}
                >
                  Accept friend Request
                </button>
              ) : (
                <span className="loading loading-dots loading-lg"></span>
              ))}
            {isOutgoing &&
              (!isWithdrawingFriendRequest ? (
                <button
                  className="btn btn-primary"
                  disabled={disableButtons}
                  onClick={() => withdrawFriendRequest(viewUserProfileData._id)}
                >
                  Withdraw friend Request
                </button>
              ) : (
                <span className="loading loading-dots loading-lg"></span>
              ))}
            {isIncoming &&
              (!isRejectingFriendRequest ? (
                <button
                  className="btn btn-primary"
                  disabled={disableButtons}
                  onClick={() => rejectFriendRequest(viewUserProfileData._id)}
                >
                  Reject friend Request
                </button>
              ) : (
                <span className="loading loading-dots loading-lg"></span>
              ))}
            {isFriend &&
              (!isRemovingFriend ? (
                <button
                  className="btn btn-primary"
                  disabled={disableButtons}
                  onClick={() => removeFriend(viewUserProfileData._id)}
                >
                  Remove Friend
                </button>
              ) : (
                <span className="loading loading-dots loading-lg"></span>
              ))}
            <button
              className="btn btn-primary"
              disabled={disableButtons}
              onClick={() => {
                toast.error("Under development, available soon!");
              }}
            >
              Block User
            </button>
          </div>
        </div>
      ) : (
        <div
          className="spinner-border"
          style={{ width: "5rem", height: "5rem" }}
          role="status"
        >
          <span className="sr-only"></span>
        </div>
      )}
    </div>
  );
}

export default ViewUserProfile;
