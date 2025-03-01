import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import { getAuth } from "firebase/auth";
import { View, Text, Button } from 'react-native';

export default function Profile() {
  const {handleLogout} = useAuth();
  const auth = getAuth();

  return (
    <View style={{flex: 1, justifyContent: 'center', padding: 16}}>
      <Text style={{fontSize: 24}}>
        Profile Page - {auth.currentUser?.displayName}
      </Text>
      <Button
        title="Logout"
        onPress={() => {
          handleLogout();
          router.replace('/(auth)/login');
        }}
      />
    </View>
  );
}
