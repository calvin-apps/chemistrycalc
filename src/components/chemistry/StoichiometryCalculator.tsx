
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, Beaker } from 'lucide-react';
import { calculateStoichiometry } from '@/utils/chemistryCalculations';

const StoichiometryCalculator = () => {
  const [equation, setEquation] = useState('');
  const [reactantMasses, setReactantMasses] = useState<{[key: string]: number}>({});
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const stoichResult = calculateStoichiometry(equation, reactantMasses);
    setResult(stoichResult);
  };

  const handleMassChange = (compound: string, mass: string) => {
    setReactantMasses(prev => ({
      ...prev,
      [compound]: parseFloat(mass) || 0
    }));
  };

  const formatValue = (value: unknown): string => {
    if (typeof value === 'number') {
      return value.toFixed(4);
    }
    if (typeof value === 'string') {
      return value;
    }
    return String(value);
  };

  const formatProductValue = (value: unknown): string => {
    if (typeof value === 'number') {
      return value.toFixed(2);
    }
    if (typeof value === 'string') {
      return value;
    }
    return String(value);
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-blue-900">
          <Calculator className="w-6 h-6" />
          Stoichiometry Calculator
        </CardTitle>
        <CardDescription className="text-blue-700">
          Calculate moles, limiting reagent, and product quantities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label className="text-blue-900">Balanced Chemical Equation</Label>
            <Input
              value={equation}
              onChange={(e) => setEquation(e.target.value)}
              placeholder="e.g., 2H2 + O2 → 2H2O"
              className="text-lg mt-1"
            />
          </div>

          {equation && (
            <div className="space-y-3">
              <Label className="text-blue-900">Enter masses of reactants (in grams):</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* This would be dynamically generated based on parsed equation */}
                <div>
                  <Label className="text-sm text-blue-800">H₂ (g)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    onChange={(e) => handleMassChange('H2', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm text-blue-800">O₂ (g)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    onChange={(e) => handleMassChange('O2', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}

          <Button 
            onClick={handleCalculate}
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={!equation.trim()}
          >
            Calculate Stoichiometry
          </Button>
        </div>

        {result && (
          <div className="space-y-4">
            <Alert className="border-blue-200 bg-blue-50">
              <Beaker className="h-4 w-4 text-blue-600" />
              <AlertDescription>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-blue-800">Moles of Reactants:</p>
                    <div className="bg-white p-3 rounded border mt-1">
                      {Object.entries(result.moles || {}).map(([compound, moles]) => (
                        <p key={compound} className="font-mono text-sm">
                          {compound}: {formatValue(moles)} mol
                        </p>
                      ))}
                    </div>
                  </div>

                  {result.limitingReagent && (
                    <div>
                      <p className="font-semibold text-blue-800">Limiting Reagent:</p>
                      <p className="bg-red-50 text-red-800 p-2 rounded border font-mono">
                        {result.limitingReagent}
                      </p>
                    </div>
                  )}

                  {result.products && (
                    <div>
                      <p className="font-semibold text-blue-800">Product Amounts:</p>
                      <div className="bg-white p-3 rounded border mt-1">
                        {Object.entries(result.products).map(([product, amount]) => (
                          <p key={product} className="font-mono text-sm">
                            {product}: {formatProductValue(amount)} g
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">How to use:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
            <li>Enter a balanced chemical equation</li>
            <li>Input the masses of reactants in grams</li>
            <li>Click calculate to see moles, limiting reagent, and product amounts</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoichiometryCalculator;
