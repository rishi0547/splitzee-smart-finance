
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Calculator, Share, Download, Plus, Minus, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ThemeToggle from '@/components/ThemeToggle';

interface Participant {
  id: string;
  name: string;
  amount: number;
  percentage?: number;
}

const currencies = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'CAD', 'AUD'];

const ExpenseSplitter = () => {
  const [totalAmount, setTotalAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [splitType, setSplitType] = useState('equal');
  const [participants, setParticipants] = useState<Participant[]>([
    { id: '1', name: '', amount: 0 },
    { id: '2', name: '', amount: 0 }
  ]);
  const [notes, setNotes] = useState('');
  const [splitResult, setSplitResult] = useState<Participant[]>([]);

  const addParticipant = () => {
    setParticipants([
      ...participants,
      { id: Date.now().toString(), name: '', amount: 0 }
    ]);
  };

  const removeParticipant = (id: string) => {
    if (participants.length > 2) {
      setParticipants(participants.filter(p => p.id !== id));
    }
  };

  const updateParticipant = (id: string, field: 'name' | 'amount' | 'percentage', value: string) => {
    setParticipants(participants.map(p => 
      p.id === id 
        ? { ...p, [field]: field === 'name' ? value : parseFloat(value) || 0 }
        : p
    ));
  };

  const calculateSplit = () => {
    const total = parseFloat(totalAmount) || 0;
    
    if (total <= 0 || participants.some(p => !p.name.trim())) {
      alert('Please enter a valid amount and participant names');
      return;
    }

    let result: Participant[];

    if (splitType === 'equal') {
      const amountPerPerson = total / participants.length;
      result = participants.map(p => ({
        ...p,
        amount: parseFloat(amountPerPerson.toFixed(2))
      }));
    } else if (splitType === 'percentage') {
      const totalPercentage = participants.reduce((sum, p) => sum + (p.percentage || 0), 0);
      if (Math.abs(totalPercentage - 100) > 0.1) {
        alert('Percentages must add up to 100%');
        return;
      }
      result = participants.map(p => ({
        ...p,
        amount: parseFloat(((total * (p.percentage || 0)) / 100).toFixed(2))
      }));
    } else {
      // Custom split - use the amounts entered by user
      const customTotal = participants.reduce((sum, p) => sum + p.amount, 0);
      if (Math.abs(customTotal - total) > 0.01) {
        alert(`Custom amounts (${customTotal.toFixed(2)}) don't match total amount (${total.toFixed(2)})`);
        return;
      }
      result = [...participants];
    }

    setSplitResult(result);
  };

  const shareResult = async () => {
    if (splitResult.length === 0) return;

    const shareText = `💸 Expense Split Results:
Total: ${getCurrencySymbol(currency)}${totalAmount}
${splitResult.map(p => `${p.name}: ${getCurrencySymbol(currency)}${p.amount.toFixed(2)}`).join('\n')}
${notes ? `\nNotes: ${notes}` : ''}

Split with Splitzee - Track Smart. Split Easy. 🚀`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Expense Split',
          text: shareText
        });
      } catch (error) {
        // Fallback to copy to clipboard
        navigator.clipboard.writeText(shareText);
        alert('Split details copied to clipboard!');
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Split details copied to clipboard!');
    }
  };

  const downloadCSV = () => {
    if (splitResult.length === 0) return;

    const csvContent = [
      'Name,Amount,Currency',
      ...splitResult.map(p => `${p.name},${p.amount.toFixed(2)},${currency}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expense-split.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

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
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-[#FFDC4A] to-[#FFD447] rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-[#121212]">S</span>
              </div>
              <h1 className="text-2xl font-bold text-[#121212] dark:text-white">
                Bill Splitter
              </h1>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#121212] dark:text-white mb-2">
            No More Awkward Math at the Dinner Table
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Split expenses fairly and easily among friends with multi-currency support
          </p>
        </div>

        {/* Split Form */}
        <Card className="bg-white/90 dark:bg-[#1E1E1E]/90 backdrop-blur-sm border-0 shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-[#121212] dark:text-white">
              <Calculator className="h-5 w-5 mr-2 text-[#FFDC4A]" />
              Split Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Total Amount */}
            <div>
              <Label htmlFor="totalAmount">Total Amount</Label>
              <div className="flex">
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map(curr => (
                      <SelectItem key={curr} value={curr}>{curr}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="totalAmount"
                  type="number"
                  step="0.01"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  placeholder="Enter total amount"
                  className="text-lg rounded-l-none"
                />
              </div>
            </div>

            {/* Split Type */}
            <div>
              <Label>Split Type</Label>
              <RadioGroup value={splitType} onValueChange={setSplitType} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="equal" id="equal" />
                  <Label htmlFor="equal">Equal Split</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="percentage" id="percentage" />
                  <Label htmlFor="percentage">Percentage Split</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom">Custom Amounts</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Participants */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label>Participants</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addParticipant}
                  className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Person
                </Button>
              </div>

              <div className="space-y-3">
                {participants.map((participant, index) => (
                  <div key={participant.id} className="flex items-center space-x-3">
                    <div className="flex-1">
                      <Input
                        placeholder={`Person ${index + 1} name`}
                        value={participant.name}
                        onChange={(e) => updateParticipant(participant.id, 'name', e.target.value)}
                      />
                    </div>
                    {splitType === 'percentage' && (
                      <div className="w-24">
                        <Input
                          type="number"
                          step="0.1"
                          max="100"
                          placeholder="%"
                          value={participant.percentage || ''}
                          onChange={(e) => updateParticipant(participant.id, 'percentage', e.target.value)}
                        />
                      </div>
                    )}
                    {splitType === 'custom' && (
                      <div className="w-32">
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Amount"
                          value={participant.amount || ''}
                          onChange={(e) => updateParticipant(participant.id, 'amount', e.target.value)}
                        />
                      </div>
                    )}
                    {participants.length > 2 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeParticipant(participant.id)}
                        className="border-[#FF6B6B] text-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {splitType === 'percentage' && (
                <div className="mt-3 p-3 bg-[#4DABF7]/10 dark:bg-[#4DABF7]/5 rounded-lg">
                  <div className="flex items-center text-[#4DABF7]">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      Total: {participants.reduce((sum, p) => sum + (p.percentage || 0), 0).toFixed(1)}% 
                      (should be 100%)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this expense..."
                rows={3}
              />
            </div>

            {/* Calculate Button */}
            <Button 
              onClick={calculateSplit}
              className="w-full bg-gradient-to-r from-[#FFDC4A] to-[#FFD447] hover:from-[#FFD447] hover:to-[#FFDC4A] text-[#121212] font-semibold"
              size="lg"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Split
            </Button>
          </CardContent>
        </Card>

        {/* Split Results */}
        {splitResult.length > 0 && (
          <Card className="bg-white/90 dark:bg-[#1E1E1E]/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-[#121212] dark:text-white">
                <Users className="h-5 w-5 mr-2 text-[#4CAF50]" />
                Split Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Summary */}
                <div className="bg-gradient-to-r from-[#4CAF50]/10 to-[#4CAF50]/5 dark:from-[#4CAF50]/5 dark:to-[#4CAF50]/5 p-4 rounded-lg border border-[#4CAF50]/20">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-[#121212] dark:text-white">Total Amount:</span>
                    <span className="text-2xl font-bold text-[#4CAF50]">
                      {getCurrencySymbol(currency)}{totalAmount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Split among {splitResult.length} people
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {splitType} Split
                    </span>
                  </div>
                </div>

                {/* Individual Results */}
                <div className="space-y-3">
                  {splitResult.map((person) => (
                    <div key={person.id} className="flex justify-between items-center p-4 bg-[#F5F5F5] dark:bg-[#242424] rounded-lg">
                      <span className="font-medium text-[#121212] dark:text-white">{person.name}</span>
                      <span className="text-lg font-bold text-[#FFDC4A]">
                        {getCurrencySymbol(currency)}{person.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Notes */}
                {notes && (
                  <div className="bg-[#FFDC4A]/10 dark:bg-[#FFDC4A]/5 p-4 rounded-lg border border-[#FFDC4A]/20">
                    <h4 className="font-medium text-[#121212] dark:text-white mb-2">Notes:</h4>
                    <p className="text-gray-700 dark:text-gray-300">{notes}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <Button 
                    onClick={shareResult} 
                    variant="outline" 
                    className="flex-1 border-[#4DABF7] text-[#4DABF7] hover:bg-[#4DABF7] hover:text-white"
                  >
                    <Share className="h-4 w-4 mr-2" />
                    Share Results
                  </Button>
                  <Button 
                    onClick={downloadCSV} 
                    variant="outline" 
                    className="flex-1 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download CSV
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ExpenseSplitter;
