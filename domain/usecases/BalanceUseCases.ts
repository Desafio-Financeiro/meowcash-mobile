import { BalanceRepository } from "../repositories/BalanceRepository";

export const addBalance =
  (repo: BalanceRepository) => async (user: string, balance: number) => {
    return await repo.addBalance(user, balance);
  };

export const getBalance = (repo: BalanceRepository) => async (user: string) => {
  return await repo.getBalance(user);
};

export const updateBalance =
  (repo: BalanceRepository) =>
  async (user: string, newData: { balance: number }) => {
    return await repo.updateBalance(user, newData);
  };
