import React, { useState } from 'react'
import { DollarSign, TrendingUp, AlertCircle, PieChart } from 'lucide-react'

interface BudgetCategory {
  name: string
  budget: number
  spent: number
  color: string
}

const BudgetPage: React.FC = () => {
  const [categories, setCategories] = useState<BudgetCategory[]>([
    { name: 'Accommodation', budget: 1500, spent: 1200, color: 'indigo' },
    { name: 'Transportation', budget: 800, spent: 650, color: 'cyan' },
    { name: 'Activities', budget: 600, spent: 400, color: 'blue' },
    { name: 'Food & Dining', budget: 900, spent: 950, color: 'purple' },
    { name: 'Shopping', budget: 500, spent: 300, color: 'pink' },
  ])

  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0)
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0)
  const remainingBudget = totalBudget - totalSpent
  const percentageSpent = (totalSpent / totalBudget) * 100

  const isOverBudget = totalSpent > totalBudget

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">
      {/* Background gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-green-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="w-8 h-8 text-green-400" />
            <h1 className="text-4xl font-bold">Budget & Cost Breakdown</h1>
          </div>
          <p className="text-white/60">Track your trip expenses and stay within budget</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Total Budget */}
          <div className="bg-gradient-to-br from-indigo-600/20 to-indigo-600/5 border border-indigo-500/30 rounded-2xl p-6">
            <div className="text-white/60 text-sm font-semibold mb-2">Total Budget</div>
            <div className="text-3xl font-bold mb-1">${totalBudget.toLocaleString()}</div>
            <div className="text-white/40 text-xs">for entire trip</div>
          </div>

          {/* Total Spent */}
          <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-600/5 border border-cyan-500/30 rounded-2xl p-6">
            <div className="text-white/60 text-sm font-semibold mb-2">Total Spent</div>
            <div className="text-3xl font-bold mb-1">${totalSpent.toLocaleString()}</div>
            <div className="text-white/40 text-xs">{percentageSpent.toFixed(1)}% of budget</div>
          </div>

          {/* Remaining */}
          <div className={`rounded-2xl p-6 ${isOverBudget ? 'bg-gradient-to-br from-red-600/20 to-red-600/5 border border-red-500/30' : 'bg-gradient-to-br from-green-600/20 to-green-600/5 border border-green-500/30'}`}>
            <div className="text-white/60 text-sm font-semibold mb-2">Remaining Budget</div>
            <div className={`text-3xl font-bold mb-1 ${isOverBudget ? 'text-red-400' : 'text-green-400'}`}>
              ${Math.abs(remainingBudget).toLocaleString()}
            </div>
            <div className="text-white/40 text-xs">{isOverBudget ? 'Over budget' : 'left to spend'}</div>
          </div>

          {/* Per Day Average */}
          <div className="bg-gradient-to-br from-purple-600/20 to-purple-600/5 border border-purple-500/30 rounded-2xl p-6">
            <div className="text-white/60 text-sm font-semibold mb-2">Per Day Average</div>
            <div className="text-3xl font-bold mb-1">${(totalSpent / 10).toFixed(0)}</div>
            <div className="text-white/40 text-xs">based on 10 days</div>
          </div>
        </div>

        {/* Alert if over budget */}
        {isOverBudget && (
          <div className="mb-8 bg-red-600/20 border border-red-500/50 rounded-2xl p-4 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
            <div>
              <p className="font-semibold text-red-300">Over Budget Alert</p>
              <p className="text-red-200/80 text-sm">
                You've exceeded your budget by ${(totalSpent - totalBudget).toLocaleString()}. Consider adjusting your spending or increasing your budget.
              </p>
            </div>
          </div>
        )}

        {/* Budget Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Categories List */}
          <div>
            <h2 className="text-xl font-bold mb-4">Breakdown by Category</h2>
            <div className="space-y-4">
              {categories.map((category, idx) => {
                const categoryPercentage = (category.spent / category.budget) * 100
                const isOver = category.spent > category.budget

                return (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{category.name}</h3>
                      <span className={`text-sm font-bold ${isOver ? 'text-red-400' : 'text-green-400'}`}>
                        ${category.spent} / ${category.budget}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isOver ? 'bg-gradient-to-r from-red-600 to-red-400' : 'bg-gradient-to-r from-indigo-600 to-cyan-600'
                        }`}
                        style={{ width: `${Math.min(categoryPercentage, 100)}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between mt-2 text-xs text-white/60">
                      <span>{categoryPercentage.toFixed(0)}% spent</span>
                      <span>${(category.budget - category.spent).toLocaleString()} remaining</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Pie Chart Alternative - Simple visual */}
          <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl p-8">
            <PieChart className="w-12 h-12 text-indigo-400 mb-4" />
            <h2 className="text-xl font-bold mb-6">Expense Distribution</h2>

            <div className="w-full space-y-3">
              {categories.map((category, idx) => {
                const percentage = (category.spent / totalSpent) * 100
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full bg-${category.color}-600`} />
                    <span className="text-sm flex-1">{category.name}</span>
                    <span className="font-semibold text-sm">{percentage.toFixed(1)}%</span>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 p-4 bg-white/5 rounded-lg w-full text-center">
              <p className="text-white/60 text-xs mb-1">Current Trend</p>
              <p className="text-lg font-bold text-indigo-300 flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5" />
                {percentageSpent > 75 ? 'High spending' : percentageSpent > 50 ? 'Moderate spending' : 'Low spending'}
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
            <li>✓ Food & Dining is 25% over budget - consider cooking some meals</li>
            <li>✓ Transportation savings are helping offset other expenses</li>
            <li>✓ Still time to adjust spending on shopping and activities</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BudgetPage
