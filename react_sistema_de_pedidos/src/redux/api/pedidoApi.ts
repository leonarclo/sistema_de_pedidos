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
import Cookies from "js-cookie";

export const pedidoApi = createApi({
  tagTypes: ["Pedidos", "Produtos"],
  reducerPath: "pedidoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_BASE_URL_API}`,
    mode: "cors",
    credentials: "same-origin",
    prepareHeaders: (headers) => {
      const accessToken = Cookies.get("access_token");
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
        const consultorIdParam = data?.consultorId
          ? `consultorId=${data?.consultorId}`
          : "";
        const cnpjParam = data?.cnpj ? `cnpj=${data?.cnpj}` : "";
        return {
          url: `/buscar-pedidos${
            consultorIdParam ? `?${consultorIdParam}` : `?${cnpjParam}`
          }`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["Pedidos"],
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
    buscarArquivos: builder.query<IArquivo[], string | undefined>({
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
      invalidatesTags: ["Pedidos"],
    }),

    editarPedido: builder.mutation<
      IPedido,
      { body: IPedidoCompleto; usuarioId?: number; id: number; itemId?: number }
    >({
      query({ body, usuarioId, id, itemId }) {
        return {
          url: `/editar-pedido/${usuarioId}/${id}/${itemId}`,
          method: "PATCH",
          body,
          credentials: "include",
        };
      },
      transformResponse: (response: { data: IPedido }) => response.data,
      invalidatesTags: ["Pedidos"],
    }),

    buscarProdutos: builder.query<IProduto[], void | boolean>({
      query() {
        return {
          url: "/buscar-produtos",
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["Produtos"],
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
      invalidatesTags: ["Produtos"],
    }),

    editarProduto: builder.mutation<
      IProduto,
      { body: IProdutoRequest; id: number | undefined }
    >({
      query({ body, id }) {
        return {
          url: `/editar-produto/${id}`,
          method: "POST",
          body,
          credentials: "include",
        };
      },
      invalidatesTags: ["Produtos"],
      transformResponse: (response: { data: IProduto }) => response.data,
    }),
    removerProduto: builder.mutation<IProduto, { id: number | undefined }>({
      query({ id }) {
        return {
          url: `/remover-produto/${id}`,
          method: "POST",
          credentials: "include",
        };
      },
      invalidatesTags: ["Produtos"],
    }),
  }),
});

export const {
  useLazyBuscarPedidosQuery,
  useBuscarPedidosQuery,
  useLazyBuscarItemQuery,
  useLazyBuscarArquivosQuery,
  useBuscarArquivosQuery,
  useLazyBuscarProdutosQuery,
  useInserirPedidoMutation,
  useEditarPedidoMutation,
  useBuscarProdutosQuery,
  useEditarProdutoMutation,
  useInserirProdutoMutation,
  useRemoverProdutoMutation,
} = pedidoApi;
