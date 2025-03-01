import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_AUTH_ENDPOINT,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken"); // ✅ Retrieve token from localStorage
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // ✅ Set Bearer token
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getLogin: builder.mutation({
      query: ({ email, password }) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    userDataOfToken: builder.query({
      query: () => ({
        url: "/api/v1/users/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetLoginMutation, useUserDataOfTokenQuery } = authApi;
