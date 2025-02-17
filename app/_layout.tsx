import Header from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { SplashScreen, useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export default function RootLayout() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      router.replace("/login");
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Drawer
          screenOptions={{
            header: (props) => <Header props={props} />,
            drawerContentStyle: styles.drawerContent,
            drawerActiveBackgroundColor: theme.colors.primary70,
            drawerActiveTintColor: theme.colors.white,
            drawerLabelStyle: styles.drawerLabel,
          }}
        >
          <Drawer.Screen
            name="(auth)/login"
            options={{
              drawerLabel: "Login",
              sceneStyle: styles.sceneStyle,
            }}
          />
          <Drawer.Screen
            name="(protected)/profile"
            options={{
              drawerLabel: "Profile",
              sceneStyle: styles.sceneStyle,
            }}
          />
        </Drawer>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sceneStyle: {
    backgroundColor: theme.colors.primary10,
  },
  drawerContent: {
    backgroundColor: theme.colors.primary10,
    paddingTop: 24,
  },
  drawerLabel: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
  },
});
