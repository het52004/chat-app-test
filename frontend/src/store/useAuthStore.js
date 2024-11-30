import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

export const useAuthStore = create((set, get) => ({
  userData: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: false,
  onlineUsers: [],
  socket: null,
  showOtpInput: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/api/auth/checkAuth");
      if (res.data.success) {
        set({ userData: res.data.userData });
        get().connectSocket();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      set({ userData: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async ({ userName, uniqueName, email, password }) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/api/auth/verifyUser", {
        userName,
        uniqueName,
        email,
        password,
      });
      if (res.data.success) {
        localStorage.setItem("email", res.data.email);
        set({ showOtpInput: true });
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  verifyOtp: async (otp) => {
    if (otp.length === 6) {
      const email = localStorage.getItem("email");
      set({ isSigningUp: true });
      try {
        const res = await axiosInstance.post("/api/auth/signup", {
          email,
          otp,
        });
        if (res.data.success) {
          localStorage.removeItem("email");
          set({ userData: res.data.userData });
          get().connectSocket();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        set({ isSigningUp: false });
      }
    }
  },

  login: async ({ uniqueName, password }) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/api/auth/login", {
        uniqueName,
        password,
      });
      if (res.data.success) {
        set({ userData: res.data.userData });
        get().connectSocket();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.get("/api/auth/logout");
      localStorage.removeItem("email");
      set({ userData: null });
      toast.success(res.data.message);
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.message);
    }
  },

  connectSocket: () => {
    const { userData } = get();
    if (!userData || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      query: {
        userId: userData._id,
      },
    });
    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
  setShowOtpInput: (value) => {
    set({ showOtpInput: value });
  },
}));
