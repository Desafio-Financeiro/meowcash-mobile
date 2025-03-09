export function transactionTranslate(code: string) {
  switch (code) {
    case "Credit":
      return "Crédito";
    case "Debit":
      return "Débito";

    default:
      return code;
  }
}
