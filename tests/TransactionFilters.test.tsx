import { render, fireEvent } from "@testing-library/react-native";
import { TransactionType } from "@/infrastructure/api/TransactionsApi";
import { TransactionFilters } from "@/app/components/transactions/Filters";

import React from "react";
import { Text } from "react-native";
import { ReactTestInstance } from "react-test-renderer";

const DateRangeSelectorMock = (props: {
  open: boolean;
  onDateChange: (start: Date, end: Date) => void;
  onClose: () => void;
}) => {
  if (!props.open) return null;
  return (
    <Text
      testID="date-selector"
      onPress={() => {
        props.onDateChange(new Date("2023-01-01"), new Date("2023-01-10"));
        props.onClose();
      }}
    >
      Date Modal
    </Text>
  );
};

const OptionsSelectorMock = (props: {
  open: boolean;
  onClose: () => void;
  handleOptionSelection: (value: string) => void;
}) => {
  if (!props.open) return null;
  return (
    <Text
      testID="options-selector"
      onPress={() => {
        props.handleOptionSelection("income");
        props.onClose();
      }}
    >
      Options Modal
    </Text>
  );
};

jest.mock("@/app/components/DataRangeSelector", () => ({
  DateRangeSelector: DateRangeSelectorMock
}));

jest.mock("@/app/components/OptionsSelector", () => ({
  OptionsSelector: OptionsSelectorMock
}));

jest.mock("@/store/hooks/useTransactionFilters", () => ({
  useTransactionFilters: () => ({
    handleClearFilter: jest.fn()
  })
}));


jest.mock("react-native-scrollable-tab-view", () => "NativeAnimatedHelper");
jest.mock("expo-router", () => ({
  useNavigation: () => ({
    navigate: jest.fn()
  })
}));
jest.mock("expo-secure-store", () => ({
  deleteItemAsync: jest.fn()
}));
jest.mock("react-native-toast-message", () => ({
  show: jest.fn()
}));
jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {
  };
  return Reanimated;
});
jest.mock("react-native-gesture-handler", () => {
  const RN = require("react-native");
  return {
    ...RN,
    State: {
      ...RN.State,
      END: "END"
    },
    PanGestureHandler: jest.fn(({ children }) => <>{children}</>)
  };
});
const MaterialIcons = (props: {
  open: boolean;
  onClose: () => void;
  handleOptionSelection: (value: string) => void;
}) => {
  if (!props.open) return null;
  return (
    <Text
      testID="options-selector"
      onPress={() => {
        props.handleOptionSelection("income");
        props.onClose();
      }}
    >
      Options Modal
    </Text>
  );
};
jest.mock("@expo/vector-icons", () => ({
  MaterialIcons
}));


describe("TransactionFilters", () => {
  const mockHandleDate = jest.fn();
  const mockHandleText = jest.fn();
  const mockHandleType = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("dispara onChangeText no TextInput", () => {
    const { getByPlaceholderText } = render(
      <TransactionFilters
        handleTransactionDate={mockHandleDate}
        handleTransactionText={mockHandleText}
        handleTransactionType={mockHandleType}
      />
    );

    fireEvent.changeText(getByPlaceholderText("Buscar"), "aluguel");

    expect(mockHandleText).toHaveBeenCalledWith("aluguel");
  });

  it("abre filtro de data e aplica filtro", () => {
    const { getByText, queryByTestId, getByTestId } = render(
      <TransactionFilters
        handleTransactionDate={mockHandleDate}
        handleTransactionText={mockHandleText}
        handleTransactionType={mockHandleType}
      />
    );
    fireEvent.press(getByText("Período"));

    expect(queryByTestId("date-selector")).toBeTruthy();

    fireEvent.press(getByTestId("date-selector"));

    expect(mockHandleDate).toHaveBeenCalledWith({
      start: new Date("2023-01-01"),
      end: new Date("2023-01-10")
    });
  });

  it("abre filtro de movimentações e aplica filtro", () => {
    const { getByText, queryByTestId } = render(
      <TransactionFilters
        handleTransactionDate={mockHandleDate}
        handleTransactionText={mockHandleText}
        handleTransactionType={mockHandleType}
      />
    );

    fireEvent.press(getByText("Movimentações"));
    expect(queryByTestId("options-selector")).toBeTruthy();

    fireEvent.press(queryByTestId("options-selector") as ReactTestInstance);
    expect(mockHandleType).toHaveBeenCalledWith("income" as TransactionType);
  });

  it("exibe botão de limpar filtros quando filtros estão ativos", () => {
    const { getByText, queryByTestId, queryByText } = render(
      <TransactionFilters
        handleTransactionDate={mockHandleDate}
        handleTransactionText={mockHandleText}
        handleTransactionType={mockHandleType}
      />
    );

    fireEvent.press(getByText("Período"));
    fireEvent.press(queryByTestId("date-selector") as ReactTestInstance);

    expect(queryByText("Limpar filtros")).toBeTruthy();
  });
});
