import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSendingMessage: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/api/user/getFriendsUserData");
      if (res.data.success) {
        set({ users: res.data.friends });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/api/message/getMessages/${userId}`);
      if (res.data.success) {
        set({ messages: res.data.messages });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    set({ isSendingMessage: true });
    try {
      const res = await axiosInstance.post(`/api/message/sendMessage`, {
        receiverId: selectedUser._id,
        message: messageData,
      });
      if (res.data.success) {
        set({ messages: [...messages, res.data.message] });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isSendingMessage: false });
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
