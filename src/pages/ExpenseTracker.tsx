import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, PieChart, BarChart3, ArrowLeft, Search, Filter, Bell, Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ExpenseChart } from '@/components/ExpenseChart';
import { ExpenseList } from '@/components/ExpenseList';
import CurrencyConverter from '@/components/CurrencyConverter';
import ThemeToggle from '@/components/ThemeToggle';

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

const categories = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Travel',
  'Other'
];

const currencies = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'CAD', 'AUD'];

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showConverter, setShowConverter] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    notes: '',
    currency: 'USD',
    dueDate: '',
    isRecurring: false
  });

  // Load expenses from localStorage on component mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem('splitzee-expenses');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem('splitzee-expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const expense: Expense = {
      id: editingExpense ? editingExpense.id : Date.now().toString(),
      title: formData.title,
      amount: parseFloat(formData.amount),
      date: formData.date,
      category: formData.category,
      notes: formData.notes,
      currency: formData.currency,
      dueDate: formData.dueDate || undefined,
      isRecurring: formData.isRecurring
    };

    if (editingExpense) {
      setExpenses(expenses.map(exp => exp.id === editingExpense.id ? expense : exp));
    } else {
      setExpenses([expense, ...expenses]);
    }

    // Reset form
    setFormData({
      title: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      category: '',
      notes: '',
      currency: 'USD',
      dueDate: '',
      isRecurring: false
    });
    setShowForm(false);
    setEditingExpense(null);
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setFormData({
      title: expense.title,
      amount: expense.amount.toString(),
      date: expense.date,
      category: expense.category,
      notes: expense.notes || '',
      currency: expense.currency || 'USD',
      dueDate: expense.dueDate || '',
      isRecurring: expense.isRecurring || false
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const exportToCSV = () => {
    const headers = ['Title', 'Amount', 'Currency', 'Date', 'Category', 'Notes'];
    const csvContent = [
      headers.join(','),
      ...expenses.map(expense => [
        expense.title,
        expense.amount,
        expense.currency || 'USD',
        expense.date,
        expense.category,
        expense.notes || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || expense.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const monthlyExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const currentDate = new Date();
    return expenseDate.getMonth() === currentDate.getMonth() && 
           expenseDate.getFullYear() === currentDate.getFullYear();
  }).reduce((sum, expense) => sum + expense.amount, 0);

  const getCurrencySymbol = (currency: string) => {
    const symbols: { [key: string]: string } = {
      USD: '$', EUR: '€', GBP: '£', INR: '₹', JPY: '¥', CAD: 'C$', AUD: 'A$'
    };
    return symbols[currency] || '$';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] via-white to-[#FFDC4A]/10 dark:from-[#121212] dark:via-[#1E1E1E] dark:to-[#FFDC4A]/5">
      {/* Header */}
      <header className="px-6 py-4 bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-md border-b border-white/20 dark:border-gray-800/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/559dd7ae-1ca8-426d-8342-0ac04c422879.png" 
                alt="Splitzee Logo" 
                className="w-8 h-8 rounded-lg"
              />
              <h1 className="text-2xl font-bold text-[#121212] dark:text-white">
                Expense Tracker
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map(currency => (
                  <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ThemeToggle />
            <Button 
              onClick={() => setShowConverter(!showConverter)}
              variant="outline"
              size="sm"
            >
              Convert
            </Button>
            <Button 
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-[#FFDC4A] to-[#FFD447] hover:from-[#FFD447] hover:to-[#FFDC4A] text-[#121212]"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Currency Converter */}
        {showConverter && (
          <div className="mb-8">
            <CurrencyConverter />
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Balance</p>
                  <p className="text-2xl font-bold text-[#121212] dark:text-white">
                    {getCurrencySymbol(selectedCurrency)}{totalExpenses.toFixed(2)}
                  </p>
                </div>
                <PieChart className="h-8 w-8 text-[#FFDC4A]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
                  <p className="text-2xl font-bold text-[#121212] dark:text-white">
                    {getCurrencySymbol(selectedCurrency)}{monthlyExpenses.toFixed(2)}
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-[#FFDC4A]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Transactions</p>
                  <p className="text-2xl font-bold text-[#121212] dark:text-white">{expenses.length}</p>
                </div>
                <div className="h-8 w-8 bg-gradient-to-r from-[#4CAF50] to-[#4CAF50]/80 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">#</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Due Soon</p>
                  <p className="text-2xl font-bold text-[#FF6B6B]">
                    {expenses.filter(e => e.dueDate && new Date(e.dueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length}
                  </p>
                </div>
                <Bell className="h-8 w-8 text-[#FF6B6B]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add/Edit Expense Form */}
        {showForm && (
          <Card className="bg-white/90 dark:bg-[#1E1E1E]/90 backdrop-blur-sm border-0 shadow-xl mb-8">
            <CardHeader>
              <CardTitle className="text-[#121212] dark:text-white">
                {editingExpense ? 'Edit Expense' : 'Add New Expense'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Enter expense title"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <div className="flex">
                    <Select 
                      value={formData.currency} 
                      onValueChange={(value) => setFormData({...formData, currency: value})}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map(currency => (
                          <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      placeholder="0.00"
                      className="rounded-l-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="dueDate">Due Date (Optional)</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData({...formData, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isRecurring"
                    checked={formData.isRecurring}
                    onChange={(e) => setFormData({...formData, isRecurring: e.target.checked})}
                    className="rounded"
                  />
                  <Label htmlFor="isRecurring">Recurring expense</Label>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Add any additional notes..."
                    rows={3}
                  />
                </div>

                <div className="md:col-span-2 flex space-x-4">
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-[#FFDC4A] to-[#FFD447] hover:from-[#FFD447] hover:to-[#FFDC4A] text-[#121212]"
                  >
                    {editingExpense ? 'Update Expense' : 'Add Expense'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setShowForm(false);
                      setEditingExpense(null);
                      setFormData({
                        title: '',
                        amount: '',
                        date: new Date().toISOString().split('T')[0],
                        category: '',
                        notes: '',
                        currency: 'USD',
                        dueDate: '',
                        isRecurring: false
                      });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Charts */}
        {expenses.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <ExpenseChart expenses={expenses} />
          </div>
        )}

        {/* Filters and Search */}
        <Card className="bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-sm border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search expenses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="md:w-48">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={exportToCSV}
                variant="outline"
                className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Expense List */}
        <ExpenseList 
          expenses={filteredExpenses} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
          getCurrencySymbol={getCurrencySymbol}
        />
      </div>
    </div>
  );
};

export default ExpenseTracker;
