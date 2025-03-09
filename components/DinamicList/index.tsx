import { View, FlatList } from "react-native";
import { styles } from "./style";
import { Button } from "../button";

interface DinamicListProps {
  data: { id: string; body: React.ReactNode }[];
  onLoadMore?: () => void;
  isLoading?: boolean;
  hasNextPage?: boolean;
}

const DinamicList = ({
  data,
  onLoadMore,
  isLoading,
  hasNextPage,
}: DinamicListProps) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <View style={styles.body}>{item.body}</View>}
      />

      {hasNextPage && onLoadMore && (
        <View style={{ width: "50%", marginTop: 24 }}>
          <Button
            variant="primary"
            title={isLoading ? "Carregando..." : "Carregar mais"}
            onPress={() => onLoadMore()}
            disabled={isLoading}
          />
        </View>
      )}
    </View>
  );
};

export default DinamicList;
