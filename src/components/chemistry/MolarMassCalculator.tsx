
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Atom, CheckCircle } from 'lucide-react';
import { calculateMolarMass } from '@/utils/chemistryCalculations';
import ChemicalSymbolInserter from './ChemicalSymbolInserter';

const MolarMassCalculator = () => {
  const [formula, setFormula] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    try {
      setError('');
      const molarMass = calculateMolarMass(formula);
      setResult(molarMass);
    } catch (err) {
      setError('Invalid chemical formula. Please check your input.');
      setResult(null);
    }
  };

  const insertSymbol = (symbol: string) => {
    setFormula(prev => prev + symbol);
  };

  const examples = [
    'H2O',
    'NaCl', 
    'C6H12O6',
    'CaCO3',
    'H2SO4',
    'C2H5OH'
  ];

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
      <CardHeader className="pb-4 sm:pb-6">
        <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl text-blue-900">
          <Atom className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
          <span className="leading-tight">Molar Mass Calculator</span>
        </CardTitle>
        <CardDescription className="text-blue-700 text-sm sm:text-base">
          Calculate the molar mass of any chemical compound
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        <div className="space-y-3 sm:space-y-4">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <label className="block text-sm font-medium text-blue-900">
                Chemical Formula
              </label>
              <div className="self-start sm:self-auto">
                <ChemicalSymbolInserter onSymbolInsert={insertSymbol} />
              </div>
            </div>
            <Input
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              placeholder="e.g., H2O, NaCl, C6H12O6"
              className="text-base sm:text-lg touch-manipulation"
            />
          </div>
          
          <Button 
            onClick={handleCalculate}
            className="w-full bg-blue-600 hover:bg-blue-700 h-12 sm:h-10 touch-manipulation"
            disabled={!formula.trim()}
          >
            Calculate Molar Mass
          </Button>
        </div>

        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {result && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-green-800 text-sm sm:text-base">Formula: {result.formula}</p>
                  <p className="text-xl sm:text-2xl font-bold text-green-900 mt-2">
                    {result.molarMass.toFixed(2)} g/mol
                  </p>
                </div>
                
                {result.breakdown && (
                  <div>
                    <p className="font-semibold text-green-800 mb-2">Elemental Breakdown:</p>
                    <div className="bg-white p-3 rounded border">
                      {Object.entries(result.breakdown).map(([element, data]: [string, any]) => (
                        <div key={element} className="flex justify-between items-center py-1">
                          <span className="font-mono text-sm">
                            {element} × {data.count}
                          </span>
                          <span className="text-sm text-gray-600">
                            {data.atomicMass} × {data.count} = {(data.atomicMass * data.count).toFixed(2)} g/mol
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-6 sm:mt-8">
          <h3 className="font-semibold text-blue-900 mb-3 text-sm sm:text-base">Example Formulas:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => setFormula(example)}
                className="
                  text-left p-3 text-sm bg-blue-50 hover:bg-blue-100 
                  rounded border transition-colors font-mono text-blue-800
                  touch-manipulation min-h-[44px] flex items-center justify-center
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

export default MolarMassCalculator;
