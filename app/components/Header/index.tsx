import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { DrawerHeaderProps } from "@react-navigation/drawer";

import { theme } from "@/theme";
import Logo from "../Illustrations/Logo";
import { useState } from "react";
import { Button } from "../Button";
import { styles } from "./style";
import { useLogout } from "@/store/hooks/useLogout";
import { useRecoilValue } from "recoil";
import { useAppSelector } from "@/store/redux/hooks";

export default function Header({ props }: { props: DrawerHeaderProps }) {
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const { handleLogout } = useLogout();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

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
