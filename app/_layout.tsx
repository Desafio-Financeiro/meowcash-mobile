import Toast from "react-native-toast-message";

import Header from "@/components/Header";
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
import { StyleSheet } from "react-native";
import { theme } from "@/theme";
import { createDrawerNavigator } from "@react-navigation/drawer";

import LandingPage from "./(auth)/landing-page";
import Login from "./(auth)/login";
import Register from "./(auth)/register";
import Home from "./(protected)/home";

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
      navigation.navigate("Login" as never);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Drawer.Navigator
          screenOptions={{
            header: (props) => <Header props={props} />,
            drawerContentStyle: styles.drawerContent,
            drawerActiveBackgroundColor: theme.colors.primary70,
            drawerActiveTintColor: theme.colors.white,
            drawerLabelStyle: styles.drawerLabel,
          }}
          initialRouteName="LandingPage"
        >
          <Drawer.Screen name="LandingPage" component={LandingPage} />
          <Drawer.Screen
            name="Login"
            component={Login}
            options={{
              drawerLabel: "Login",
              sceneStyle: styles.sceneStyle,
            }}
          />
          <Drawer.Screen
            name="Register"
            component={Register}
            options={{
              drawerLabel: "Register",
              sceneStyle: styles.sceneStyle,
            }}
          />
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{
              drawerLabel: "Profile",
              sceneStyle: styles.sceneStyle,
            }}
          />
        </Drawer.Navigator>
        <Toast />
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
