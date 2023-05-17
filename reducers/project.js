import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { addProject } = projectSlice.actions;
export default projectSlice.reducer;
