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
        const accessToken = data.accessToken;
        const name = data.name;
        const avatar = data.avatar;
        dispatch(login({ accessToken, name, avatar }));
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
      state.accessToken = action.payload.accessToken;
      state.name = action.payload.name;
      //state.email = action.payload;
      state.avatar = action.payload.avatar
        ? action.payload.avatar
        : "/images/placeholder-avatar.svg";
      //state.isVenueManager = action.payload;
      state.loginErrorMessage = "";
    },

    logout(state) {
      state.accessToken = "";
      state.name = "";
      state.email = "";
      state.avatar = "";
      state.isVenueManager = false;
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

export const { login, setAvatar, logout, loginErrorMessage } =
  authSlice.actions;
export default authSlice.reducer;
