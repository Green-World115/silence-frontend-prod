/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
  },

  extraReducers: {},
});

export const selectUser = (state) => state.user;
export const selectUserId = (state) => state.user.id;

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
