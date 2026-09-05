import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "@/config/firebase";

export const getFirebaseErrorMessage = (error: unknown): string => {
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as { code: string }).code;
    switch (code) {
      case "auth/invalid-credential":
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Invalid email or password. Please try again.";
      case "auth/email-already-in-use":
        return "An account with this email address already exists.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/weak-password":
        return "Password should be at least 6 characters long.";
      case "auth/network-request-failed":
        return "Network connection error. Please check your connection.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later.";
      default:
        return (error as { message?: string }).message || "Authentication failed. Please try again.";
    }
  }
  return "An unexpected error occurred. Please try again.";
};

export const loginWithEmail = async (
  email: string,
  pass: string,
): Promise<FirebaseUser> => {
  const credential = await signInWithEmailAndPassword(auth, email, pass);
  return credential.user;
};

export const registerWithEmail = async (
  email: string,
  pass: string,
  displayName?: string,
): Promise<FirebaseUser> => {
  const credential = await createUserWithEmailAndPassword(auth, email, pass);
  if (displayName && credential.user) {
    await updateProfile(credential.user, { displayName });
  }
  return credential.user;
};

export const resetPassword = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email);
};

export const signOutUser = async (): Promise<void> => {
  await signOut(auth);
};
