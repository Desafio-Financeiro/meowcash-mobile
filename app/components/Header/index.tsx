import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { DrawerHeaderProps } from "@react-navigation/drawer";

import { theme } from "@/theme";
import Logo from "../Illustrations/Logo";
import { useState } from "react";
import { Button } from "../Button";
import { useAuth } from "@/context/AuthContext";
import { styles } from "./style";

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
          <Button
            variant="link"
            title="Sair"
            onPress={() => {
              setOpenPopover(false);
              handleLogout();
            }}
          />
        </View>
      )}
    </View>
  );
}
