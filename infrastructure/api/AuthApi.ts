import { AuthRepository } from "@/domain/repositories/AuthRepository";
import { firebase } from "@/infrastructure/firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export const authApi: AuthRepository = {
  signInUser: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );

      return { userCredential };
    } catch {
      throw new Error();
    }
  },

  signUpUser: async (email, password, userName) => {
    try {
      await createUserWithEmailAndPassword(firebase.auth, email, password).then(
        () => {
          if (firebase.auth?.currentUser) {
            updateProfile(firebase.auth.currentUser, {
              displayName: userName,
            }).catch((error) => {
              console.log("AuthProvider :: signUp - falha", error);
              throw new Error();
            });
          }
        }
      );

      return { success: true };
    } catch (error) {
      console.log("AuthProvider :: signUp - falha", error);
      throw new Error();
    }
  },

  logoutUser: async () => {
    try {
      await firebase.auth.signOut();
      return { success: true };
    } catch (error) {
      console.log("AuthProvider :: signUp - falha", error);
      throw new Error();
    }
  },
};
