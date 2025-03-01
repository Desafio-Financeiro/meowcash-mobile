import { Button } from "@/components/button";
import { View, Text, ScrollView } from "react-native";
import { styles } from "./style";
import CatPaw from "@/components/Illustrations/CatPaw";
import Waves from "@/components/Illustrations/Waves";
import { useNavigation } from "@react-navigation/native";
import ImageCard from "@/components/ImageCard";
import Coin from "@/components/Illustrations/Coin";
import { theme } from "@/theme";
import Notification from "@/components/Illustrations/Notification";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import Chart from "@/components/Illustrations/Chart";
import Footer from "@/components/Footer";

export default function Index() {
  const navigation = useNavigation();
  const handleRegister = () => navigation.navigate("Register" as never);
  const handleLogin = () => navigation.navigate("Login" as never);

  return (
    <ScrollView style={styles.landingPageContainer}>
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

      <ScrollView horizontal style={styles.caroussel}>
        <ImageCard
          Icon={() => (
            <MaterialIcons
              name="auto-graph"
              size={60}
              color={theme.colors.primary70}
            />
          )}
          Illustration={() => <Chart />}
          text="Relatórios e análises em tempo real"
        />
        <ImageCard
          Icon={() => (
            <MaterialCommunityIcons
              name="piggy-bank"
              size={60}
              color={theme.colors.primary70}
            />
          )}
          Illustration={() => <Coin />}
          text="Gerencie suas finanças sem complicações"
        />
        <ImageCard
          Icon={() => (
            <MaterialIcons
              name="assistant"
              size={60}
              color={theme.colors.primary70}
            />
          )}
          Illustration={() => <Notification />}
          text="Notificações para não deixar passar nada"
        />
      </ScrollView>

      <Footer />
    </ScrollView>
  );
}
