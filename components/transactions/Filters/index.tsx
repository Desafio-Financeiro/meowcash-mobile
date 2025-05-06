import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  TextInput,
} from "react-native";
import { styles } from "./style";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { DateRangeSelector } from "../../DataRangeSelector";
import { OptionsSelector } from "../../OptionsSelector";
import { formatDate } from "date-fns";
import { transactionTranslate } from "@/utils/transactionTranslate";
import { theme } from "@/theme";
import { TransactionType } from "@/api/transaction";
import { useTransactions } from "@/context/TransactionsContext";

interface TransactionFiltersProps {
  handleTransactionDate(date: { start: Date | null; end: Date | null }): void;

  handleTransactionType(type: TransactionType | null): void;

  handleTransactionText(text: string | null): void;
}

export function TransactionFilters({
  handleTransactionDate,
  handleTransactionText,
  handleTransactionType,
}: Readonly<TransactionFiltersProps>) {
  const { handleClearFilter } = useTransactions();
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showTransactionFilter, setShowTransactionFilter] = useState(false);

  const [currentDateFiltered, setCurrentDateFiltered] = useState("");
  const [currentTransactionFiltered, setCurrentTransactionFiltered] =
    useState("");

  function handleClearFilters() {
    setCurrentDateFiltered("");
    setCurrentTransactionFiltered("");
    handleTransactionType(null);
    handleTransactionText(null);
    handleTransactionDate({ start: null, end: null });
    handleClearFilter();
  }

  return (
    <>
      <View>
        <DateRangeSelector
          onDateChange={(start, end) => {
            handleTransactionDate({ start, end });
            setCurrentDateFiltered(
              `${formatDate(start ?? "", "dd/MM/yyyy")} - ${formatDate(
                end ?? "",
                "dd/MM/yyyy"
              )}`
            );
          }}
          open={showDateFilter}
          onClose={() => setShowDateFilter(false)}
        />
        <OptionsSelector
          open={showTransactionFilter}
          onClose={() => setShowTransactionFilter(false)}
          handleOptionSelection={(option) => {
            handleTransactionType(option as TransactionType);
            setCurrentTransactionFiltered(option);
          }}
        />

        <ScrollView
          horizontal
          style={styles.filtersContainer}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        >
          <TouchableOpacity
            onPress={() => setShowDateFilter(true)}
            style={[
              styles.filterButton,
              currentDateFiltered && styles.filterButtonActive,
            ]}
          >
            <Text
              style={[
                styles.filterButtonText,
                currentDateFiltered && styles.filterButtonActiveText,
              ]}
            >
              {currentDateFiltered || "Período"}
            </Text>
            <MaterialIcons
              name="arrow-drop-down"
              size={24}
              color={
                currentDateFiltered
                  ? theme.colors.primary60
                  : theme.colors.black
              }
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowTransactionFilter(true)}
            style={[
              styles.filterButton,
              currentTransactionFiltered && styles.filterButtonActive,
            ]}
          >
            <Text
              style={[
                styles.filterButtonText,
                currentTransactionFiltered && styles.filterButtonActiveText,
              ]}
            >
              {transactionTranslate(currentTransactionFiltered) ||
                "Movimentações"}
            </Text>
            <MaterialIcons
              name="arrow-drop-down"
              size={24}
              color={
                currentTransactionFiltered
                  ? theme.colors.primary60
                  : theme.colors.black
              }
            />
          </TouchableOpacity>

          {currentDateFiltered.length || currentTransactionFiltered.length ? (
            <TouchableOpacity
              onPress={handleClearFilters}
              style={styles.filterButton}
            >
              <Text style={styles.filterButtonText}>Limpar filtros</Text>
              <MaterialIcons name="clear" size={16} color="black" />
            </TouchableOpacity>
          ) : null}
        </ScrollView>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder={"Buscar"}
          placeholderTextColor={theme.colors.text}
          style={styles.searchInput}
          onChangeText={(text) => handleTransactionText(text)}
        />
        <View style={styles.searchIcon}>
          <MaterialIcons name="search" size={24} color={theme.colors.black} />
        </View>
      </View>
    </>
  );
}
