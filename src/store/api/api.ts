import { ENV } from "@/config/env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: ENV.API_URL,
  }),

  tagTypes: ["Product", "Category", "User", "Cart"],

  endpoints: () => ({}),
});
