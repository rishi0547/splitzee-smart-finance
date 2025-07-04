
import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
];

// Mock exchange rates (in real app, fetch from API)
const exchangeRates: { [key: string]: { [key: string]: number } } = {
  USD: { EUR: 0.85, GBP: 0.73, INR: 83.12, JPY: 110, CAD: 1.25, AUD: 1.35 },
  EUR: { USD: 1.18, GBP: 0.86, INR: 97.88, JPY: 129.6, CAD: 1.47, AUD: 1.59 },
  GBP: { USD: 1.37, EUR: 1.16, INR: 113.87, JPY: 150.7, CAD: 1.71, AUD: 1.85 },
  INR: { USD: 0.012, EUR: 0.010, GBP: 0.0088, JPY: 1.32, CAD: 0.015, AUD: 0.016 },
  JPY: { USD: 0.0091, EUR: 0.0077, GBP: 0.0066, INR: 0.76, CAD: 0.011, AUD: 0.012 },
  CAD: { USD: 0.80, EUR: 0.68, GBP: 0.58, INR: 66.50, JPY: 88, AUD: 1.08 },
  AUD: { USD: 0.74, EUR: 0.63, GBP: 0.54, INR: 61.57, JPY: 81.5, CAD: 0.93 },
};

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    calculateConversion();
  }, [amount, fromCurrency, toCurrency]);

  const calculateConversion = () => {
    const amountNum = parseFloat(amount) || 0;
    if (fromCurrency === toCurrency) {
      setResult(amountNum);
      return;
    }

    const rate = exchangeRates[fromCurrency]?.[toCurrency] || 1;
    setResult(amountNum * rate);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const fromSymbol = currencies.find(c => c.code === fromCurrency)?.symbol || '';
  const toSymbol = currencies.find(c => c.code === toCurrency)?.symbol || '';

  return (
    <Card className="bg-white/90 dark:bg-[#1E1E1E]/90 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center text-[#121212] dark:text-white">
          <DollarSign className="h-5 w-5 mr-2 text-[#FFDC4A]" />
          Currency Converter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">From</label>
            <div className="flex space-x-2">
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                className="flex-1"
              />
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map(currency => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">To</label>
            <div className="flex space-x-2">
              <Input
                type="text"
                value={`${toSymbol}${result.toFixed(2)}`}
                readOnly
                className="flex-1 bg-gray-50 dark:bg-[#242424]"
              />
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map(currency => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={swapCurrencies}
            variant="outline"
            size="sm"
            className="border-[#FFDC4A] text-[#FFDC4A] hover:bg-[#FFDC4A] hover:text-[#121212]"
          >
            <ArrowRightLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="bg-[#4DABF7]/10 dark:bg-[#4DABF7]/5 p-4 rounded-lg">
          <div className="text-center">
            <p className="text-lg font-semibold text-[#121212] dark:text-white">
              {fromSymbol}{amount} {fromCurrency} = {toSymbol}{result.toFixed(2)} {toCurrency}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Rate: 1 {fromCurrency} = {(exchangeRates[fromCurrency]?.[toCurrency] || 1).toFixed(4)} {toCurrency}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Last updated: {lastUpdated.toLocaleDateString()} {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrencyConverter;
