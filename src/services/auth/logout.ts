import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { store } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { clearTokens } from "@/services/storage/secureStorage";

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.warn("Firebase signout error:", err);
  }
  await clearTokens();
  store.dispatch(logout());
};
