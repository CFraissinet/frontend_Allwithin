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
    removeProject: (state, action) => {
      state.value = [];
      // state.value = state.value.filter(project => project.name === action.payload.name);
    },
  },
});

export const { addProject, removeProject } = projectSlice.actions;
export default projectSlice.reducer;
