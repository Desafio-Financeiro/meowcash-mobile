import { auth } from "@/firebase/config";
import { useNavigation } from "@react-navigation/native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  updateProfile,
} from "firebase/auth";
import { createContext, ReactNode, useContext, useState } from "react";
import Toast from "react-native-toast-message";

interface IAuthContext {
  user: User | undefined;
  handleLogin: (email: string, password: string) => Promise<boolean>;
  handleSignUp: (email: string, password: string, userName: string) => void;
  handleLogout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState<User | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      setIsAuthenticated(true);
      navigation.navigate("Home" as never);
      return true;
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Falha ao logar usuário",
        position: "bottom",
      });
      console.log("AuthProvider :: login - falha ao logar usuário", error);
      return false;
    }
  };

  const handleSignUp = (email: string, password: string, userName: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (auth?.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: userName,
          })
            .then(() => {
              navigation.navigate("Login" as never);
              Toast.show({
                type: "success",
                text1: "Usuário cadastrado com sucesso",
                position: "bottom",
              });
            })
            .catch((error) => {
              Toast.show({
                type: "error",
                text1: "Falha ao cadastrar usuário",
                position: "bottom",
              });
              console.log("AuthProvider :: signUp - falha", error);
            });
        }
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Falha ao cadastrar usuário",
          position: "bottom",
        });
        console.log("AuthProvider :: signUp - falha", error);
      });
  };

  const handleLogout = () => {
    console.log("AuthProvider :: logout - usuário deslogado com sucesso");
    Toast.show({
      type: "success",
      text1: "Usuário deslogado com sucesso",
      position: "bottom",
    });
    auth.signOut();
    setUser(undefined);
    setIsAuthenticated(false);
    navigation.navigate("LandingPage" as never);
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
      "Contexto não encontrado, useAuth deve estar dentro de AuthProvider"
    );
  }
  return context;
};
