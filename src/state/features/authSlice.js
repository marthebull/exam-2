import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/api";

const initialState = {
  name: "",
  email: "",
  avatar: "",
  isVenueManager: false,
  accessToken: "",
  loginErrorMessage: "",
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { dispatch, rejectWithValue }) => {
    const { data, error } = await dispatch(
      api.endpoints.login.initiate(credentials)
    );

    if (data) {
      if (data.accessToken !== "") {
        dispatch(login(data.accessToken));
      }
    } else {
      // Set loginError in state to error message from API whenever login fails.
      // Use this string to output front end.
      dispatch(loginErrorMessage(error.data.errors[0].message));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.accessToken = action.payload;
      state.name = action.payload;
      state.email = action.payload;
      state.avatar = action.payload;
      state.isVenueManager = action.payload;
      state.loginErrorMessage = "";
    },
    logout(state) {
      state.accessToken = "";
      state.name = "";
      state.email = "";
      state.avatar = "";
      state.isVenueManager = "false";
    },
    loginErrorMessage(state, action) {
      state.loginErrorMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.rejected, (state, action) => {
      console.error("Login failed:", action.payload);
    });
  },
});

export const { login, logout, loginErrorMessage } = authSlice.actions;
export default authSlice.reducer;
