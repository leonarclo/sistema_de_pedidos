import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IArquivo,
  IItemPedidoRequest,
  IPedido,
  IPedidoCompleto,
} from "../../types";

export const pedidoApi = createApi({
  reducerPath: "pedidoApi",
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
  endpoints: (builder) => ({
    buscarPedidos: builder.query<IPedido[], string | undefined | void>({
      query(consultor) {
        const queryParam = consultor ? `?consultor=${consultor}` : "";
        return {
          url: `/buscar-pedidos${queryParam}`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
    buscarItem: builder.query<IItemPedidoRequest[], void>({
      query(chave) {
        return {
          url: `/buscar-item?chave=${chave}`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
    buscarArquivos: builder.query<IArquivo[], void>({
      query(chave) {
        return {
          url: `/buscar-arquivos?chave=${chave}`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
    inserirPedido: builder.query<IPedido, IPedidoCompleto>({
      query(body) {
        return {
          url: "/inserir-pedido",
          method: "POST",
          body,
          credentials: "include",
        };
      },
    }),

    editarPedido: builder.query<
      IPedido,
      { body: IPedidoCompleto; id: number; itemId?: number }
    >({
      query({ body, id, itemId }) {
        return {
          url: `/editar-pedido/${id}/${itemId}`,
          method: "POST",
          body,
          credentials: "include",
        };
      },
      transformResponse: (response: { data: IPedido }) => response.data,
    }),
  }),
});

export const {
  useBuscarPedidosQuery,

  useLazyBuscarItemQuery,
  useLazyBuscarArquivosQuery,
  useLazyInserirPedidoQuery,
  useLazyEditarPedidoQuery,
} = pedidoApi;
