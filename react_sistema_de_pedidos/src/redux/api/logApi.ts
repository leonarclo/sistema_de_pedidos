/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const logApi = createApi({
  reducerPath: "logApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1",
    mode: "cors",
    credentials: "same-origin",
    prepareHeaders: (headers) => {
      const accessToken = Cookies.get("access_token");
      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    pedidoRevisions: builder.query<[], number>({
      query(id) {
        return {
          url: `/revisions/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useLazyPedidoRevisionsQuery } = logApi;
