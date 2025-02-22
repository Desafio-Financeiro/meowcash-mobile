import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
import { styles } from "./style";
import Cat from "@/components/Icons/Cat";

export default function Index() {
  const { handleSignUp } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View style={styles.loginContainer}>
      <View style={styles.headerContainer}>
        <Cat />
        <Text style={styles.headerTitle}>Cadastre-se na MeowCash!</Text>
        <Text style={styles.headerDescription}>
          Faça seu cadastro e controle suas finanças com mais facilidade.
        </Text>
      </View>
      <View style={styles.formContainer}>
        <Input
          label="Nome Completo"
          placeholder="Nome Completo"
          value={name}
          onChangeText={setName}
        />
        <Input
          label="E-mail"
          placeholder="email@gmail.com"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          label="Senha"
          secureTextEntry={showPassword}
          value={password}
          onChangeText={setPassword}
          endIcon={showPassword ? "eye" : "eye-off"}
          endIconOnPress={() => setShowPassword((oldState) => !oldState)}
          placeholder="********"
        />

        <Button
          title="Começar agora"
          variant="primary"
          onPress={() => handleSignUp(email, password)}
        />

        <Text style={styles.registerTermsNotice}>
          Ao criar uma conta, você concorda com nossos{" "}
          <Text style={styles.highlightText}>Termos de Serviço</Text> e
          reconhece o recebimento de nossa{" "}
          <Text style={styles.highlightText}>Política de Privacidade</Text>.
        </Text>

        <View style={styles.registerTextContainer}>
          <Text>Já tem conta?</Text>
          <Text
            style={styles.registerLink}
            onPress={() => router.push("/login")}
          >
            Entrar
          </Text>
        </View>
      </View>
    </View>
  );
}
