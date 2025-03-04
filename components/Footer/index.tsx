import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { theme } from "@/theme";
import LogoCat from "../Illustrations/LogoCat";
import Logo from "../Illustrations/Logo";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

const styles = StyleSheet.create({
  footer: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 32,
    paddingTop: 32,
    backgroundColor: theme.colors.primary60,
    color: theme.colors.white,
    display: "flex",
    gap: 32,
  },
  textContainer: {
    display: "flex",
    gap: 16,
  },
  text: {
    color: theme.colors.white,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
  },
  copyright: {
    padding: 10,
    backgroundColor: theme.colors.gray20,
    display: "flex",
    gap: 6,
  },
  copyrightText: {
    textAlign: "center",
    color: theme.colors.white,
    fontSize: 12,
    fontFamily: theme.fonts.regular,
  },
  socialMediaContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
  },
  socialMedia: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
