import { View, TouchableOpacity, Platform, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { DrawerHeaderProps } from "@react-navigation/drawer";
import { StyleSheet } from "react-native";
import { theme } from "@/theme";
import Logo from "../Illustrations/Logo";
import { useState } from "react";
import { Button } from "../button";
import { useAuth } from "@/context/AuthContext";

export default function Header({ props }: { props: DrawerHeaderProps }) {
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const { handleLogout, isAuthenticated } = useAuth();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
        <Ionicons name="menu" size={28} color={theme.colors.primary80} />
      </TouchableOpacity>

      <View style={{ margin: "auto" }}>
        <Logo />
      </View>

      {isAuthenticated && (
        <TouchableOpacity onPress={() => setOpenPopover(!openPopover)}>
          <Ionicons
            name="person-circle-outline"
            size={28}
            color={theme.colors.primary80}
          />
        </TouchableOpacity>
      )}

      {openPopover && (
        <View style={styles.popover}>
          <Button variant="link" title="Sair" onPress={handleLogout} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: theme.colors.primary20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 44,
    height: Platform.OS === "android" ? 56 + StatusBar.currentHeight! : 88,
  },
  drawerContent: {
    backgroundColor: theme.colors.primary10,
    paddingTop: 24,
  },
  drawerLabel: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
  },
  popover: {
    backgroundColor: "white",
    position: "absolute",
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 8,
    right: 16,
    top: 80,
    borderColor: theme.colors.primary90,
    borderWidth: 1,
  },
});
