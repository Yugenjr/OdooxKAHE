import { BudgetModel } from "./model";

export class BudgetService {
  static async addExpense(tripId: string, userId: string, expenseData: Record<string, any>) {
    try {
      const { category, amount, description, date } = expenseData;

      if (!category || amount === undefined) {
        throw new Error("Category and amount are required");
      }

      return await BudgetModel.addExpense(tripId, userId, {
        category,
        amount,
        description: description || "",
        date: date || new Date(),
      });
    } catch (error) {
      throw error;
    }
  }

  static async getExpenses(tripId: string, userId: string) {
    try {
      return await BudgetModel.getExpensesByTrip(tripId, userId);
    } catch (error) {
      throw error;
    }
  }

  static async updateExpense(expenseId: string, userId: string, updates: Record<string, any>) {
    try {
      return await BudgetModel.updateExpense(expenseId, userId, updates);
    } catch (error) {
      throw error;
    }
  }

  static async deleteExpense(expenseId: string, userId: string) {
    try {
      return await BudgetModel.deleteExpense(expenseId, userId);
    } catch (error) {
      throw error;
    }
  }

  static async getBudgetBreakdown(tripId: string, userId: string) {
    try {
      return await BudgetModel.getBudgetSummary(tripId, userId);
    } catch (error) {
      throw error;
    }
  }
}
