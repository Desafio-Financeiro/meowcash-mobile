import { auth } from "@/firebase/config";
import { router } from "expo-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { createContext, ReactNode, useContext, useState } from "react";
import { ToastAndroid } from "react-native";

interface IAuthContext {
  user: UserCredential | null;
  handleLogin: (email: string, password: string) => Promise<boolean>;
  handleSignUp: (email: string, password: string) => void;
  handleLogout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserCredential | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential);
      setIsAuthenticated(true);
      ToastAndroid.show("Usuário logado com sucesso", ToastAndroid.SHORT);
      console.log("AuthProvider :: login - usuário logado com sucesso");
      router.replace("/profile");
      return true;
    } catch (error) {
      ToastAndroid.show("Falha ao logar usuário", ToastAndroid.SHORT);
      console.log("AuthProvider :: login - falha ao logar usuário", error);
      return false;
    }
  };

  const handleSignUp = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.replace("/login");
        ToastAndroid.show("Usuário cadastrado com sucesso", ToastAndroid.SHORT);
        console.log("AuthProvider :: signUp - usuário cadastrado com sucesso");
      })
      .catch((error) => {
        ToastAndroid.show("Falha ao cadastrar usuário", ToastAndroid.SHORT);
        console.log("AuthProvider :: signUp - falha", error);
      });
  };

  const handleLogout = () => {
    console.log("AuthProvider :: logout - usuário deslogado com sucesso");
    ToastAndroid.show("Usuário deslogado com sucesso", ToastAndroid.SHORT);
    auth.signOut();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleLogin,
        handleSignUp,
        handleLogout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "Contexto não encontado, useAuth deve estar dentro de AuthProvider"
    );
  }
  return context;
};
