import { useAuth } from "@/context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { View, Text, Button } from "react-native";

export default function Profile() {
  const navigation = useNavigation();
  const { handleLogout } = useAuth();
  const auth = getAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      <Text style={{ fontSize: 24 }}>
        Profile Page - {auth.currentUser?.displayName}
      </Text>
      <Button
        title="Logout"
        onPress={() => {
          handleLogout();
          navigation.navigate("LandingPage" as never);
        }}
      />
    </View>
  );
}
