import { balanceApi } from "@/infrastructure/api/BalanceApi";

export const addBalance = async (user: string, balance: number) => {
  return await balanceApi.addBalance(user, balance);
};

export const getBalance = async (user: string) => {
  return await balanceApi.getBalance(user);
};

export const updateBalance = async (
  user: string,
  newData: { balance: number }
) => {
  return await balanceApi.updateBalance(user, newData);
};
