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
          address,
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
    resendCode: builder.mutation({
      query: ({ email, oldToken }) => ({
        url: "/api/v1/users/resend-email-verification",
        method: "POST",
        body: { email, oldToken },
      }),
    }),
    sendResetCode: builder.mutation({
      query: (email) => ({
        url: "/api/v1/users/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ email, code, newPassword, confirmPassword }) => ({
        url: `/api/v1/users/set-new-password?token=${code}`,
        method: "PUT",
        body: { email, newPassword, confirmPassword },
      }),
    }),
    resendResetPasswordCode: builder.mutation({
      query: ({ email, oldToken }) => ({
        url: "/api/v1/users/resend-password-reset-token",
        method: "POST",
        body: { email, oldToken },
      }),
    }),
  }),
});

export const {
  useGetLoginMutation,
  useUserDataOfTokenQuery,
  useUserRegisterMutation,
  useVerifyRegistrationMutation,
  useResendCodeMutation,
  useSendResetCodeMutation,
  useResetPasswordMutation,
  useResendResetPasswordCodeMutation,
} = authApi;
