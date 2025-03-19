import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Button } from "../Button";
import { styles } from "./style";

interface Props {
  file?: DocumentPicker.DocumentPickerAsset | null;
  setFile: (file: DocumentPicker.DocumentPickerAsset | null) => void;
}

export default function FileUploader({ file, setFile }: Props) {
  const MAX_FILE_SIZE = 1024 * 1024;

  const removeFile = () => {
    setFile(null);
  };

  const getNameBytes = (size?: number) => {
    if (!size) return "0 B";
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

      const selectedFile = result.assets[0];

      if (!selectedFile.size) {
        Alert.alert("Erro", "O arquivo selecionado não possui tamanho.");
        return;
      }

      if (selectedFile.size > MAX_FILE_SIZE) {
        Alert.alert("Erro", "O arquivo selecionado excede o limite de 1 MB.");
        return;
      }

      setFile(selectedFile);
      Alert.alert("Arquivo Selecionado", `Nome: ${selectedFile.name}\nTamanho: ${getNameBytes(selectedFile.size)}`);
    } catch (error) {
      console.error("Erro ao selecionar arquivo:", error);
    }
  };

  return (
    <>
      <Button
        variant="primary"
        title={file ? "Trocar arquivo" : "Selecionar arquivo (1 MB)"}
        onPress={pickFile}
      />
      {file && (
        <View style={styles.fileInfo}>
          <Text style={styles.fileName}>{file.name}</Text>
          <Text style={styles.fileSize}>{getNameBytes(file.size)}</Text>
          <TouchableOpacity onPress={removeFile}>
            <Text style={styles.removeFile}>Remover arquivo</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
