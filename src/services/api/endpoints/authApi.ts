import { api } from "../api";
import { API_ENDPOINTS } from "../constants";

import { AUTH_TOKEN_EXPIRY_MINS } from "@/constants/auth";
import { AuthTokens, User } from "@/models/User";

import { mapAuthTokens } from "../utils/authTokens.utils";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginApiResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken?: string;
  token?: string;
  refreshToken?: string;
}

interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

interface RegisterApiResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface LoginResult {
  user: User;
  tokens: AuthTokens;
}

const mapUser = (response: LoginApiResponse | RegisterApiResponse): User => ({
  id: response.id,
  username: response.username,
  email: response.email,
  firstName: response.firstName,
  lastName: response.lastName,
  gender: "gender" in response ? response.gender : "",
  image: "image" in response ? response.image : "",
});

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResult, LoginRequest>({
      query: (body) => ({
        url: API_ENDPOINTS.LOGIN,
        method: "POST",
        body: {
          ...body,
          expiresInMins: AUTH_TOKEN_EXPIRY_MINS,
        },
      }),
      transformResponse: (response: LoginApiResponse): LoginResult => ({
        user: mapUser(response),
        tokens: mapAuthTokens(response),
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    register: builder.mutation<User, RegisterRequest>({
      query: (body) => ({
        url: API_ENDPOINTS.REGISTER,
        method: "POST",
        body,
      }),
      transformResponse: mapUser,
    }),

    getMe: builder.query<User, void>({
      query: () => API_ENDPOINTS.ME,
      transformResponse: (response: LoginApiResponse): User => mapUser(response),
      providesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetMeQuery } = authApi;
