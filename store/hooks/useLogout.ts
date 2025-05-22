import { logoutUser } from "@/domain/usecases/AuthUseCases";
import { useNavigation } from "expo-router";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { useAppDispatch } from "@/store/redux/hooks";
import { logout } from "@/store/redux/slices/authSlice";

export function useLogout() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser();
      Toast.show({
        type: "success",
        text1: "Usuário deslogado com sucesso",
        position: "bottom",
      });
      await SecureStore.deleteItemAsync("userToken");

      dispatch(logout());

      navigation.navigate("LandingPage" as never);
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Não foi possível deslogar o usuário",
        position: "bottom",
      });
    }
  };

  return { handleLogout };
}
