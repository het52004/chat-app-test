import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useUserStore = create((set, get) => ({
  isDeletingAccount: false,
  disableButtons: false,

  searchUser: async (id) => {
    console.log(id);
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
}));
