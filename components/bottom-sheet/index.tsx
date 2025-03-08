import { Modal, Text, View } from "react-native";
import { styles } from "./styles";
import React from "react";

interface BottomSheetProps {
  title: string | JSX.Element;
  children: React.ReactNode | React.ReactNode[];
  visible: boolean;
  onClose: () => void;
}

export function BottomSheet({
  title,
  children,
  visible,
  onClose,
}: BottomSheetProps) {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>{title}</Text>
            </View>
          </View>

          <View style={styles.content}>{children}</View>
        </View>
      </View>
    </Modal>
  );
}
