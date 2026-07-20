import { AuthTokens } from "@/models/User";

export interface AuthTokenApiResponse {
  accessToken?: string;
  token?: string;
  refreshToken?: string;
}

export function mapAuthTokens(response: AuthTokenApiResponse): AuthTokens {
  const accessToken = response.accessToken ?? response.token;
  const refreshToken = response.refreshToken;

  if (!accessToken || !refreshToken) {
    throw new Error("Invalid authentication response from server.");
  }

  return {
    accessToken,
    refreshToken,
  };
}
