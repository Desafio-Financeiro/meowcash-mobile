import { signInUser } from "@/domain/usecases/AuthUseCases";
import { useNavigation } from "expo-router";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { useRecoilState } from "recoil";
import { userAuthState, userIsAuthenticatedState } from "../atoms/authAtoms";

export function useLogin() {
  const navigation = useNavigation();
  const [_, setUser] = useRecoilState(userAuthState);
  const [__, setIsAuthenticated] = useRecoilState(userIsAuthenticatedState);

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

  return { handleLogin };
}
