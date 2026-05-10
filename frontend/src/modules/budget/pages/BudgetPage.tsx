import React, { useState } from 'react'
import {
  DollarSign,
  TrendingUp,
  AlertCircle,
  PieChart,
  Plus,
  Edit2,
  Trash2,
  X
} from 'lucide-react'

interface BudgetCategory {
  id: number
  name: string
  budget: number
  spent: number
  color: string
}

const BudgetPage: React.FC = () => {
  const [categories, setCategories] = useState<BudgetCategory[]>([
    {
      id: 1,
      name: 'Accommodation',
      budget: 120000,
      spent: 95000,
      color: 'indigo'
    },
    {
      id: 2,
      name: 'Transportation',
      budget: 40000,
      spent: 28000,
      color: 'cyan'
    },
    {
      id: 3,
      name: 'Activities',
      budget: 30000,
      spent: 18000,
      color: 'blue'
    },
    {
      id: 4,
      name: 'Food & Dining',
      budget: 25000,
      spent: 32000,
      color: 'purple'
    },
    {
      id: 5,
      name: 'Shopping',
      budget: 20000,
      spent: 12000,
      color: 'pink'
    }
  ])

  const [showModal, setShowModal] = useState(false)

  const [editingId, setEditingId] = useState<number | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    budget: '',
    spent: '',
    color: 'indigo'
  })

  const totalBudget = categories.reduce(
    (sum, cat) => sum + cat.budget,
    0
  )

  const totalSpent = categories.reduce(
    (sum, cat) => sum + cat.spent,
    0
  )

  const remainingBudget = totalBudget - totalSpent

  const percentageSpent =
    totalBudget > 0
      ? (totalSpent / totalBudget) * 100
      : 0

  const isOverBudget = totalSpent > totalBudget

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`
  }

  const openAddModal = () => {
    setEditingId(null)

    setFormData({
      name: '',
      budget: '',
      spent: '',
      color: 'indigo'
    })

    setShowModal(true)
  }

  const openEditModal = (category: BudgetCategory) => {
    setEditingId(category.id)

    setFormData({
      name: category.name,
      budget: category.budget.toString(),
      spent: category.spent.toString(),
      color: category.color
    })

    setShowModal(true)
  }

  const handleSave = () => {
    if (
      !formData.name ||
      !formData.budget ||
      !formData.spent
    )
      return

    const updatedCategory = {
      id: editingId || Date.now(),
      name: formData.name,
      budget: Number(formData.budget),
      spent: Number(formData.spent),
      color: formData.color
    }

    if (editingId) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingId
            ? updatedCategory
            : cat
        )
      )
    } else {
      setCategories((prev) => [
        ...prev,
        updatedCategory
      ])
    }

    setShowModal(false)
  }

  const handleDelete = (id: number) => {
    setCategories((prev) =>
      prev.filter((cat) => cat.id !== id)
    )
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />

        <div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-green-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-8 h-8 text-green-400" />

              <h1 className="text-4xl font-bold">
                Budget & Cost Breakdown
              </h1>
            </div>

            <p className="text-white/60">
              Track your trip expenses and stay
              within budget
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:scale-105 transition-all font-semibold"
          >
            <Plus className="w-5 h-5" />
            Add Budget
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Total Budget */}
          <div className="bg-gradient-to-br from-indigo-600/20 to-indigo-600/5 border border-indigo-500/30 rounded-2xl p-6">
            <div className="text-white/60 text-sm font-semibold mb-2">
              Total Budget
            </div>

            <div className="text-3xl font-bold mb-1">
              {formatCurrency(totalBudget)}
            </div>

            <div className="text-white/40 text-xs">
              for entire trip
            </div>
          </div>

          {/* Total Spent */}
          <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-600/5 border border-cyan-500/30 rounded-2xl p-6">
            <div className="text-white/60 text-sm font-semibold mb-2">
              Total Spent
            </div>

            <div className="text-3xl font-bold mb-1">
              {formatCurrency(totalSpent)}
            </div>

            <div className="text-white/40 text-xs">
              {percentageSpent.toFixed(1)}% of budget
            </div>
          </div>

          {/* Remaining */}
          <div
            className={`rounded-2xl p-6 ${
              isOverBudget
                ? 'bg-gradient-to-br from-red-600/20 to-red-600/5 border border-red-500/30'
                : 'bg-gradient-to-br from-green-600/20 to-green-600/5 border border-green-500/30'
            }`}
          >
            <div className="text-white/60 text-sm font-semibold mb-2">
              Remaining Budget
            </div>

            <div
              className={`text-3xl font-bold mb-1 ${
                isOverBudget
                  ? 'text-red-400'
                  : 'text-green-400'
              }`}
            >
              {formatCurrency(
                Math.abs(remainingBudget)
              )}
            </div>

            <div className="text-white/40 text-xs">
              {isOverBudget
                ? 'Over budget'
                : 'left to spend'}
            </div>
          </div>

          {/* Per Day */}
          <div className="bg-gradient-to-br from-purple-600/20 to-purple-600/5 border border-purple-500/30 rounded-2xl p-6">
            <div className="text-white/60 text-sm font-semibold mb-2">
              Per Day Average
            </div>

            <div className="text-3xl font-bold mb-1">
              {formatCurrency(
                Math.round(totalSpent / 10)
              )}
            </div>

            <div className="text-white/40 text-xs">
              based on 10 days
            </div>
          </div>
        </div>

        {/* Alert */}
        {isOverBudget && (
          <div className="mb-8 bg-red-600/20 border border-red-500/50 rounded-2xl p-4 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />

            <div>
              <p className="font-semibold text-red-300">
                Over Budget Alert
              </p>

              <p className="text-red-200/80 text-sm">
                You've exceeded your budget by{' '}
                {formatCurrency(
                  totalSpent - totalBudget
                )}
              </p>
            </div>
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Categories */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              Breakdown by Category
            </h2>

            <div className="space-y-4">
              {categories.map((category) => {
                const categoryPercentage =
                  (category.spent /
                    category.budget) *
                  100

                const isOver =
                  category.spent >
                  category.budget

                return (
                  <div
                    key={category.id}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition"
                  >
                    {/* Top */}
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">
                        {category.name}
                      </h3>

                      <div className="flex items-center gap-3">
                        <span
                          className={`text-sm font-bold ${
                            isOver
                              ? 'text-red-400'
                              : 'text-green-400'
                          }`}
                        >
                          {formatCurrency(
                            category.spent
                          )}{' '}
                          /{' '}
                          {formatCurrency(
                            category.budget
                          )}
                        </span>

                        {/* Edit */}
                        <button
                          onClick={() =>
                            openEditModal(category)
                          }
                          className="p-2 rounded-lg hover:bg-white/10 transition"
                        >
                          <Edit2 className="w-4 h-4 text-white/70" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() =>
                            handleDelete(
                              category.id
                            )
                          }
                          className="p-2 rounded-lg hover:bg-red-500/10 transition"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isOver
                            ? 'bg-gradient-to-r from-red-600 to-red-400'
                            : 'bg-gradient-to-r from-indigo-600 to-cyan-600'
                        }`}
                        style={{
                          width: `${Math.min(
                            categoryPercentage,
                            100
                          )}%`
                        }}
                      />
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-2 text-xs text-white/60">
                      <span>
                        {categoryPercentage.toFixed(
                          0
                        )}
                        % spent
                      </span>

                      <span>
                        {formatCurrency(
                          category.budget -
                            category.spent
                        )}{' '}
                        remaining
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Distribution */}
          <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl p-8">
            <PieChart className="w-12 h-12 text-indigo-400 mb-4" />

            <h2 className="text-xl font-bold mb-6">
              Expense Distribution
            </h2>

            <div className="w-full space-y-3">
              {categories.map((category) => {
                const percentage =
                  (category.spent /
                    totalSpent) *
                  100

                return (
                  <div
                    key={category.id}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-${category.color}-600`}
                    />

                    <span className="text-sm flex-1">
                      {category.name}
                    </span>

                    <span className="font-semibold text-sm">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 p-4 bg-white/5 rounded-lg w-full text-center">
              <p className="text-white/60 text-xs mb-1">
                Current Trend
              </p>

              <p className="text-lg font-bold text-indigo-300 flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5" />

                {percentageSpent > 75
                  ? 'High spending'
                  : percentageSpent > 50
                  ? 'Moderate spending'
                  : 'Low spending'}
              </p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-r from-indigo-600/10 to-cyan-600/10 border border-indigo-500/30 rounded-2xl p-6">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-indigo-400" />
            Budget Tips
          </h3>

          <ul className="space-y-2 text-sm text-white/80">
            <li>
              ✓ Food & Dining is over budget -
              consider reducing restaurant
              expenses
            </li>

            <li>
              ✓ Transportation savings are
              helping offset other expenses
            </li>

            <li>
              ✓ Monitor shopping expenses to
              stay within budget
            </li>
          </ul>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-[#0d0d0d] border border-white/10 rounded-3xl p-8 shadow-2xl">
              {/* Close */}
              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-all"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>

              <h2 className="text-3xl font-bold mb-8">
                {editingId
                  ? 'Edit Budget'
                  : 'Add Budget'}
              </h2>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm text-white/60 mb-2">
                    Category Name
                  </label>

                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        name: e.target.value
                      }))
                    }
                    placeholder="Enter category"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm text-white/60 mb-2">
                    Budget Amount (₹)
                  </label>

                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        budget:
                          e.target.value
                      }))
                    }
                    placeholder="Enter budget"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Spent */}
                <div>
                  <label className="block text-sm text-white/60 mb-2">
                    Spent Amount (₹)
                  </label>

                  <input
                    type="number"
                    value={formData.spent}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        spent:
                          e.target.value
                      }))
                    }
                    placeholder="Enter spent amount"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 mt-10">
                <button
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white/70 transition-all"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:scale-105 transition-all text-white font-semibold"
                >
                  {editingId
                    ? 'Save Changes'
                    : 'Add Budget'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BudgetPage