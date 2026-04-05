import { createSlice, type PayloadAction  } from "@reduxjs/toolkit";

type TUser = {
  id: string;
  email?: string;
};

type TAuthState = {
  user: TUser | null;
  token: string | null;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: TUser; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },

    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, setToken, setCredentials, logout } =
  authSlice.actions;

export default authSlice.reducer;