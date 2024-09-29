import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: {
    token: null,
    user_id: "",
    username: "",
    firstname: "",
    lastname: "",
    school: "",
    email: "",
    gender: "",
    role: "",
    avatar: "",
    created_at: "",
  },
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    USER_LOGIN_SUCCESS: (state, action) => {
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        account: {
          token: localStorage.getItem("token") || null,
          user_id: action.payload.user.user_id,
          username: action.payload.user.username,
          firstname: action.payload.user.firstname,
          lastname: action.payload.user.lastname,
          school: action.payload.user.school,
          email: action.payload.user.email,
          gender: action.payload.user.gender,
          role: action.payload.user.role,
          avatar: action.payload.user.avatar,
          created_at: action.payload.user.created_at,
        },
        isAuthenticated: true, // Set authentication status to true
      };
    },
    USER_LOGOUT_SUCCESS: (state) => {
      state.account = {
        token: null,
        user_id: "",
        username: "",
        firstname: "",
        lastname: "",
        school: "",
        email: "",
        gender: "",
        role: "",
        avatar: "",
        created_at: "",
      };
      state.isAuthenticated = false;
    },
  },
});

export const { USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } = userSlice.actions;
export default userSlice.reducer;
