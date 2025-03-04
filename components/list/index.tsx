import React from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { styles } from "./style";

interface ListProps {
  data: { id: string; body: React.ReactNode; }[];
  onLoadMore?: () => void;
  isLoading?: boolean;
  style?: any;
}

const List = ({ data, onLoadMore, isLoading, style }: ListProps) => {
  return (
    <FlatList
      data={data}
      style={style}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.body}>{item.body}</View>
      )}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null
      }
    />
  );
};

export default List;
