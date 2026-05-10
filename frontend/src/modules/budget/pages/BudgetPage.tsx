import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  const [showForm, setShowForm] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: '',
    description: '',
    amount: 0,
    currency: 'USD',
    paid_by: user?.id || '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    fetchExpenses();
  }, [tripId]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      if (!tripId) return;
      const response = await traveloopApi.get(`/budget/${tripId}/expenses`);
      setExpenses(response.expenses || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!tripId) return;
      await traveloopApi.post(`/budget/${tripId}/expenses`, newExpense);
      setNewExpense({
        category: '',
        description: '',
        amount: 0,
        currency: 'USD',
        paid_by: user?.id || '',
        date: new Date().toISOString().split('T')[0],
      });
      setShowForm(false);
      await fetchExpenses();
    } catch (err: any) {
      setError(err.message || 'Failed to add expense');
    }
  };

  const handleDeleteExpense = async (expenseId: string) => {
    try {
      if (!tripId) return;
      await traveloopApi.delete(`/budget/${tripId}/expenses/${expenseId}`);
      await fetchExpenses();
    } catch (err: any) {
      setError(err.message || 'Failed to delete expense');
    }
  };

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  if (loading) return <div className="p-4">Loading expenses...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Budget</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Expense
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddExpense} className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Category"
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
              className="px-3 py-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={newExpense.description}
              onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
              className="px-3 py-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) })}
              className="px-3 py-2 border rounded"
              required
            />
            <select
              value={newExpense.currency}
              onChange={(e) => setNewExpense({ ...newExpense, currency: e.target.value })}
              className="px-3 py-2 border rounded"
            >
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
              <option>INR</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save Expense
          </button>
        </form>
      )}

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Total: {totalAmount.toFixed(2)}</h2>
      </div>

      <div className="space-y-3">
        {expenses.map((expense) => (
          <div key={expense.id} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{expense.category}</h3>
              <p className="text-gray-600">{expense.description}</p>
              <p className="text-sm text-gray-400">{expense.date}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold">{expense.amount} {expense.currency}</span>
              <button
                onClick={() => handleDeleteExpense(expense.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetPage;
