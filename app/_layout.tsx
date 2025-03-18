import Toast from "react-native-toast-message";

import { AuthProvider } from "@/context/AuthContext";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Routes from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TransactionsProvider } from "@/context/TransactionsContext";
import { BackHandler } from "react-native";
import { User } from "firebase/auth";
import { getUserData } from "@/utils/getUserData";

const queryClient = new QueryClient();

export default function RootLayout() {
  const navigation = useNavigation();
  const [user, setUser] = useState<User>();
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const handleBackPress = () => {
    if (!user?.uid) {
      return false;
    }

    navigation.navigate("Home" as never);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
  }, [user?.uid]);

  useEffect(() => {
    getUserData(setUser);
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      navigation.navigate("SplashScreen" as never);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TransactionsProvider>
            <Routes />
            <Toast />
          </TransactionsProvider>
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
