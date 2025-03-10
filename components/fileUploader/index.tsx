import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Button } from "@/components/button";
import { styles } from "./style";

interface Props {
  file?: DocumentPicker.DocumentPickerAsset | null;
  setFile: (file: DocumentPicker.DocumentPickerAsset | null) => void;
}

export default function FileUploader({ file, setFile }: Props) {

  const removeFile = () => {
    setFile(null);
  };

  const getNameBytes = (size?: number) => {
    if (!size) return 0;
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return `${(size / Math.pow(1024, i)).toFixed(2)} ${["B", "KB", "MB", "GB", "TB"][i]}`;
  };

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*"],
        copyToCacheDirectory: true
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        Alert.alert("Cancelado", "Nenhum arquivo foi selecionado.");
        return;
      }

      setFile(result.assets[0]);

      Alert.alert("Arquivo Selecionado", `Nome: ${result.assets[0].name}\nTamanho: ${getNameBytes(result.assets[0].size)}`);
    } catch (error) {
      console.error("Erro ao selecionar arquivo:", error);
    }
  };

  return (
    <>
      <Button
        variant="primary"
        title={file ? "Trocar arquivo" : "Selecionar arquivo"}
        onPress={pickFile}
      />
      {file && (
        <View style={styles.fileInfo}>
          <Text style={styles.fileName}>{file.name}</Text>
          <Text style={styles.fileSize}> {getNameBytes(file.size)}</Text>
          <TouchableOpacity onPress={removeFile}>
            <Text style={styles.removeFile}>Remover arquivo</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
