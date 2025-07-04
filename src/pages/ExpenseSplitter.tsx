
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Calculator, Share, Download, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Participant {
  id: string;
  name: string;
  amount: number;
}

const ExpenseSplitter = () => {
  const [totalAmount, setTotalAmount] = useState('');
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

  const updateParticipant = (id: string, field: 'name' | 'amount', value: string) => {
    setParticipants(participants.map(p => 
      p.id === id 
        ? { ...p, [field]: field === 'amount' ? parseFloat(value) || 0 : value }
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

    const shareText = `Expense Split Results:
Total: $${totalAmount}
${splitResult.map(p => `${p.name}: $${p.amount.toFixed(2)}`).join('\n')}
${notes ? `\nNotes: ${notes}` : ''}

Split with Splitzee - Track Smart. Split Easy.`;

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
      'Name,Amount',
      ...splitResult.map(p => `${p.name},${p.amount.toFixed(2)}`)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
      {/* Header */}
      <header className="px-6 py-4 bg-white/80 backdrop-blur-md border-b border-white/20">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bill Splitter
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            No More Awkward Math at the Dinner Table
          </h2>
          <p className="text-gray-600">
            Split expenses fairly and easily among friends
          </p>
        </div>

        {/* Split Form */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="h-5 w-5 mr-2" />
              Split Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Total Amount */}
            <div>
              <Label htmlFor="totalAmount">Total Amount ($)</Label>
              <Input
                id="totalAmount"
                type="number"
                step="0.01"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                placeholder="Enter total amount"
                className="text-lg"
              />
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
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
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
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              size="lg"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Split
            </Button>
          </CardContent>
        </Card>

        {/* Split Results */}
        {splitResult.length > 0 && (
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Split Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total Amount:</span>
                    <span className="text-2xl font-bold text-blue-600">${totalAmount}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-600">Split among {splitResult.length} people</span>
                    <span className="text-sm text-gray-600">
                      {splitType === 'equal' ? 'Equal Split' : 'Custom Split'}
                    </span>
                  </div>
                </div>

                {/* Individual Results */}
                <div className="space-y-3">
                  {splitResult.map((person) => (
                    <div key={person.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-800">{person.name}</span>
                      <span className="text-lg font-bold text-green-600">${person.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Notes */}
                {notes && (
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Notes:</h4>
                    <p className="text-gray-600">{notes}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <Button onClick={shareResult} variant="outline" className="flex-1">
                    <Share className="h-4 w-4 mr-2" />
                    Share Results
                  </Button>
                  <Button onClick={downloadCSV} variant="outline" className="flex-1">
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
