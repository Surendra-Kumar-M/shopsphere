export interface User {
  id: string | number;

  username?: string;
  firstName?: string;
  lastName?: string;

  name?: string;

  email: string;

  image?: string;
  avatar?: string;

  gender?: string;
  phone?: string;

  provider?: "google" | "email";
}
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  isInitialized: boolean;

  isLoading: boolean;
  error: string | null;
}
