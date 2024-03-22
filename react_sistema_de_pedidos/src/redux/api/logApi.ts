/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const logApi = createApi({
  reducerPath: "logApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_BASE_URL_API}`,
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
    pedidoRevisions: builder.query<string[], number>({
      query(id) {
        return {
          url: `/pedido-revisions/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
    itemRevisions: builder.query<string[], number>({
      query(id) {
        return {
          url: `/item-revisions/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
    arquivoRevisions: builder.query<string[], number>({
      query(id) {
        return {
          url: `/arquivo-revisions/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
    produtoRevisions: builder.query<string[], number>({
      query(id) {
        return {
          url: `/produto-revisions/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
    usuarioRevisions: builder.query<string[], number>({
      query(id) {
        return {
          url: `/usuario-revisions/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  useLazyPedidoRevisionsQuery,
  useLazyItemRevisionsQuery,
  useLazyArquivoRevisionsQuery,
} = logApi;
