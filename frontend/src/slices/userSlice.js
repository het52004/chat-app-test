import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const login = createAsyncThunk("user/login", async (data, thunkAPI) => {
  const { uniqueName, password } = data;
  if (!uniqueName || !password) {
    toast.error("You must fill all the details!");
  } else {
    try {
      const response = await axiosInstance.post("/api/auth/login", {
        uniqueName,
        password,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        return {
          userData: response.data.userData,
          loggedIn: response.data.success,
        };
      } else {
        toast.error(response.data.message);
        return thunkAPI.rejectWithValue(response.data.message);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: {},
    loading: false,
    isLoggedin: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.userData;
        state.isLoggedin = action.payload.loggedIn;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
