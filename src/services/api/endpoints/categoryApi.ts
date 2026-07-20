import { CATEGORY_IMAGES } from "@/constants/home";
import { api } from "../api";
import { API_ENDPOINTS } from "../constants";

import { Category } from "@/models/Category";

export const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => API_ENDPOINTS.CATEGORIES,

      transformResponse: (
        response: {
          slug: string;
          name: string;
          url: string;
        }[],
      ): Category[] =>
        response.map((category) => ({
          id: category.slug,
          slug: category.slug,
          name: category.name,
          url: category.url,
          image: CATEGORY_IMAGES[category.slug],
        })),

      providesTags: ["Category"],
    }),

  }),
});

export const { useGetCategoriesQuery } =
  categoryApi;

  