import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import CatPaw from "@/app/components/Illustrations/CatPaw";
import Cat from "@/app/components/Icons/Cat";
import LogoLarge from "@/app/components/Illustrations/LogoLarge";
import { styles } from "./style";

export default function Index() {
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    );

    pulse.start();

    return () => pulse.stop();
  }, []);

  const onFinish = () => {
    navigation.navigate("LandingPage" as never);
  };

  useEffect(() => {
    const timeoutId = setTimeout(onFinish, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.container}>
      <LogoLarge />
      <Animated.View
        style={[styles.pulse, { transform: [{ scale: scaleAnim }] }]}
      >
        <Cat />
      </Animated.View>

      <View style={styles.absoluteContainer}>
        <CatPaw />
      </View>
    </View>
  );
}
