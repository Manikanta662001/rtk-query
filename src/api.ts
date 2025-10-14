import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query<any, void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
  }),
});
export const { useGetUsersQuery } = api;
