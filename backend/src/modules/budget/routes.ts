import { Router } from "express";
import { BudgetController } from "./controller";
import authenticateToken from "../../middleware/auth";

const router = Router();

router.post("/:tripId/expenses", authenticateToken, BudgetController.addExpense);
router.get("/:tripId/expenses", authenticateToken, BudgetController.getExpenses);
router.put("/:tripId/expenses/:expenseId", authenticateToken, BudgetController.updateExpense);
router.delete("/:tripId/expenses/:expenseId", authenticateToken, BudgetController.deleteExpense);
router.get("/:tripId/breakdown", authenticateToken, BudgetController.getBudgetBreakdown);

export default router;
