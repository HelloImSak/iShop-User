import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_AUTH_ENDPOINT,
  }),
  endpoints: (builder) => ({
    getLogin: builder.mutation({
      query: ({ email, password }) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    userToken: builder.mutation({
      query: (token) => ({
        url: "/api/v1/users/me",
        method: "POST",
        body: { token },
      }),
    }),
  }),
});

export const { useGetLoginMutation, useUserTokenMutation } = authApi;
