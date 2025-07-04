
import React from 'react';
import { Edit, Trash2, Calendar, Tag, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  notes?: string;
}

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    'Food & Dining': 'bg-red-100 text-red-800 border-red-200',
    'Transportation': 'bg-blue-100 text-blue-800 border-blue-200',
    'Shopping': 'bg-purple-100 text-purple-800 border-purple-200',
    'Entertainment': 'bg-pink-100 text-pink-800 border-pink-200',
    'Bills & Utilities': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Healthcare': 'bg-green-100 text-green-800 border-green-200',
    'Education': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'Travel': 'bg-teal-100 text-teal-800 border-teal-200',
    'Other': 'bg-gray-100 text-gray-800 border-gray-200'
  };
  return colors[category] || colors['Other'];
};

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onEdit, onDelete }) => {
  if (expenses.length === 0) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-12 text-center">
          <DollarSign className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No expenses yet</h3>
          <p className="text-gray-500">Start tracking your expenses by adding your first transaction above.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-6">Recent Transactions</h3>
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-medium text-gray-800">{expense.title}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(expense.category)}`}>
                    {expense.category}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span className="font-semibold text-green-600">${expense.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(expense.date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                {expense.notes && (
                  <div className="mt-2 text-sm text-gray-500 italic">
                    "{expense.notes}"
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(expense)}
                  className="hover:bg-blue-50"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this expense?')) {
                      onDelete(expense.id);
                    }
                  }}
                  className="hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
