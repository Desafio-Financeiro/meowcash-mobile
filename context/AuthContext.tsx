import {
  logoutUser,
  signInUser,
  signUpUser,
} from "@/domain/usecases/AuthUseCases";
import { addBalance } from "@/domain/usecases/BalanceUseCases";
import { auth } from "@/infrastructure/firebase/config";
import { getUserData } from "@/utils/getUserData";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { User } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Toast from "react-native-toast-message";

interface IAuthContext {
  user: User | undefined;
  handleLogin: (email: string, password: string) => void;
  handleSignUp: (email: string, password: string, userName: string) => void;
  handleLogout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState<User | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    getUserData(setUser);
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const { userCredential } = await signInUser(email, password);
      setUser(userCredential.user);
      await SecureStore.setItemAsync(
        "user",
        JSON.stringify(userCredential.user)
      );
      setIsAuthenticated(true);
      navigation.navigate("Home" as never);
    } catch {
      Toast.show({
        type: "error",
        text1: "Falha ao logar usuário",
        position: "bottom",
      });
    }
  };

  const handleSignUp = async (
    email: string,
    password: string,
    userName: string
  ) => {
    try {
      await signUpUser(email, password, userName);

      if (auth?.currentUser) {
        addBalance(auth.currentUser.uid, 0);
        await SecureStore.deleteItemAsync("userToken");
        navigation.navigate("Login" as never);
        Toast.show({
          type: "success",
          text1: "Usuário cadastrado com sucesso",
          position: "bottom",
        });
      }
    } catch {
      Toast.show({
        type: "error",
        text1: "Falha ao cadastrar usuário",
        position: "bottom",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      Toast.show({
        type: "success",
        text1: "Usuário deslogado com sucesso",
        position: "bottom",
      });
      await SecureStore.deleteItemAsync("userToken");
      setUser(undefined);
      setIsAuthenticated(false);
      navigation.navigate("LandingPage" as never);
    } catch {
      Toast.show({
        type: "error",
        text1: "Não foi possível deslogar o usuário",
        position: "bottom",
      });
    }
  };

  const memoizedValue = useMemo(() => {
    return {
      user,
      handleLogin,
      handleSignUp,
      handleLogout,
      isAuthenticated,
    };
  }, [user, handleLogin, handleSignUp, handleLogout, isAuthenticated]);

  return (
    <AuthContext.Provider value={memoizedValue}>
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
