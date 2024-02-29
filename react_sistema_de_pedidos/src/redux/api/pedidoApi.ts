import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IArquivo,
  IItemPedidoRequest,
  IPedido,
  IPedidoCompleto,
  IProduto,
  IProdutoRequest,
  IQueryPedido,
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
    buscarPedidos: builder.query<IPedido[], IQueryPedido | undefined>({
      query(data) {
        const consultorParam = data?.consultor
          ? `?consultor=${data?.consultor}`
          : "";
        const consultorIdParam = data?.consultorId
          ? `&consultorId=${data?.consultorId}`
          : "";
        return {
          url: `/buscar-pedidos${consultorParam}${consultorIdParam}`,
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
    inserirPedido: builder.mutation<
      IPedido,
      { body: IPedidoCompleto; usuarioId?: number }
    >({
      query({ body, usuarioId }) {
        return {
          url: `/inserir-pedido/${usuarioId}`,
          method: "POST",
          body,
          credentials: "include",
        };
      },
    }),

    editarPedido: builder.mutation<
      IPedido,
      { body: IPedidoCompleto; usuarioId?: number; id: number; itemId?: number }
    >({
      query({ body, usuarioId, id, itemId }) {
        return {
          url: `/editar-pedido/${usuarioId}/${id}/${itemId}`,
          method: "POST",
          body,
          credentials: "include",
        };
      },
      transformResponse: (response: { data: IPedido }) => response.data,
    }),

    buscarProdutos: builder.query<IProduto[], void>({
      query() {
        return {
          url: "/buscar-produtos",
          method: "GET",
          credentials: "include",
        };
      },
    }),

    inserirProduto: builder.mutation<IProduto, IProdutoRequest>({
      query(body) {
        return {
          url: "/inserir-produto",
          method: "POST",
          body,
          credentials: "include",
        };
      },
    }),

    editarProduto: builder.mutation<
      IProduto,
      { body: IProdutoRequest; id: number }
    >({
      query({ body, id }) {
        return {
          url: `/editar-produto/${id}`,
          method: "POST",
          body,
          credentials: "include",
        };
      },
      transformResponse: (response: { data: IProduto }) => response.data,
    }),
    removerProduto: builder.mutation<IProduto, { id: number }>({
      query({ id }) {
        return {
          url: `/remover-produto/${id}`,
          method: "POST",
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  useBuscarPedidosQuery,
  useLazyBuscarItemQuery,
  useLazyBuscarArquivosQuery,
  useInserirPedidoMutation,
  useEditarPedidoMutation,
  useBuscarProdutosQuery,
  useEditarProdutoMutation,
  useInserirProdutoMutation,
  useRemoverProdutoMutation,
} = pedidoApi;
