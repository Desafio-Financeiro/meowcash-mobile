import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
import { styles } from "./style";
import Cat from "@/components/Icons/Cat";
import { Balance } from "@/components/balance";
import { SummaryCard } from "@/components/summary-card";

export default function Index() {
  const { handleLogin } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View style={styles.loginContainer}>
      <View style={styles.headerContainer}>
        <Cat />
        <Text style={styles.headerTitle}>Faça login na sua MeowConta</Text>
        <Text>Insira seu e-mail para fazer o login.</Text>
      </View>
      <View style={styles.formContainer}>
        <Input
          label="E-mail"
          placeholder="email@gmail.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <Input
          label="Senha"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          endIcon={showPassword ? "eye-off" : "eye"}
          endIconOnPress={() => setShowPassword((oldState) => !oldState)}
          placeholder="********"
          autoCapitalize="none"
        />

        <Button
          title="Entrar"
          variant="primary"
          onPress={() => handleLogin(email, password)}
        />

        <View style={styles.registerTextContainer}>
          <Text>Não tem conta?</Text>
          <Text
            style={styles.registerLink}
            onPress={() => router.push("/register")}
          >
            Cadastre-se
          </Text>
        </View>
      </View>
    </View>
  );
}
