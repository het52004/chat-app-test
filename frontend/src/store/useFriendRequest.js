import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import { useUserStore } from "./useUserStore";

export const useFriendRequest = create((set, get) => ({
  isSendingFriendRequest: false,
  disableButtons: false,
  isAcceptingFriendRequest: false,
  isWithdrawingFriendRequest: false,
  isRejectingFriendRequest: false,
  isRemovingFriend: false,
  isFriend: false,
  isIncoming: false,
  isOutgoing: false,
  isBlocked: false,
  isInitializing: false,

  sendFriendRequest: async (id) => {
    set({ isSendingFriendRequest: true, disableButtons: true });
    try {
      const res = await axiosInstance.put(`/api/user/sendFriendRequest/${id}`);
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isSendingFriendRequest: false, disableButtons: false });
    }
  },
  acceptFriendRequest: async (id) => {
    set({ isAcceptingFriendRequest: true, disableButtons: true });
    try {
      const res = await axiosInstance.put(
        `/api/user/acceptFriendRequest/${id}`
      );
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isAcceptingFriendRequest: false, disableButtons: false });
    }
  },
  withdrawFriendRequest: async (id) => {
    set({ isWithdrawingFriendRequest: true, disableButtons: true });
    try {
      const res = await axiosInstance.delete(
        `/api/user/cancelFriendRequest/${id}`
      );
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isWithdrawingFriendRequest: false, disableButtons: false });
    }
  },
  rejectFriendRequest: async (id) => {
    set({ isRejectingFriendRequest: true, disableButtons: true });
    try {
      const res = await axiosInstance.delete(
        `/api/user/rejectFriendRequest/${id}`
      );
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isRejectingFriendRequest: false, disableButtons: false });
    }
  },
  removeFriend: async (id) => {
    set({ isRemovingFriend: true, disableButtons: true });
    try {
      const res = await axiosInstance.delete(`/api/user/removeFriend/${id}`);
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isRemovingFriend: false, disableButtons: false });
    }
  },
  checkStatus: () => {
    set({ isInitializing: true });
    try {
      set({
        isFriend: useAuthStore
          .getState()
          .userData?.friends.includes(
            useUserStore.getState().viewUserProfileData?._id
          ),
      });
      set({
        isIncoming: useAuthStore
          .getState()
          .userData?.incomingFriendRequests.includes(
            useUserStore.getState().viewUserProfileData?._id
          ),
      });
      set({
        isOutgoing: useAuthStore
          .getState()
          .userData?.outgoingFriendRequests.includes(
            useUserStore.getState().viewUserProfileData?._id
          ),
      });
      set({
        isBlocked: useAuthStore
          .getState()
          .userData?.blockedUsers.includes(
            useUserStore.getState().viewUserProfileData?._id
          ),
      });

      const socket = useAuthStore.getState().socket;
      if (!socket) return;

      socket.on("friendRequestSent", ({ from, to }) => {
        set({ isFriend: from.friends.includes(to._id) });
        set({
          isIncoming: from.incomingFriendRequests.includes(to._id),
        });
        set({
          isOutgoing: from.outgoingFriendRequests.includes(to._id),
        });
        set({
          isBlocked: from.blockedUsers.includes(to._id),
        });
      });

      socket.on("friendRequestReceived", ({ from, to }) => {
        toast.success(`Friend request received from ${from.uniqueName}`);

        if (from._id === useUserStore.getState().viewUserProfileData._id) {
          set({ isFriend: to.friends.includes(from._id) });
          set({
            isIncoming: to.incomingFriendRequests.includes(from._id),
          });
          set({
            isOutgoing: to.outgoingFriendRequests.includes(from._id),
          });
          set({ isBlocked: to.blockedUsers.includes(from._id) });
        }
      });

      socket.on("friendRemoved", ({ userData, friendData }) => {
        if (
          friendData._id === useUserStore.getState().viewUserProfileData._id ||
          userData._id === useUserStore.getState().viewUserProfileData._id
        ) {
          set({ isFriend: userData.friends.includes(friendData._id) });
          set({
            isIncoming: userData.incomingFriendRequests.includes(
              friendData._id
            ),
          });
          set({
            isOutgoing: userData.outgoingFriendRequests.includes(
              friendData._id
            ),
          });
          set({
            isBlocked: userData.blockedUsers.includes(friendData._id),
          });
        }
      });
      socket.on("friendRequestAccepted", ({ by, of }) => {
        toast.success(`Your Friend has been accepted by ${by.uniqueName}`);
        set({ isFriend: of.friends.includes(by._id) });
        set({
          isIncoming: of.incomingFriendRequests.includes(by._id),
        });
        set({
          isOutgoing: of.outgoingFriendRequests.includes(by._id),
        });
        set({
          isBlocked: of.blockedUsers.includes(by._id),
        });
      });
      socket.on("updateAfterFriendRequestAccepted", ({ by, of }) => {
        set({ isFriend: of.friends.includes(by._id) });
        set({
          isIncoming: of.incomingFriendRequests.includes(by._id),
        });
        set({
          isOutgoing: of.outgoingFriendRequests.includes(by._id),
        });
        set({
          isBlocked: of.blockedUsers.includes(by._id),
        });
      });
      socket.on("friendRequestRejected", ({ by, of }) => {
        toast.error(`Friend request you sent was rejected by ${by.uniqueName}`);
        set({ isFriend: of.friends.includes(by._id) });
        set({
          isIncoming: of.incomingFriendRequests.includes(by._id),
        });
        set({
          isOutgoing: of.outgoingFriendRequests.includes(by._id),
        });
        set({
          isBlocked: of.blockedUsers.includes(by._id),
        });
      });
      socket.on("updateAfterFriendRequestRejected", ({ by, of }) => {
        set({ isFriend: by.friends.includes(of._id) });
        set({
          isIncoming: by.incomingFriendRequests.includes(of._id),
        });
        set({
          isOutgoing: by.outgoingFriendRequests.includes(of._id),
        });
        set({
          isBlocked: by.blockedUsers.includes(of._id),
        });
      });
      socket.on("friendRequestCancelled", ({ userData, friendData }) => {
        console.log(useAuthStore.getState().userData);
        console.log(useUserStore.getState().viewUserProfileData);
        console.log(userData);
        console.log(friendData);

        if (
          userData._id === useAuthStore.getState().userData._id ||
          userData._id === useUserStore.getState().viewUserProfileData._id
        ) {
          set({ isFriend: userData.friends.includes(friendData._id) });
          set({
            isIncoming: userData.incomingFriendRequests.includes(
              friendData._id
            ),
          });
          set({
            isOutgoing: userData.outgoingFriendRequests.includes(
              friendData._id
            ),
          });
          set({
            isBlocked: userData.blockedUsers.includes(friendData._id),
          });
        }
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isInitializing: false });
    }
  },
  removeStatus: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("friendRequestSent");
    socket.off("friendRequestReceived");
    socket.off("friendRemoved");
    socket.off("friendRequestCancelled");
    socket.off("friendRequestRejected");
    socket.off("friendRequestAccepted");
    socket.off("updateAfterFriendRequestAccepted");
    socket.off("updateAfterFriendRequestRejected");
  },
}));
