import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/api";

const initialState = {
  name: "",
  email: "",
  avatar: "",
  isVenueManager: "false",
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
        return rejectWithValue("Incorrect credentials");
      }
    } catch (error) {
      return rejectWithValue(`Login failed with error: ${error.message}`);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      console.log(action.payload);
      state.accessToken = action.payload.accessToken;
    },
    logout(state) {
      state.accessToken = "";
      state.name = "";
      state.email = "";
      state.avatar = "";
      state.isVenueManager = "false";
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
