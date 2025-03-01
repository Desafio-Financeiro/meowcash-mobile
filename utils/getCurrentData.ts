export function getCurrentDate() {
  const locale = "pt-br";
  return new Date().toLocaleDateString(locale, {
    year: "numeric",
    month: "2-digit",
    weekday: "long",
    day: "2-digit",
  });
}
