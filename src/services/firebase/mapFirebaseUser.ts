import { User } from "@/models/User";
import { User as FirebaseUser } from "firebase/auth";

export const mapFirebaseUser = (firebaseUser: FirebaseUser): User => ({
  id: firebaseUser.uid,
  username: firebaseUser.displayName ?? "",
  email: firebaseUser.email ?? "",
  firstName: firebaseUser.displayName?.split(" ")[0] ?? "",
  lastName: firebaseUser.displayName?.split(" ").slice(1).join(" ") ?? "",
  gender: "",
  image: firebaseUser.photoURL ?? "",
});
