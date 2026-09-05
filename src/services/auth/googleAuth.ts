import { GoogleSignin, isErrorWithCode, statusCodes } from "@react-native-google-signin/google-signin";
import {
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";

import { auth } from "@/config/firebase";

GoogleSignin.configure({
  webClientId:
    process.env.EXPO_PUBLIC_FIREBASE_WEB_CLIENT_ID || "145675054422-unk1ahmi8m7cl5tjntg58904qmg4soqj.apps.googleusercontent.com",
});

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();

    const userInfo = await GoogleSignin.signIn();

    if (userInfo.type === 'cancelled') {
      throw new Error("User cancelled the login flow.");
    }

    const idToken = userInfo.data?.idToken;

    if (!idToken) {
      throw new Error("Google ID Token not found.");
    }

    const credential = GoogleAuthProvider.credential(idToken);

    const result = await signInWithCredential(auth, credential);

    return result.user;
  } catch (error) {
    if (isErrorWithCode(error)) {
      if (error.code === statusCodes.IN_PROGRESS) {
        throw new Error("Sign in is in progress already.");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        throw new Error("Play services not available or outdated.");
      }
    }
    throw error;
  }
};