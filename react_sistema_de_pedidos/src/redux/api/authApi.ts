import { ILogin, ITokenResponse, IUsuario, IUsuarioRequest } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserState } from "../features/authSlice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1",
    mode: "cors",
    credentials: "same-origin",
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
        headers.set("Content-Type", "application/json; charset-utf=8");
      }

      return headers;
    },
  }),
  tagTypes: ["ILogin", "ITokenResponse", "IUsuario", "IUsuarioRequest"],
  endpoints: (builder) => ({
    login: builder.mutation<ITokenResponse, ILogin>({
      query(body) {
        return {
          url: "/login",
          method: "POST",
          body,
          credentials: "include",
        };
      },
    }),
    registrar: builder.mutation<IUsuario, IUsuarioRequest>({
      query(body) {
        return {
          url: "/registrar",
          method: "POST",
          body,
          credentials: "include",
        };
      },
    }),
    logout: builder.mutation<void, void>({
      query() {
        return {
          url: "/logout",
          method: "POST",
          credentials: "include",
        };
      },
    }),

    getMe: builder.query<IUsuario, void>({
      query() {
        return {
          url: "/me",
          method: "GET",
          credentials: "same-origin",
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(getUserState(data));
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrarMutation,
  useLogoutMutation,
  useGetMeQuery,
} = authApi;
