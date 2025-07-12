
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Target, Calculator } from 'lucide-react';

const PercentYieldCalculator = () => {
  const [theoreticalYield, setTheoreticalYield] = useState('');
  const [actualYield, setActualYield] = useState('');
  const [percentYield, setPercentYield] = useState('');
  const [calculationType, setCalculationType] = useState('percent');
  const [result, setResult] = useState<any>(null);

  const calculateYield = () => {
    const theoretical = parseFloat(theoreticalYield);
    const actual = parseFloat(actualYield);
    const percent = parseFloat(percentYield);

    let calculatedResult: any = {};

    if (calculationType === 'percent' && !isNaN(theoretical) && !isNaN(actual) && theoretical > 0) {
      const calculatedPercent = (actual / theoretical) * 100;
      calculatedResult = {
        type: 'Percent Yield',
        result: calculatedPercent.toFixed(2),
        unit: '%',
        formula: '% Yield = (Actual Yield / Theoretical Yield) × 100',
        calculation: `(${actual} / ${theoretical}) × 100 = ${calculatedPercent.toFixed(2)}%`,
        efficiency: getEfficiencyDescription(calculatedPercent)
      };
    } else if (calculationType === 'actual' && !isNaN(theoretical) && !isNaN(percent) && theoretical > 0) {
      const calculatedActual = (percent / 100) * theoretical;
      calculatedResult = {
        type: 'Actual Yield',
        result: calculatedActual.toFixed(3),
        unit: 'g (or units of theoretical)',
        formula: 'Actual Yield = (% Yield / 100) × Theoretical Yield',
        calculation: `(${percent} / 100) × ${theoretical} = ${calculatedActual.toFixed(3)}`,
        note: 'Units match the units of theoretical yield'
      };
    } else if (calculationType === 'theoretical' && !isNaN(actual) && !isNaN(percent) && percent > 0) {
      const calculatedTheoretical = (actual * 100) / percent;
      calculatedResult = {
        type: 'Theoretical Yield',
        result: calculatedTheoretical.toFixed(3),
        unit: 'g (or units of actual)',
        formula: 'Theoretical Yield = (Actual Yield × 100) / % Yield',
        calculation: `(${actual} × 100) / ${percent} = ${calculatedTheoretical.toFixed(3)}`,
        note: 'Units match the units of actual yield'
      };
    }

    setResult(calculatedResult);
  };

  const getEfficiencyDescription = (percentYield: number): string => {
    if (percentYield >= 90) return 'Excellent yield - very efficient reaction';
    if (percentYield >= 70) return 'Good yield - reasonably efficient';
    if (percentYield >= 50) return 'Moderate yield - some losses occurred';
    if (percentYield >= 30) return 'Low yield - significant losses';
    return 'Very low yield - investigate reaction conditions';
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-blue-900">
          <Target className="w-6 h-6" />
          Percent Yield Calculator
        </CardTitle>
        <CardDescription className="text-blue-700">
          Calculate percent yield, actual yield, or theoretical yield
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label className="text-blue-900 mb-3 block">What do you want to calculate?</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <button
                onClick={() => setCalculationType('percent')}
                className={`p-3 text-sm border rounded transition-colors ${
                  calculationType === 'percent'
                    ? 'bg-blue-100 border-blue-300 text-blue-800'
                    : 'bg-white border-gray-300 hover:bg-gray-50'
                }`}
              >
                Calculate % Yield
              </button>
              <button
                onClick={() => setCalculationType('actual')}
                className={`p-3 text-sm border rounded transition-colors ${
                  calculationType === 'actual'
                    ? 'bg-blue-100 border-blue-300 text-blue-800'
                    : 'bg-white border-gray-300 hover:bg-gray-50'
                }`}
              >
                Calculate Actual Yield
              </button>
              <button
                onClick={() => setCalculationType('theoretical')}
                className={`p-3 text-sm border rounded transition-colors ${
                  calculationType === 'theoretical'
                    ? 'bg-blue-100 border-blue-300 text-blue-800'
                    : 'bg-white border-gray-300 hover:bg-gray-50'
                }`}
              >
                Calculate Theoretical Yield
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(calculationType === 'percent' || calculationType === 'actual') && (
              <div>
                <Label className="text-blue-900">Theoretical Yield</Label>
                <Input
                  type="number"
                  value={theoreticalYield}
                  onChange={(e) => setTheoreticalYield(e.target.value)}
                  placeholder="Maximum possible yield"
                  className="mt-1"
                />
                <p className="text-xs text-blue-600 mt-1">
                  The maximum amount that could be produced (calculated from stoichiometry)
                </p>
              </div>
            )}

            {(calculationType === 'percent' || calculationType === 'theoretical') && (
              <div>
                <Label className="text-blue-900">Actual Yield</Label>
                <Input
                  type="number"
                  value={actualYield}
                  onChange={(e) => setActualYield(e.target.value)}
                  placeholder="Amount actually obtained"
                  className="mt-1"
                />
                <p className="text-xs text-blue-600 mt-1">
                  The amount you actually obtained in the lab
                </p>
              </div>
            )}

            {(calculationType === 'actual' || calculationType === 'theoretical') && (
              <div>
                <Label className="text-blue-900">Percent Yield (%)</Label>
                <Input
                  type="number"
                  value={percentYield}
                  onChange={(e) => setPercentYield(e.target.value)}
                  placeholder="Percentage efficiency"
                  className="mt-1"
                />
                <p className="text-xs text-blue-600 mt-1">
                  The efficiency of the reaction (0-100%)
                </p>
              </div>
            )}
          </div>

          <Button 
            onClick={calculateYield}
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={
              (calculationType === 'percent' && (!theoreticalYield || !actualYield)) ||
              (calculationType === 'actual' && (!theoreticalYield || !percentYield)) ||
              (calculationType === 'theoretical' && (!actualYield || !percentYield))
            }
          >
            <Calculator className="w-4 h-4 mr-2" />
            Calculate {calculationType === 'percent' ? 'Percent Yield' : calculationType === 'actual' ? 'Actual Yield' : 'Theoretical Yield'}
          </Button>
        </div>

        {result && Object.keys(result).length > 0 && (
          <Alert className="border-green-200 bg-green-50">
            <AlertDescription>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-green-800">{result.type}:</p>
                  <p className="text-3xl font-bold text-green-900">
                    {result.result} {result.unit}
                  </p>
                </div>

                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-green-800">Formula:</p>
                  <p className="font-mono text-sm text-green-700 mb-2">{result.formula}</p>
                  
                  <p className="font-semibold text-green-800">Calculation:</p>
                  <p className="font-mono text-sm text-green-700">{result.calculation}</p>

                  {result.note && (
                    <p className="text-sm text-green-600 mt-2 italic">{result.note}</p>
                  )}
                </div>

                {result.efficiency && (
                  <div className="bg-blue-50 p-3 rounded border">
                    <p className="font-semibold text-blue-800">Reaction Efficiency:</p>
                    <p className="text-sm text-blue-700">{result.efficiency}</p>
                  </div>
                )}
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-3">Understanding Percent Yield:</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p><strong>Theoretical Yield:</strong> Maximum amount that can be produced based on stoichiometry</p>
            <p><strong>Actual Yield:</strong> Amount actually obtained in the laboratory</p>
            <p><strong>Percent Yield:</strong> Measure of reaction efficiency (actual/theoretical × 100)</p>
            
            <div className="mt-3 space-y-1">
              <p className="font-semibold">Common Yield Ranges:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-green-100 p-2 rounded">
                  <p className="font-semibold text-green-800">90-100%: Excellent</p>
                  <p>Very efficient reaction</p>
                </div>
                <div className="bg-yellow-100 p-2 rounded">
                  <p className="font-semibold text-yellow-800">70-89%: Good</p>
                  <p>Reasonably efficient</p>
                </div>
                <div className="bg-orange-100 p-2 rounded">
                  <p className="font-semibold text-orange-800">50-69%: Moderate</p>
                  <p>Some losses occurred</p>
                </div>
                <div className="bg-red-100 p-2 rounded">
                  <p className="font-semibold text-red-800">&lt;50%: Low</p>
                  <p>Significant losses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PercentYieldCalculator;
