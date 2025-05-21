import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";

import { signUpUser } from "@/domain/usecases/AuthUseCases";
import { addBalance } from "@/domain/usecases/BalanceUseCases";
import { useNavigation } from "expo-router";
import { auth } from "@/infrastructure/firebase/config";

export function useSignUp() {
  const navigation = useNavigation();

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

  return { handleSignUp };
}
