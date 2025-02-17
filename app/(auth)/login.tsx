import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Button, View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function Index() {
  const { message, handleLogin, handleSignUp } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 16, padding: 8, width: 300 }}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginBottom: 16, padding: 8, width: 300 }}
      />
      <Button
        title="Criar conta"
        color="green"
        onPress={() => handleSignUp(email, password)}
      />
      <Button
        title="Fazer login"
        color="blue"
        onPress={() => handleLogin(email, password)}
      />

      {message && <Text>{message}</Text>}
    </View>
  );
}
