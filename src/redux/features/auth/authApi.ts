import { baseApi } from "../../hooks/baseApi";
import {  logout } from "./authSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ======================
    // LOGIN
    // ======================
    login: builder.mutation<
      any,
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // ======================
    // REGISTER
    // ======================
    register: builder.mutation<
      any,
      {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
      }
    >({
      query: (userData) => ({
        url: "/users/register", // ✅ REST standard
        method: "POST",
        body: userData,
      }),
    }),

    // ======================
    // REFRESH TOKEN
    // ======================
    refreshToken: builder.mutation<any, void>({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST",
      }),
    }),

    // ======================
    // LOGOUT
    // ======================
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),

      async onQueryStarted(_, { dispatch }) {
        dispatch(logout());
      },
    }),
  }),
});

// ✅ EXPORT ALL HOOKS (IMPORTANT)
export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
} = authApi;