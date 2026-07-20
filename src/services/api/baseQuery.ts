import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { ENV } from "@/config/env";
import { API_ENDPOINTS } from "@/services/api/constants";
import { mapAuthTokens } from "@/services/api/utils/authTokens.utils";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "@/services/storage/secureStorage";

import { logout } from "@/store/slices/authSlice";

interface RefreshResponse {
  accessToken?: string;
  token?: string;
  refreshToken?: string;
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: ENV.API_URL,
  prepareHeaders: async (headers) => {
    const token = await getAccessToken();

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status !== 401) {
    return result;
  }

  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    api.dispatch(logout());
    await clearTokens();
    return result;
  }

  const refreshResult = await rawBaseQuery(
    {
      url: API_ENDPOINTS.REFRESH,
      method: "POST",
      body: { refreshToken },
    },
    api,
    extraOptions,
  );

  if (!refreshResult.data) {
    api.dispatch(logout());
    await clearTokens();
    return result;
  }

  const data = refreshResult.data as RefreshResponse;

  await setTokens(mapAuthTokens(data));

  result = await rawBaseQuery(args, api, extraOptions);

  return result;
};

export const baseQuery = baseQueryWithReauth;
