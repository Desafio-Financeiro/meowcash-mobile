import { Button } from "@/components/button";
import { View, Text } from "react-native";
import { styles } from "./style";
import CatPaw from "@/components/Illustrations/CatPaw";
import Waves from "@/components/Illustrations/Waves";
import { useNavigation } from "@react-navigation/native";

export default function Index() {
  const navigation = useNavigation();
  const handleRegister = () => navigation.navigate("Register" as never);
  const handleLogin = () => navigation.navigate("Login" as never);

  return (
    <View style={styles.landingPageContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Controle suas finanças na palma da sua pata.
        </Text>
        <Text style={styles.headerSubtitle}>Crie sua conta com a gente!</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Começar agora"
            variant="primary"
            onPress={handleRegister}
          />
        </View>

        <View style={styles.loginMessage}>
          <Text style={styles.loginMessageTitle}>Já tem uma conta?</Text>
          <Button title="Faça o login" variant="link" onPress={handleLogin} />
        </View>

        <View style={styles.catPaw}>
          <CatPaw />
        </View>

        <View style={styles.waves}>
          <Waves />
        </View>
      </View>
    </View>
  );
}
