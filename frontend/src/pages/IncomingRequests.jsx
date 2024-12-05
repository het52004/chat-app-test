import React, { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";

function IncomingRequests() {
  const {
    incomingFriends,
    getIncomingRequests,
    isFetchingUserData,
    setViewUserProfileData,
    subscribeToIncoming,
    unsubscribeToIncoming,
  } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    getIncomingRequests();
    // subscribeToIncoming();
    // return () => unsubscribeToIncoming();
  }, [getIncomingRequests]);
  return (
    <div className="h-screen w-full flex items-center justify-center">
      {!isFetchingUserData ? (
        <div className="xs:border-4 border-primary rounded-lg h-[500px] w-[350px] p-2 overflow-y-auto">
          {incomingFriends &&
            incomingFriends.map((friend) => (
              <button
                className="w-full h-[70px] p-3 flex items-center rounded-lg gap-3 hover:bg-base-300 transition-colors"
                key={friend._id}
                onClick={() => {
                  setViewUserProfileData(friend._id, navigate);
                }}
              >
                <div className="avatar flex items-center justify-center">
                  <div className="w-[60px] h-[60px] xs:w-[45px] xs:h-[45px] rounded-full">
                    <img src={`${friend?.photoPath}`} />
                  </div>
                </div>
                <span>{friend?.uniqueName}</span>
              </button>
            ))}
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

export default IncomingRequests;
