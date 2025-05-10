import { View, Text } from "react-native";

import { theme } from "@/theme";
import LogoCat from "../Illustrations/LogoCat";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./style";

export default function Footer() {
  return (
    <>
      <View style={styles.footer}>
        <View style={styles.textContainer}>
          <Text style={[styles.text, { fontFamily: theme.fonts.bold }]}>
            Contato
          </Text>
          <Text style={styles.text}>0800 4002 8922</Text>
          <Text style={styles.text}>meajuda@meowcash.com.br</Text>
          <Text style={styles.text}>ouvidoria@meowcash.com.br</Text>
        </View>

        <LogoCat />

        <View style={styles.socialMediaContainer}>
          <View style={styles.socialMedia}>
            <MaterialCommunityIcons
              name="instagram"
              size={20}
              color={theme.colors.primary70}
            />
          </View>
          <View style={styles.socialMedia}>
            <MaterialCommunityIcons
              name="whatsapp"
              size={20}
              color={theme.colors.primary70}
            />
          </View>
        </View>
      </View>
      <View style={styles.copyright}>
        <Text style={styles.copyrightText}>
          © Copyright 2024 FIAP. Todos os direitos reservados.
        </Text>
        <Text style={styles.copyrightText}>
          CNPJ 12.345.678/0001-99 - São Paulo/SP
        </Text>
      </View>
    </>
  );
}
