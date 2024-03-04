import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const filesApi = createApi({
  reducerPath: "filesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/files",
    mode: "cors",
    credentials: "same-origin",
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    upload: builder.mutation({
      query(files) {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append("file", files[i]);
        }
        return {
          url: `/upload`,
          method: "POST",
          formData: true,
          body: formData,
        };
      },
    }),
  }),
});

export const { useUploadMutation } = filesApi;
