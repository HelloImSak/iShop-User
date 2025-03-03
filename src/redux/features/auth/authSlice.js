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
    userRegister: builder.mutation({
      query: ({
        username,
        phoneNumber,
        email,
        password,
        confirmPassword,
        address,
        profile,
      }) => ({
        url: "/api/v1/users/user-signup",
        method: "POST",
        body: {
          username,
          phoneNumber,
          email,
          password,
          confirmPassword,
          address, // Should be an object like { addressLine1, addressLine2, road, linkAddress }
          profile,
        },
      }),
    }),
    verifyRegistration: builder.mutation({
      query: (token) => ({
        url: `/api/v1/users/verify-email?token=${token}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetLoginMutation,
  useUserDataOfTokenQuery,
  useUserRegisterMutation,
  useVerifyRegistrationMutation,
} = authApi;
