import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const userSlice = createSlice({
  name: "offer",
  initialState,
  reducers: {
    stockOffer: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { stockOffer } = userSlice.actions;
export default userSlice.reducer;
