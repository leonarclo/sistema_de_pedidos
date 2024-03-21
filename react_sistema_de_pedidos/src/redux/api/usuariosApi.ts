import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUsuario, IUsuarioRequest } from "../../types";
import Cookies from "js-cookie";

export const usuariosApi = createApi({
  tagTypes: ["Usuario"],
  reducerPath: "usuariosApi",
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
    buscarUsuarios: builder.query<IUsuario[], number | undefined>({
      query(id) {
        return {
          url: `/buscar-usuarios/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["Usuario"],
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
      invalidatesTags: ["Usuario"],
      transformResponse: (response: { data: IUsuario }) => response.data,
    }),
  }),
});

export const { useLazyBuscarUsuariosQuery, useEditarUsuarioMutation } =
  usuariosApi;
