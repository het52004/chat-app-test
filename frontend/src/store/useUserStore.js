import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useUserStore = create((set, get) => ({
  isDeletingAccount: false,
  disableButtons: false,
  isUpdatingAccount: false,
  isSearchingUsers: false,
  searchedUsers: [],
  viewUserProfileData: {},
  isFetchingUserData: false,
  friends: [],
  incomingFriends: [],

  editAccount: async ({ userName, uniqueName, password, avatar }) => {
    set({ isUpdatingAccount: true });
    try {
      const res = await axiosInstance.post(
        "/api/currentUser/updateCurrentUserDetails",
        {
          userName,
          uniqueName,
          password,
          avatar,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.success) {
        window.location.reload();
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isUpdatingAccount: false });
    }
  },
  searchUser: async (id) => {
    if (id.length > 2) {
      set({ isSearchingUsers: true });
      try {
        const res = await axiosInstance.post("/api/user/searchUser", { id });
        if (res.data.success) {
          set({ searchedUsers: res.data.searchedUsersData });
        } else {
          set({ searchedUsers: [] });
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        set({ isSearchingUsers: false });
      }
    } else {
      set({ searchedUsers: [] });
    }
  },
  setViewUserProfileData: async (id, navigate) => {
    set({ searchedUsers: [] });
    set({ isFetchingUserData: true });
    try {
      const res = await axiosInstance.get(`/api/user/getUserDataById/${id}`);
      if (res.data.success) {
        set({ viewUserProfileData: res.data.userData });
        navigate("/viewuserprofile");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isFetchingUserData: false });
    }
  },
  deleteUser: async () => {
    set({ isDeletingAccount: true });
    set({ disableButtons: true });
    try {
      const res = await axiosInstance.delete(
        "/api/currentUser/deleteCurrentUser"
      );
      if (res.data.success) {
        const logout = useAuthStore.getState().logout;
        await logout();
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ disableButtons: false });
      set({ isDeletingAccount: false });
    }
  },
  getFriends: async () => {
    set({ isFetchingUserData: true });
    try {
      const res = await axiosInstance.get("/api/user/getFriendsUserData");
      if (res.data.success) {
        if (res.data.friends.length < 1) {
        } else {
          set({ friends: res.data.friends });
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isFetchingUserData: false });
    }
  },
  getIncomingRequests: async () => {
    set({ isFetchingUserData: true });
    try {
      const res = await axiosInstance.get(
        "/api/user/getIncomingFriendRequestUserData"
      );
      if (res.data.success) {
        if (res.data.friends.length < 1) {
        } else {
          set({ incomingFriends: res.data.friends });
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isFetchingUserData: false });
    }
  },
  subscribeToIncoming: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("friendRequestReceived", ({ from, to }) => {
      console.log("here",from);
      set((state) => ({
        incomingFriends: [...state.incomingFriends, from],
      }));
    });
  },
  unsubscribeToIncoming: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("friendRequestReceived");
    }
  },
}));
