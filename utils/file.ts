import { storage } from "@/firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { DocumentPickerAsset } from "expo-document-picker";
import { Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export const uploadFile = async (attachment: DocumentPickerAsset): Promise<string | null> => {
  try {
    if (!attachment.uri) return null;

    const response = await fetch(attachment.uri);
    const blob = await response.blob();

    const fileRef = ref(storage, `uploads/${Date.now()}_${attachment.name}`);
    await uploadBytes(fileRef, blob);

    return await getDownloadURL(fileRef);
  } catch (error) {
    console.error("Erro ao fazer upload do arquivo:", error);
    return null;
  }
};

export const downloadFile = async (fileUrl: string, fileName: string) => {
  try {
    if (!fileUrl) {
      Alert.alert("Erro", "URL do arquivo não encontrada.");
      return;
    }

    const fileUri = `${FileSystem.documentDirectory}${fileName}`;

    const { uri } = await FileSystem.downloadAsync(fileUrl, fileUri);

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
    } else {
      Alert.alert("Download concluído", `Arquivo salvo em: ${uri}`);
    }
  } catch (error) {
    console.error("Erro ao baixar o arquivo:", error);
    Alert.alert("Erro", "Não foi possível baixar o arquivo.");
  }
};
