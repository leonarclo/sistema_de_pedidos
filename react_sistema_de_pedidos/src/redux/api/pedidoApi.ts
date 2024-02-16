import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IArquivo,
  IItemPedido,
  IItemPedidoRequest,
  IItemPedidoUpdate,
  IPedido,
  IPedidoRequest,
  IPedidoUpdate,
} from "../../types";

export const pedidoApi = createApi({
  reducerPath: "pedidoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1",
  }),
  endpoints: (builder) => ({
    buscarPedidos: builder.query<IPedido[], void>({
      query() {
        return {
          url: "/buscar-pedidos",
          method: "GET",
        };
      },
    }),
    buscarItem: builder.query<IItemPedido[], void>({
      query(chave) {
        return {
          url: `/buscar-item?chave=${chave}`,
          method: "GET",
        };
      },
    }),
    buscarArquivos: builder.query<IArquivo[], void>({
      query(chave) {
        return {
          url: `/buscar-arquivos?chave=${chave}`,
          method: "GET",
        };
      },
    }),
    inserirPedido: builder.query<IPedido, IPedidoRequest>({
      query(body) {
        return {
          url: "/inserir-pedido",
          method: "POST",
          body,
        };
      },
    }),
    inserirItemPedido: builder.query<IItemPedido, IItemPedidoRequest[]>({
      query(body) {
        return {
          url: "/inserir-item",
          method: "POST",
          body,
        };
      },
    }),
    inserirArquivo: builder.query<IArquivo, IArquivo[]>({
      query(body) {
        return {
          url: "/inserir-arquivo",
          method: "POST",
          body,
        };
      },
    }),
    editarPedido: builder.query<IPedido, IPedidoUpdate>({
      query(body) {
        return {
          url: "/editar-pedido",
          method: "POST",
          body,
        };
      },
      transformResponse: (response: { data: IPedido }) => response.data,
    }),
    editarItem: builder.query<IItemPedido, IItemPedidoUpdate[]>({
      query(body) {
        return {
          url: "/editar-item",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useBuscarPedidosQuery,
  useLazyBuscarItemQuery,
  useLazyBuscarArquivosQuery,
  useLazyInserirPedidoQuery,
  useLazyInserirItemPedidoQuery,
  useLazyInserirArquivoQuery,
  useLazyEditarPedidoQuery,
  useLazyEditarItemQuery,
} = pedidoApi;
