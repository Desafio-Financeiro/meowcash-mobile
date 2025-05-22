import { signInUser } from "@/domain/usecases/AuthUseCases";
import { useNavigation } from "expo-router";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/slices/authSlice";

export function useLogin() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleLogin = async (email: string, password: string) => {
    try {
      const { userCredential } = await signInUser(email, password);
      dispatch(setUser(userCredential.user));
      await SecureStore.setItemAsync(
        "user",
        JSON.stringify(userCredential.user)
      );
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
