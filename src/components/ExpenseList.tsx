
import React from 'react';
import { Edit, Trash2, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  notes?: string;
  currency?: string;
  dueDate?: string;
  isRecurring?: boolean;
}

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
  getCurrencySymbol: (currency: string) => string;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ 
  expenses, 
  onEdit, 
  onDelete, 
  getCurrencySymbol 
}) => {
  if (expenses.length === 0) {
    return (
      <Card className="bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-12 text-center">
          <DollarSign className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            No expenses yet
          </h3>
          <p className="text-gray-500 dark:text-gray-500">
            Start tracking your expenses by adding your first transaction
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-sm border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#121212] dark:text-white mb-4">
            Recent Expenses
          </h3>
          
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 bg-white/50 dark:bg-[#121212]/30 rounded-lg border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all duration-200"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-[#121212] dark:text-white">
                      {expense.title}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(expense.date).toLocaleDateString()}
                      </span>
                      <span className="px-2 py-1 bg-[#FFDC4A]/20 text-[#121212] rounded-full text-xs">
                        {expense.category}
                      </span>
                      {expense.isRecurring && (
                        <span className="px-2 py-1 bg-[#4CAF50]/20 text-[#4CAF50] rounded-full text-xs">
                          Recurring
                        </span>
                      )}
                      {expense.dueDate && new Date(expense.dueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
                        <span className="px-2 py-1 bg-[#FF6B6B]/20 text-[#FF6B6B] rounded-full text-xs">
                          Due Soon
                        </span>
                      )}
                    </div>
                    {expense.notes && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        {expense.notes}
                      </p>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-semibold text-[#121212] dark:text-white">
                      {getCurrencySymbol(expense.currency || 'USD')}{expense.amount.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(expense)}
                  className="border-[#FFDC4A] text-[#FFDC4A] hover:bg-[#FFDC4A] hover:text-[#121212]"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(expense.id)}
                  className="border-[#FF6B6B] text-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white"
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
