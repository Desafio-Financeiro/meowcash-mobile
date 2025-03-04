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
import { SplashScreen } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Routes from "./routes";

type DrawerParamList = {
  LandingPage: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function RootLayout() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      navigation.navigate("LandingPage" as never);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Routes />
        <Toast />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
