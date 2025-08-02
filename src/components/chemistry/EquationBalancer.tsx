
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Scale, CheckCircle, AlertTriangle } from 'lucide-react';
import { balanceEquation } from '@/utils/chemistryCalculations';
import ChemicalSymbolInserter from './ChemicalSymbolInserter';

const EquationBalancer = () => {
  const [equation, setEquation] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleBalance = () => {
    try {
      setError('');
      const balanced = balanceEquation(equation);
      setResult(balanced);
    } catch (err) {
      setError('Unable to balance equation. Please check your input format.');
      setResult(null);
    }
  };

  const insertSymbol = (symbol: string) => {
    setEquation(prev => prev + symbol);
  };

  const examples = [
    'H2 + O2 → H2O',
    'CH4 + O2 → CO2 + H2O',
    'Fe + O2 → Fe2O3',
    'C2H6 + O2 → CO2 + H2O'
  ];

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
      <CardHeader className="pb-4 sm:pb-6">
        <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl text-blue-900">
          <Scale className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
          <span className="leading-tight">Chemical Equation Balancer</span>
        </CardTitle>
        <CardDescription className="text-blue-700 text-sm sm:text-base">
          Enter a chemical equation to get the balanced version with proper coefficients
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        <div className="space-y-3 sm:space-y-4">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <label className="block text-sm font-medium text-blue-900">
                Chemical Equation (use → or = for reaction arrow)
              </label>
              <div className="self-start sm:self-auto">
                <ChemicalSymbolInserter onSymbolInsert={insertSymbol} />
              </div>
            </div>
            <Input
              value={equation}
              onChange={(e) => setEquation(e.target.value)}
              placeholder="e.g., H2 + O2 → H2O"
              className="text-base sm:text-lg font-mono touch-manipulation"
            />
          </div>
          
          <Button 
            onClick={handleBalance}
            className="w-full bg-blue-600 hover:bg-blue-700 h-12 sm:h-10 touch-manipulation"
            disabled={!equation.trim()}
          >
            Balance Equation
          </Button>
        </div>

        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {result && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription>
              <div className="space-y-2">
                <p className="font-semibold text-green-800">Balanced Equation:</p>
                <p className="text-sm sm:text-lg font-mono bg-white p-3 rounded border text-green-900 break-all">
                  {result.balanced}
                </p>
                {result.coefficients && (
                  <p className="text-sm text-green-700">
                    Coefficients: {result.coefficients.join(', ')}
                  </p>
                )}
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-6 sm:mt-8">
          <h3 className="font-semibold text-blue-900 mb-3 text-sm sm:text-base">Example Equations:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => setEquation(example)}
                className="
                  text-left p-3 text-sm bg-blue-50 hover:bg-blue-100 
                  rounded border transition-colors font-mono text-blue-800
                  touch-manipulation min-h-[44px] flex items-center
                "
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EquationBalancer;
