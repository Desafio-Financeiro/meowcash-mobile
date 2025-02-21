import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { View, Text } from "react-native";

export default function Index() {
  const { message, handleLogin, handleSignUp } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ width: 300, gap: 16 }}>
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
        />

        <Button
          title="Criar conta"
          variant="primary"
          onPress={() => handleSignUp(email, password)}
        />
        <Button
          title="Fazer login"
          variant="ghost"
          onPress={() => handleLogin(email, password)}
        />
      </View>

      {message && <Text>{message}</Text>}
    </View>
  );
}
