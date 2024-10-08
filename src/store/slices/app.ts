/** Vendor */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/** Slice */
export const appReducer = createSlice({
  name: "app",
  initialState: {
    isLoading: false,
    isAuthenticated: false,
    isSearchActive: false,
    resetSearchInput: false,
    username: "",
  },
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setIsSearchActive: (state, action: PayloadAction<boolean>) => {
      state.isSearchActive = action.payload;
    },
    setResetSearchInput: (state, action: PayloadAction<boolean>) => {
      state.resetSearchInput = action.payload;
    },
    setUserProfile: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsLoading, setIsAuthenticated, setIsSearchActive, setResetSearchInput, setUserProfile } =
  appReducer.actions;

export default appReducer.reducer;
