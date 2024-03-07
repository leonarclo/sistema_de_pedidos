/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const filesApi = createApi({
  reducerPath: "filesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/files",
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
    upload: builder.mutation({
      query({ files: files, id: pedidoId }) {
        const idParam = pedidoId ? `?pedidoId=${pedidoId}` : "";
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append("file", files[i]);
        }
        return {
          url: `/upload${idParam}`,
          method: "POST",
          formData: true,
          body: formData,
        };
      },
    }),
    getFile: builder.query({
      query(filename) {
        return {
          url: `/${filename}`,
          method: "GET",
          responseHandler: (response: { blob: () => any }) => response.blob(),
          transformResponse: (responseBlob: Blob) => {
            return new Blob([responseBlob]);
          },
        };
      },
    }),
    delete: builder.mutation({
      query(filename) {
        return {
          url: `/delete/${filename}`,
          method: "POST",
        };
      },
    }),
  }),
});

export const { useUploadMutation, useLazyGetFileQuery, useDeleteMutation } =
  filesApi;
