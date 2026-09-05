import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import { store } from "@/store";
import { setCredentials, setInitialized, setUser } from "@/store/slices/authSlice";
import { mapFirebaseUser } from "@/services/firebase/mapFirebaseUser";

export const initializeAuthListener = (onComplete?: () => void) => {
  return onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      const user = mapFirebaseUser(firebaseUser);
      store.dispatch(setCredentials({ user, isAuthenticated: true }));
    } else {
      store.dispatch(setUser(null));
    }
    store.dispatch(setInitialized(true));
    if (onComplete) {
      onComplete();
    }
  });
};
