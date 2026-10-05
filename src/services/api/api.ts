import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "./baseQuery";

export const api = createApi({
  reducerPath: "api",

  baseQuery,

  tagTypes: [
    "Auth",
    "User",
    "Product",
    "Category",
    "Cart",
    "Wishlist",
    "Order",
  ],

  endpoints: () => ({}),
});
