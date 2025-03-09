import { Modal, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode | React.ReactNode[];
}

function DialogRoot({ onClose, open, children }: DialogProps) {
  return (
    <Modal
      visible={open}
      onRequestClose={onClose}
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.container}>
        <View style={styles.content}>{children}</View>
      </View>
    </Modal>
  );
}

function DialogTitle({ value }: { value: string }) {
  return <Text style={styles.title}>{value}</Text>;
}

function DialogActions({ children }: { children: React.ReactNode }) {
  return <View style={styles.actions}>{children}</View>;
}

function DialogButton({
  value,
  onClick,
}: {
  value: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <TouchableOpacity onPress={onClick}>
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  );
}

export const Dialog = {
  Root: DialogRoot,
  Title: DialogTitle,
  Actions: DialogActions,
  Button: DialogButton,
};
