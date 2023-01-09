import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../../types/api";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: "include",
  }),
  endpoints: (build) => ({
    emailLogin: build.mutation<User, Partial<User>>({
      query: (body) => ({
        url: "auth/email_login",
        method: "POST",
        body,
      }),
    }),
    emailRegister: build.mutation<User, Partial<User>>({
      query: (body) => ({
        url: "auth/email_register",
        method: "POST",
        body,
      }),
    }),
    logout: build.mutation<any, User>({
      query: (body) => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useEmailLoginMutation,
  useEmailRegisterMutation,
  useLogoutMutation,
} = authApi;
