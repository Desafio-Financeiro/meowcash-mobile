import Header from "@/app/components/Header";
import { useAuth } from "@/context/AuthContext";
import { StyleSheet } from "react-native";
import { theme } from "@/theme";
import { createDrawerNavigator } from "@react-navigation/drawer";

import LandingPage from "./screens/(auth)/landing-page";
import Login from "./screens/(auth)/login";
import Register from "./screens/(auth)/register";
import Home from "./screens/(protected)/home";
import Extract from "./screens/(protected)/extract";
import Reports from "./screens/(protected)/reports";
import SplashScreen from "./screens/(auth)/splash-screen";

type DrawerParamList = {
  SplashScreen: undefined;
  LandingPage: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Extract: undefined;
  Reports: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function Routes() {
  const auth = useAuth();

  return (
    <Drawer.Navigator
      screenOptions={{
        header: (props) => <Header props={props} />,
        drawerContentStyle: styles.drawerContent,
        drawerActiveBackgroundColor: theme.colors.primary70,
        drawerActiveTintColor: theme.colors.white,
        drawerLabelStyle: styles.drawerLabel,
      }}
      initialRouteName="SplashScreen"
    >
      <Drawer.Screen
        name="SplashScreen"
        options={{
          drawerItemStyle: { display: "none" },
          header: () => <></>,
        }}
        component={SplashScreen}
      />
      <Drawer.Screen
        name="LandingPage"
        options={{
          drawerLabel: "Início",
          drawerItemStyle: { display: !auth.isAuthenticated ? "flex" : "none" },
          sceneStyle: styles.sceneStyle,
        }}
        component={LandingPage}
      />
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{
          drawerLabel: "Login",
          drawerItemStyle: { display: !auth.isAuthenticated ? "flex" : "none" },
          sceneStyle: styles.sceneStyle,
        }}
      />
      <Drawer.Screen
        name="Register"
        component={Register}
        options={{
          drawerLabel: "Criar conta",
          drawerItemStyle: { display: !auth.isAuthenticated ? "flex" : "none" },
          sceneStyle: styles.sceneStyle,
        }}
      />
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerLabel: "Home",
          drawerItemStyle: { display: auth.isAuthenticated ? "flex" : "none" },
          sceneStyle: styles.sceneStyle,
        }}
      />
      <Drawer.Screen
        name="Extract"
        component={Extract}
        options={{
          drawerLabel: "Extrato",
          drawerItemStyle: { display: auth.isAuthenticated ? "flex" : "none" },
          sceneStyle: styles.sceneStyle,
        }}
      />
      <Drawer.Screen
        name="Reports"
        component={Reports}
        options={{
          drawerLabel: "Relatórios",
          drawerItemStyle: { display: auth.isAuthenticated ? "flex" : "none" },
          sceneStyle: styles.sceneStyle,
        }}
      />
    </Drawer.Navigator>
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
