import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/api";

const initialState = {
  name: "",
  email: "",
  avatar: "",
  isVenueManager: "",
  accessToken: "",
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await dispatch(
        api.endpoints.login.initiate(credentials)
      );
      if (data) {
        if (data.accessToken !== "") {
          dispatch(login(data.accessToken));
        }
      } else {
        return rejectWithValue("YOUU shall not pass.....Wroong credentials");
      }
    } catch (error) {
      return rejectWithValue(`Login fild with errr: ${error.message}`);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      console.log(action.payload);
      state.accessToken = action.payload;
    },
    logout(state) {
      state.accessToken = "";
      state.name = "";
      state.email = "";
      state.avatar = "";
      state.isVenueManager = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.rejected, (state, action) => {
      console.error("Login failed:", action.payload);
    });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
