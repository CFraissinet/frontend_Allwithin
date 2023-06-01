import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { token: null, avatar: null },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = {
        token: action.payload.token,
        avatar: action.payload.avatar,
      };
    },
    logout: (state) => {
      state.value.token = null;
      state.value.avatar = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
