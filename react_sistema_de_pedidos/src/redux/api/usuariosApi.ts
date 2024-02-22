import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUsuario, IUsuarioRequest } from "../../types";

export const usuariosApi = createApi({
  reducerPath: "usuariosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1",
  }),
  endpoints: (builder) => ({
    buscarUsuarios: builder.query<IUsuario[], void>({
      query() {
        return {
          url: "/buscar-usuarios",
          method: "GET",
        };
      },
    }),

    inserirUsuario: builder.query<IUsuario, IUsuarioRequest>({
      query(body) {
        return {
          url: "/inserir-usuario",
          method: "POST",
          body,
        };
      },
    }),
    editarUsuario: builder.query<
      IUsuario,
      { body: IUsuarioRequest; id: number }
    >({
      query({ body, id }) {
        return {
          url: `/editar-usuario/${id}`,
          method: "POST",
          body,
        };
      },
      transformResponse: (response: { data: IUsuario }) => response.data,
    }),
  }),
});

export const {
  useBuscarUsuariosQuery,
  useLazyInserirUsuarioQuery,
  useLazyEditarUsuarioQuery,
} = usuariosApi;
