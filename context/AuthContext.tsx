import { addBalance } from "@/api/balance";
import { auth } from "@/firebase/config";
import { getUserData } from "@/utils/getUserData";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  updateProfile,
} from "firebase/auth";
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

  useEffect(() => {
    getUserData(setUser);
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      await SecureStore.setItemAsync(
        "user",
        JSON.stringify(userCredential.user)
      );
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

  const handleSignUp = async (
    email: string,
    password: string,
    userName: string
  ) => {
    await SecureStore.deleteItemAsync("userToken");

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

          addBalance(auth.currentUser.uid, 0);
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

  const handleLogout = async () => {
    console.log("AuthProvider :: logout - usuário deslogado com sucesso");
    Toast.show({
      type: "success",
      text1: "Usuário deslogado com sucesso",
      position: "bottom",
    });
    await SecureStore.deleteItemAsync("userToken");
    auth.signOut();
    setUser(undefined);
    setIsAuthenticated(false);
    navigation.navigate("LandingPage" as never);
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
