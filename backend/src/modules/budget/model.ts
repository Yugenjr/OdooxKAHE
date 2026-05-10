import { supabaseClient } from "../../config/database";

export class BudgetModel {
  static async addExpense(tripId: string, userId: string, expenseData: Record<string, any>) {
    const { data, error } = await supabaseClient
      .from("expenses")
      .insert([
        {
          trip_id: tripId,
          user_id: userId,
          ...expenseData,
          created_at: new Date(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getExpensesByTrip(tripId: string, userId: string) {
    const { data, error } = await supabaseClient
      .from("expenses")
      .select("*")
      .eq("trip_id", tripId)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  static async updateExpense(expenseId: string, userId: string, updates: Record<string, any>) {
    const { data, error } = await supabaseClient
      .from("expenses")
      .update(updates)
      .eq("id", expenseId)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteExpense(expenseId: string, userId: string) {
    const { error } = await supabaseClient
      .from("expenses")
      .delete()
      .eq("id", expenseId)
      .eq("user_id", userId);

    if (error) throw error;
    return { success: true };
  }

  static async getBudgetSummary(tripId: string, userId: string) {
    const { data, error } = await supabaseClient
      .from("expenses")
      .select("*")
      .eq("trip_id", tripId)
      .eq("user_id", userId);

    if (error) throw error;

    const summary = {
      total: 0,
      byCategory: {} as Record<string, number>,
      expenses: data || [],
    };

    (data || []).forEach((expense: any) => {
      summary.total += expense.amount || 0;
      const category = expense.category || "Other";
      summary.byCategory[category] = (summary.byCategory[category] || 0) + (expense.amount || 0);
    });

    return summary;
  }
}
