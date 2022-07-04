import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  accessToken: string;
  refreshToken: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

const initialState: AuthState = {
  accessToken: "",
  refreshToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLogin: (state: AuthState, action: PayloadAction<LoginResponse>) => {
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        error: "",
      };
    },
    onSignOut: (state: AuthState) => {
      return {
        ...state,
        accessToken: "",
        refreshToken: "",
      };
    },
  },
});

export const { onLogin, onSignOut } = authSlice.actions;

export default authSlice.reducer;
