/** Vendor */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/** Slice */
export const appReducer = createSlice({
  name: "app",
  initialState: {
    isLoading: false,
    isLoggedIn: false,
    username: "",
  },
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setUserProfile: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsLoggedIn, setUserProfile, setIsLoading } = appReducer.actions;

export default appReducer.reducer;
