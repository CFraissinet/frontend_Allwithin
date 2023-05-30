import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: ["yo"],
};

export const userSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    stockLocation: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { stockLocation } = userSlice.actions;
export default userSlice.reducer;
