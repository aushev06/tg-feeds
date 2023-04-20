import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {

  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = user.actions;
export const { reducer: userReducer } = user;

export const selectUser = state => {
    return state.user.user;
};

