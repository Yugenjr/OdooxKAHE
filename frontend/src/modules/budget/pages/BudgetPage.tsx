import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { traveloopApi } from '@/shared/services/traveloopApi';

interface Expense {
  id: string;
  trip_id: string;
  category: string;
  description: string;
  amount: number;
  currency: string;
  paid_by: string;
  date: string;
  created_at: string;
}

export const BudgetPage = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const { user } = useAuthStore();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Local state for adding new expense inline
  const [newExpense, setNewExpense] = useState<Partial<Expense> | null>(null);

  useEffect(() => {
    fetchExpenses();
  }, [tripId]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      if (!tripId) return;
      const { data } = await traveloopApi.getTripExpenses(tripId);
      setExpenses(Array.isArray(data) ? data : (data as any)?.expenses || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async () => {
    try {
      if (!tripId || !newExpense) return;
      
      const payload = {
        category: newExpense.category || 'New Expense',
        description: newExpense.description || '',
        amount: Number(newExpense.amount) || 0,
        currency: newExpense.currency || 'USD',
        paid_by: user?.id || '',
        date: newExpense.date || new Date().toISOString().split('T')[0],
      };
      
      await traveloopApi.addExpense(tripId, payload);
      setNewExpense(null);
      await fetchExpenses();
    } catch (err: any) {
      setError(err.message || 'Failed to add expense');
    }
  };

  const handleDeleteExpense = async (expenseId: string) => {
    try {
      if (!tripId) return;
      await traveloopApi.deleteExpense(tripId, expenseId);
      await fetchExpenses();
    } catch (err: any) {
      setError(err.message || 'Failed to delete expense');
    }
  };

  const totalAmount = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);

  if (loading) {
    return <div className="min-h-screen bg-[#0d0d0d] text-white/50 p-10 text-center">Loading budget planner...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f0ede8] font-outfit">
      <div className="max-w-2xl mx-auto px-6 py-10 space-y-6">

        {/* Header & Total */}
        <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Budget Planner</h1>
            <p className="text-white/40 mt-1">Track and manage your trip expenses</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/40 uppercase tracking-widest mb-1">Total</p>
            <p className="text-3xl font-light text-[#e8614a]">${totalAmount.toFixed(2)}</p>
          </div>
        </div>

        {error && (
          <div className="text-red-400 bg-red-400/10 p-4 rounded-xl text-sm border border-red-400/20">
            {error}
          </div>
        )}

        {/* Expenses List */}
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div key={expense.id} className="border border-white/[0.10] rounded-2xl p-6 group hover:border-white/[0.16] transition bg-white/[0.02]">
              
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-[#f0ede8] w-full">{expense.category}</h3>
                <button
                  onClick={() => handleDeleteExpense(expense.id)}
                  className="opacity-0 group-hover:opacity-100 text-white/25 hover:text-red-400 transition ml-2 flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <p className="w-full text-white/50 text-sm mb-5 leading-relaxed whitespace-pre-wrap">
                {expense.description || 'No description provided.'}
              </p>

              <div className="flex gap-3">
                <div className="w-48 px-4 py-2 bg-transparent border border-white/[0.15] rounded-lg text-sm text-white/70">
                  {new Date(expense.date).toLocaleDateString()}
                </div>
                <div className="flex-1 px-4 py-2 bg-transparent border border-white/[0.15] rounded-lg text-sm text-white/70 text-center font-medium">
                  {expense.amount} {expense.currency}
                </div>
              </div>
            </div>
          ))}

          {/* New Expense Draft Card */}
          {newExpense && (
            <div className="border border-[#e8614a]/30 rounded-2xl p-6 bg-[#e8614a]/5 shadow-[0_0_30px_rgba(232,97,74,0.05)]">
              <div className="flex items-center justify-between mb-3">
                <input
                  type="text"
                  placeholder="Category (e.g. Flight, Hotel)"
                  value={newExpense.category || ''}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                  className="text-lg font-bold bg-transparent text-[#f0ede8] focus:outline-none w-full placeholder-white/20"
                  autoFocus
                />
                <button
                  onClick={() => setNewExpense(null)}
                  className="text-white/25 hover:text-red-400 transition ml-2 flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <textarea
                placeholder="Add details about this expense..."
                value={newExpense.description || ''}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                rows={2}
                className="w-full bg-transparent text-white/70 text-sm focus:outline-none resize-none mb-5 leading-relaxed placeholder-white/20"
              />

              <div className="flex gap-3 mb-4">
                <input
                  type="date"
                  value={newExpense.date || ''}
                  onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                  className="w-48 px-4 py-2 bg-transparent border border-white/[0.15] rounded-lg text-sm text-white/70 focus:outline-none focus:border-[#e8614a]/50 transition [color-scheme:dark]"
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={newExpense.amount || ''}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) })}
                  className="flex-1 px-4 py-2 bg-transparent border border-white/[0.15] rounded-lg text-sm text-white/70 placeholder-white/30 focus:outline-none focus:border-[#e8614a]/50 transition text-center"
                />
              </div>

              <button
                onClick={handleAddExpense}
                className="w-full py-3 bg-[#e8614a] text-white font-semibold rounded-xl hover:bg-[#e8614a]/90 transition shadow-lg shadow-[#e8614a]/20"
              >
                Save Expense
              </button>
            </div>
          )}
        </div>

        {/* Add Button */}
        {!newExpense && (
          <div className="flex justify-center pt-6">
            <button
              onClick={() => setNewExpense({ date: new Date().toISOString().split('T')[0], currency: 'USD' })}
              className="flex items-center gap-2 px-8 py-3 border border-white/[0.12] rounded-xl text-sm text-white/60 hover:text-[#f0ede8] hover:border-[#e8614a]/40 hover:bg-[#e8614a]/[0.06] transition"
            >
              <Plus className="w-4 h-4" />
              Add another Expense
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default BudgetPage;
