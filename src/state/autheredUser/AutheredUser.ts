import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthorized: boolean;
  currentUser: string | null;
}

const initialAuthState: AuthState = {
  isAuthorized: false,
  currentUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    LoginMethod(state, action: PayloadAction<string>) {
      state.isAuthorized = true;
      state.currentUser = action.payload;
    },
    LogoutMethod(state) {
      state.isAuthorized = false;
      state.currentUser = null;
    },
  },
});

export const { LoginMethod, LogoutMethod } = authSlice.actions;
export const authReducer = authSlice.reducer;
