import { TouchableOpacity, View, Text, ScrollView } from "react-native";
import { styles } from "./style";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { DateRangeSelector } from "@/components/data-range-selector";
import { OptionsSelector } from "@/components/options-selector";
import { formatDate } from "date-fns";
import { transactionTranslate } from "@/utils/transactionTranslate";
import { theme } from "@/theme";

interface TransactionFiltersProps {
  handleTransactionDate(date: { start: Date | null; end: Date | null }): void;
  handleTransactionFilter(filter: string): void;
}

export function TransactionFilters({
  handleTransactionDate,
  handleTransactionFilter,
}: TransactionFiltersProps) {
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showTransactionFilter, setShowTransactionFilter] = useState(false);

  const [currentDateFiltered, setCurrentDateFiltered] = useState("");
  const [currentTransactionFiltered, setCurrentTransactionFiltered] =
    useState("");

  function handleClearFilters() {
    setCurrentDateFiltered("");
    setCurrentTransactionFiltered("");
    handleTransactionFilter("");
    handleTransactionDate({ start: new Date(), end: new Date() });
  }

  return (
    <>
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
          handleTransactionFilter(option);
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
              currentDateFiltered ? theme.colors.primary60 : theme.colors.black
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
    </>
  );
}
