import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./style";
import Cat from "@/app/components/Icons/Cat";

export default function Index() {
  const navigation = useNavigation();
  const { handleLogin } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function loginUser(email: string, password: string) {
    setLoading(true);
    await handleLogin(email, password);
    setLoading(false);
  }

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
          title={loading ? "Entrando..." : "Entrar"}
          variant="primary"
          disabled={loading}
          onPress={() => loginUser(email, password)}
        />

        <View style={styles.registerTextContainer}>
          <Text>Não tem conta?</Text>
          <Text
            style={styles.registerLink}
            onPress={() => navigation.navigate("Register" as never)}
          >
            Cadastre-se
          </Text>
        </View>
      </View>
    </View>
  );
}
