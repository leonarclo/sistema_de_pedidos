import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IArquivo, IItemPedido, IPedido, IPedidoCompleto } from "../../types";

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
    inserirPedido: builder.query<IPedido, IPedidoCompleto>({
      query(body) {
        return {
          url: "/inserir-pedido",
          method: "POST",
          body,
        };
      },
    }),

    editarPedido: builder.query<IPedido, { body: IPedidoCompleto; id: number }>(
      {
        query({ body, id }) {
          return {
            url: `/editar-pedido/${id}`,
            method: "POST",
            body,
          };
        },
        transformResponse: (response: { data: IPedido }) => response.data,
      }
    ),
  }),
});

export const {
  useBuscarPedidosQuery,
  useLazyBuscarItemQuery,
  useLazyBuscarArquivosQuery,
  useLazyInserirPedidoQuery,
  useLazyEditarPedidoQuery,
} = pedidoApi;
