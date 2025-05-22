import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";

import { signUpUser } from "@/domain/usecases/AuthUseCases";
import { addBalance } from "@/domain/usecases/BalanceUseCases";
import { useNavigation } from "expo-router";
import { firebase } from "@/infrastructure/firebase/config";
import { useAppDispatch } from "@/store/redux/hooks";
import { setUser } from "@/store/redux/slices/authSlice";

export function useSignUp() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleSignUp = async (
    email: string,
    password: string,
    userName: string
  ) => {
    try {
      await signUpUser(email, password, userName);

      const currentUser = firebase.auth?.currentUser;

      if (currentUser) {
        await addBalance(currentUser.uid, 0);
        await SecureStore.deleteItemAsync("userToken");

        dispatch(setUser(currentUser));

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
