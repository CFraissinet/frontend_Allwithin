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
      state.value = state.value.filter(
        (project) => project.name === action.payload.name
      );
    },
    emptyStore: (state, action) => {
      state.value = [];
    },
  },
});

export const { addProject, removeProject, emptyStore } = projectSlice.actions;
export default projectSlice.reducer;
