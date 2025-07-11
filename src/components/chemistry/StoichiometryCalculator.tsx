
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, Beaker } from 'lucide-react';
import { calculateStoichiometry } from '@/utils/chemistryCalculations';

const StoichiometryCalculator = () => {
  const [equation, setEquation] = useState('');
  const [reactants, setReactants] = useState<string[]>([]);
  const [reactantMasses, setReactantMasses] = useState<{[key: string]: number}>({});
  const [result, setResult] = useState<any>(null);

  // Parse equation to extract reactants
  useEffect(() => {
    if (equation.trim()) {
      const parsedReactants = parseReactants(equation);
      setReactants(parsedReactants);
      // Reset masses when equation changes
      setReactantMasses({});
      setResult(null);
    } else {
      setReactants([]);
      setReactantMasses({});
      setResult(null);
    }
  }, [equation]);

  const parseReactants = (equation: string): string[] => {
    try {
      // Split by arrow symbols (→ or ->)
      const parts = equation.split(/→|->|\s*=\s*/);
      if (parts.length < 2) return [];
      
      const reactantSide = parts[0].trim();
      
      // Split by + and clean up
      const reactantList = reactantSide
        .split('+')
        .map(reactant => {
          // Remove coefficients and spaces
          return reactant.trim().replace(/^\d+\s*/, '');
        })
        .filter(reactant => reactant.length > 0);
      
      return [...new Set(reactantList)]; // Remove duplicates
    } catch (error) {
      console.log('Error parsing equation:', error);
      return [];
    }
  };

  const formatCompoundForDisplay = (compound: string): string => {
    // Convert simple subscripts for display (H2 -> H₂, O2 -> O₂, etc.)
    return compound.replace(/(\d+)/g, (match) => {
      const subscripts = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
      return match.split('').map(digit => subscripts[parseInt(digit)]).join('');
    });
  };

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

          {reactants.length > 0 && (
            <div className="space-y-3">
              <Label className="text-blue-900">Enter masses of reactants (in grams):</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reactants.map((reactant) => (
                  <div key={reactant}>
                    <Label className="text-sm text-blue-800">
                      {formatCompoundForDisplay(reactant)} (g)
                    </Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={reactantMasses[reactant] || ''}
                      onChange={(e) => handleMassChange(reactant, e.target.value)}
                      className="mt-1"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button 
            onClick={handleCalculate}
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={!equation.trim() || reactants.length === 0}
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
                          {formatCompoundForDisplay(compound)}: {formatValue(moles)} mol
                        </p>
                      ))}
                    </div>
                  </div>

                  {result.limitingReagent && (
                    <div>
                      <p className="font-semibold text-blue-800">Limiting Reagent:</p>
                      <p className="bg-red-50 text-red-800 p-2 rounded border font-mono">
                        {formatCompoundForDisplay(result.limitingReagent)}
                      </p>
                    </div>
                  )}

                  {result.products && (
                    <div>
                      <p className="font-semibold text-blue-800">Product Amounts:</p>
                      <div className="bg-white p-3 rounded border mt-1">
                        {Object.entries(result.products).map(([product, amount]) => (
                          <p key={product} className="font-mono text-sm">
                            {formatCompoundForDisplay(product)}: {formatProductValue(amount)} g
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
            <li>Enter a balanced chemical equation (use → or -> for the arrow)</li>
            <li>Input fields will appear automatically for each reactant</li>
            <li>Enter the masses of reactants in grams</li>
            <li>Click calculate to see moles, limiting reagent, and product amounts</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoichiometryCalculator;
