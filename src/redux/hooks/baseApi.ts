import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { logout, setToken } from "../features/auth/authSlice";

const baseURL = "http://localhost:5001/api/v1";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as any;

    const token = state?.auth?.token || Cookies.get("token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// 🔥 auto refresh token logic
const baseQueryWithReauth: typeof rawBaseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (
    result.error?.status === 401 &&
    (args as any)?.url !== "/auth/refresh-token"
  ) {
    const refreshResult = await rawBaseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const newAccessToken = (refreshResult.data as any)?.data?.accessToken;

      if (newAccessToken) {
        // ✅ store new token
        api.dispatch(setToken(newAccessToken));

        // 🔁 retry original request
        result = await rawBaseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth"],
  endpoints: () => ({}),
});