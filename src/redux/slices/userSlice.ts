import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  accessToken: string;
  refreshToken: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

const initialState: UserState = {
  accessToken: "",
  refreshToken: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    onLogin: (state: UserState, action: PayloadAction<LoginResponse>) => {
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        error: "",
      };
    },
    onSignOut: (state: UserState) => {
      return {
        ...state,
        accessToken: "",
        refreshToken: "",
      };
    },
  },
});

export const { onLogin, onSignOut } = userSlice.actions;

export default userSlice.reducer;
