import { View, FlatList, ActivityIndicator } from "react-native";
import { styles } from "./style";
import { theme } from "@/theme";

interface DinamicListProps {
  data: { id: string; body: React.ReactNode }[];
  onLoadMore?: () => void;
  isLoading?: boolean;
  style?: any;
}

const DinamicList = ({
  data,
  onLoadMore,
  isLoading,
  style,
}: DinamicListProps) => {
  return (
    <FlatList
      data={data}
      style={style}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <View style={styles.body}>{item.body}</View>}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isLoading ? (
          <ActivityIndicator
            size="large"
            color={theme.colors.primary60}
            style={{ marginVertical: 24 }}
          />
        ) : null
      }
    />
  );
};

export default DinamicList;
