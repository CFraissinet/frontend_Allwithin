import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const userSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    stockJob: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { stockJob } = userSlice.actions;
export default userSlice.reducer;
