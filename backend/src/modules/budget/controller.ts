import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/auth";
import { BudgetService } from "./service";
import { sendSuccess, sendError } from "../../utils";

export class BudgetController {
  static async addExpense(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const tripId = String(req.params.tripId);
      const expense = await BudgetService.addExpense(tripId, req.user.id, req.body);
      sendSuccess(res, expense, "Expense added successfully", 201);
    } catch (error: any) {
      sendError(res, error.message || "Failed to add expense", 400, error);
    }
  }

  static async getExpenses(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const tripId = String(req.params.tripId);
      const expenses = await BudgetService.getExpenses(tripId, req.user.id);
      sendSuccess(res, expenses, "Expenses retrieved successfully");
    } catch (error: any) {
      sendError(res, error.message || "Failed to get expenses", 400, error);
    }
  }

  static async updateExpense(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const { expenseId } = req.params as { expenseId: string };
      const expense = await BudgetService.updateExpense(expenseId, req.user.id, req.body);
      sendSuccess(res, expense, "Expense updated successfully");
    } catch (error: any) {
      sendError(res, error.message || "Failed to update expense", 400, error);
    }
  }

  static async deleteExpense(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const { expenseId } = req.params as { expenseId: string };
      const result = await BudgetService.deleteExpense(expenseId, req.user.id);
      sendSuccess(res, result, "Expense deleted successfully");
    } catch (error: any) {
      sendError(res, error.message || "Failed to delete expense", 400, error);
    }
  }

  static async getBudgetBreakdown(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return sendError(res, "User not authenticated", 401);
      }

      const tripId = String(req.params.tripId);
      const breakdown = await BudgetService.getBudgetBreakdown(tripId, req.user.id);
      sendSuccess(res, breakdown, "Budget breakdown retrieved successfully");
    } catch (error: any) {
      sendError(res, error.message || "Failed to get budget breakdown", 400, error);
    }
  }
}
