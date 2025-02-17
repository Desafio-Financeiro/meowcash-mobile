import { auth } from "@/firebase/config";
import { router } from "expo-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { createContext, ReactNode, useContext, useState } from "react";

interface IAuthContext {
  user: UserCredential | null;
  handleLogin: (email: string, password: string) => Promise<boolean>;
  handleSignUp: (email: string, password: string) => void;
  handleLogout: () => void;
  isAuthenticated: boolean;
  message: string;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserCredential | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState<string>("");

  const handleLogin = async (email: string, password: string) => {
    setMessage("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential);
      setIsAuthenticated(true);
      console.log("AuthProvider :: login - usuário logado com sucesso");
      setMessage("AuthProvider :: login - usuário logado com sucesso");
      router.replace("/profile");
      return true;
    } catch (error) {
      console.log("AuthProvider :: login - falha ao logar usuário", error);
      setMessage(`AuthProvider :: login - falha ao logar usuário >> ${error}`);
      return false;
    }
  };

  const handleSignUp = (email: string, password: string) => {
    setMessage("");

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.replace("/login");
        console.log("AuthProvider :: signUp - usuário cadastrado com sucesso");
        setMessage("AuthProvider :: signUp - usuário cadastrado com sucesso");
      })
      .catch((error) => {
        console.log("AuthProvider :: signUp - falha", error);
        setMessage(`AuthProvider :: signUp - falha >> ${error}`);
      });
  };

  const handleLogout = () => {
    setMessage("");
    console.log("AuthProvider :: logout - usuário deslogado com sucesso");
    setMessage("AuthProvider :: logout - usuário deslogado com sucesso");
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
        message,
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
