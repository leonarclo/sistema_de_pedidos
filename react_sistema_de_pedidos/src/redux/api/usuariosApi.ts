import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUsuario, IUsuarioRequest } from "../../types";

export const usuariosApi = createApi({
  reducerPath: "usuariosApi",
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
    buscarUsuarios: builder.query<IUsuario[], void>({
      query() {
        return {
          url: "/buscar-usuarios",
          method: "GET",
          credentials: "include",
        };
      },
    }),
    editarUsuario: builder.mutation<
      IUsuario,
      { body: IUsuarioRequest; id: number }
    >({
      query({ body, id }) {
        return {
          url: `/editar-usuario/${id}`,
          method: "POST",
          body,
          credentials: "include",
        };
      },
      transformResponse: (response: { data: IUsuario }) => response.data,
    }),
  }),
});

export const { useBuscarUsuariosQuery, useEditarUsuarioMutation } = usuariosApi;
