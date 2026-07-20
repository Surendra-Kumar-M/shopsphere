import { Platform } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

import { AUTH_STORAGE_KEYS } from "@/constants/auth";
import { AuthTokens } from "@/models/User";

const useSecureStore = Platform.OS !== "web";

async function getItem(key: string): Promise<string | null> {
  if (useSecureStore) {
    return SecureStore.getItemAsync(key);
  }

  return AsyncStorage.getItem(key);
}

async function setItem(key: string, value: string): Promise<void> {
  if (useSecureStore) {
    await SecureStore.setItemAsync(key, value);
    return;
  }

  await AsyncStorage.setItem(key, value);
}

async function deleteItem(key: string): Promise<void> {
  if (useSecureStore) {
    await SecureStore.deleteItemAsync(key);
    return;
  }

  await AsyncStorage.removeItem(key);
}

export async function getAccessToken(): Promise<string | null> {
  return getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
}

export async function getRefreshToken(): Promise<string | null> {
  return getItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
}

export async function setTokens(tokens: AuthTokens): Promise<void> {
  await Promise.all([
    setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken),
    setItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken),
  ]);
}

export async function clearTokens(): Promise<void> {
  await Promise.all([
    deleteItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN),
    deleteItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN),
  ]);
}
