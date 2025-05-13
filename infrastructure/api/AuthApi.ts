import { AuthRepository } from "@/domain/repositories/AuthRepository";
import { auth } from "@/infrastructure/firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export const authApi: AuthRepository = {
  signInUser: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
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
      await createUserWithEmailAndPassword(auth, email, password).then(() => {
        if (auth?.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: userName,
          }).catch((error) => {
            console.log("AuthProvider :: signUp - falha", error);
            throw new Error();
          });
        }
      });

      return { success: true };
    } catch (error) {
      console.log("AuthProvider :: signUp - falha", error);
      throw new Error();
    }
  },

  logoutUser: async () => {
    try {
      await auth.signOut();
      return { success: true };
    } catch (error) {
      console.log("AuthProvider :: signUp - falha", error);
      throw new Error();
    }
  },
};
