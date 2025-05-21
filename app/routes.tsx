import Header from "@/app/components/Header";
import { StyleSheet } from "react-native";
import { theme } from "@/theme";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { lazy } from "react";
import { useRecoilValue } from "recoil";
import { userIsAuthenticatedState } from "@/store/atoms/authAtoms";

const LandingPage = lazy(() => import("./screens/(auth)/landing-page"));
const Login = lazy(() => import("./screens/(auth)/login"));
const Register = lazy(() => import("./screens/(auth)/register"));
const Home = lazy(() => import("./screens/(protected)/home"));
const Extract = lazy(() => import("./screens/(protected)/extract"));
const Reports = lazy(() => import("./screens/(protected)/reports"));
const SplashScreen = lazy(() => import("./screens/(auth)/splash-screen"));

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
  const isAuthenticated = useRecoilValue(userIsAuthenticatedState);

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
          drawerItemStyle: { display: !isAuthenticated ? "flex" : "none" },
          sceneStyle: styles.sceneStyle,
        }}
        component={LandingPage}
      />
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{
          drawerLabel: "Login",
          drawerItemStyle: { display: !isAuthenticated ? "flex" : "none" },
          sceneStyle: styles.sceneStyle,
        }}
      />
      <Drawer.Screen
        name="Register"
        component={Register}
        options={{
          drawerLabel: "Criar conta",
          drawerItemStyle: { display: !isAuthenticated ? "flex" : "none" },
          sceneStyle: styles.sceneStyle,
        }}
      />
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerLabel: "Home",
          drawerItemStyle: { display: isAuthenticated ? "flex" : "none" },
          sceneStyle: styles.sceneStyle,
        }}
      />
      <Drawer.Screen
        name="Extract"
        component={Extract}
        options={{
          drawerLabel: "Extrato",
          drawerItemStyle: { display: isAuthenticated ? "flex" : "none" },
          sceneStyle: styles.sceneStyle,
        }}
      />
      <Drawer.Screen
        name="Reports"
        component={Reports}
        options={{
          drawerLabel: "Relatórios",
          drawerItemStyle: { display: isAuthenticated ? "flex" : "none" },
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
