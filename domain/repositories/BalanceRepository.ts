export interface BalanceRepository {
  addBalance(user: string, balance: number): Promise<{ success: boolean }>;
  getBalance(user: string): Promise<number>;
  updateBalance(
    user: string,
    newData: { balance: number }
  ): Promise<{ success: boolean }>;
}
