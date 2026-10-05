import { api } from "../api";
import { API_ENDPOINTS } from "../constants";

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => API_ENDPOINTS.PRODUCTS,
      providesTags: ["Product"],
    }),

    getProductById: builder.query({
      query: (id: number) => `products/${id}`,
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
