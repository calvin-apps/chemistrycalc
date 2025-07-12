
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Atom, Plus, Minus } from 'lucide-react';

interface ElementData {
  element: string;
  percentage: string;
  atomicMass: string;
}

const FormulaCalculator = () => {
  const [elements, setElements] = useState<ElementData[]>([
    { element: '', percentage: '', atomicMass: '' }
  ]);
  const [molecularMass, setMolecularMass] = useState('');
  const [result, setResult] = useState<any>(null);

  const addElement = () => {
    setElements([...elements, { element: '', percentage: '', atomicMass: '' }]);
  };

  const removeElement = (index: number) => {
    if (elements.length > 1) {
      setElements(elements.filter((_, i) => i !== index));
    }
  };

  const updateElement = (index: number, field: keyof ElementData, value: string) => {
    const updated = [...elements];
    updated[index][field] = value;
    setElements(updated);
  };

  const calculateFormula = () => {
    try {
      // Calculate moles of each element
      const elementMoles = elements.map(el => {
        const percentage = parseFloat(el.percentage);
        const atomicMass = parseFloat(el.atomicMass);
        if (isNaN(percentage) || isNaN(atomicMass) || atomicMass === 0) {
          throw new Error('Invalid input');
        }
        return {
          element: el.element,
          moles: percentage / atomicMass
        };
      });

      // Find the smallest number of moles
      const minMoles = Math.min(...elementMoles.map(el => el.moles));

      // Calculate mole ratios
      const ratios = elementMoles.map(el => ({
        element: el.element,
        ratio: el.moles / minMoles
      }));

      // Convert to whole number ratios
      let multiplier = 1;
      const tolerance = 0.1;
      
      // Try to find a multiplier that makes all ratios close to whole numbers
      for (let mult = 1; mult <= 10; mult++) {
        const testRatios = ratios.map(r => r.ratio * mult);
        const allClose = testRatios.every(ratio => 
          Math.abs(ratio - Math.round(ratio)) < tolerance
        );
        if (allClose) {
          multiplier = mult;
          break;
        }
      }

      const empiricalRatios = ratios.map(r => ({
        element: r.element,
        ratio: Math.round(r.ratio * multiplier)
      }));

      // Create empirical formula
      const empiricalFormula = empiricalRatios
        .map(r => r.element + (r.ratio > 1 ? r.ratio : ''))
        .join('');

      // Calculate empirical formula mass
      const empiricalMass = empiricalRatios.reduce((sum, r) => {
        const element = elements.find(el => el.element === r.element);
        return sum + (parseFloat(element?.atomicMass || '0') * r.ratio);
      }, 0);

      let molecularFormula = empiricalFormula;
      let molecularMultiplier = 1;

      // Calculate molecular formula if molecular mass is provided
      if (molecularMass && !isNaN(parseFloat(molecularMass))) {
        const molMass = parseFloat(molecularMass);
        molecularMultiplier = Math.round(molMass / empiricalMass);
        
        if (molecularMultiplier > 1) {
          molecularFormula = empiricalRatios
            .map(r => r.element + (r.ratio * molecularMultiplier > 1 ? r.ratio * molecularMultiplier : ''))
            .join('');
        }
      }

      setResult({
        empiricalFormula,
        empiricalMass: empiricalMass.toFixed(2),
        molecularFormula,
        molecularMultiplier,
        ratios: empiricalRatios,
        elementMoles: elementMoles.map(el => ({
          element: el.element,
          moles: el.moles.toFixed(4)
        }))
      });

    } catch (error) {
      setResult({ error: 'Please check your inputs. All fields must have valid numbers.' });
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-blue-900">
          <Atom className="w-6 h-6" />
          Empirical & Molecular Formula Calculator
        </CardTitle>
        <CardDescription className="text-blue-700">
          Calculate empirical and molecular formulas from percentage composition
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label className="text-blue-900 mb-3 block">Element Composition Data:</Label>
            {elements.map((element, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-3 p-3 bg-gray-50 rounded">
                <div>
                  <Label className="text-sm text-blue-800">Element Symbol</Label>
                  <Input
                    value={element.element}
                    onChange={(e) => updateElement(index, 'element', e.target.value)}
                    placeholder="e.g., C, H, O"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm text-blue-800">Percentage (%)</Label>
                  <Input
                    type="number"
                    value={element.percentage}
                    onChange={(e) => updateElement(index, 'percentage', e.target.value)}
                    placeholder="Mass %"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm text-blue-800">Atomic Mass</Label>
                  <Input
                    type="number"
                    value={element.atomicMass}
                    onChange={(e) => updateElement(index, 'atomicMass', e.target.value)}
                    placeholder="g/mol"
                    className="mt-1"
                  />
                </div>
                <div className="flex items-end gap-2">
                  {elements.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeElement(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
            
            <Button
              variant="outline"
              onClick={addElement}
              className="text-blue-600 hover:text-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Element
            </Button>
          </div>

          <div>
            <Label className="text-blue-900">Molecular Mass (g/mol) - Optional</Label>
            <Input
              type="number"
              value={molecularMass}
              onChange={(e) => setMolecularMass(e.target.value)}
              placeholder="Enter molecular mass to find molecular formula"
              className="mt-1"
            />
          </div>

          <Button 
            onClick={calculateFormula}
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={elements.some(el => !el.element || !el.percentage || !el.atomicMass)}
          >
            Calculate Formulas
          </Button>
        </div>

        {result && (
          <div className="space-y-4">
            {result.error ? (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">
                  {result.error}
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="border-green-200 bg-green-50">
                <AlertDescription>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-green-800">Empirical Formula:</p>
                      <p className="text-2xl font-bold text-green-900 font-mono">
                        {result.empiricalFormula}
                      </p>
                      <p className="text-sm text-green-700">
                        Empirical Mass: {result.empiricalMass} g/mol
                      </p>
                    </div>

                    {molecularMass && (
                      <div>
                        <p className="font-semibold text-green-800">Molecular Formula:</p>
                        <p className="text-2xl font-bold text-green-900 font-mono">
                          {result.molecularFormula}
                        </p>
                        <p className="text-sm text-green-700">
                          Multiplier: {result.molecularMultiplier}
                        </p>
                      </div>
                    )}

                    <div>
                      <p className="font-semibold text-green-800">Calculation Steps:</p>
                      <div className="bg-white p-3 rounded border text-sm">
                        {result.elementMoles.map((el: any, index: number) => (
                          <p key={index} className="font-mono">
                            {el.element}: {el.moles} mol
                          </p>
                        ))}
                        <div className="mt-2 pt-2 border-t">
                          <p className="font-semibold">Mole Ratios:</p>
                          {result.ratios.map((r: any, index: number) => (
                            <p key={index} className="font-mono">
                              {r.element}: {r.ratio}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">How to use:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
            <li>Enter each element symbol (C, H, O, etc.)</li>
            <li>Enter the mass percentage for each element</li>
            <li>Enter the atomic mass for each element</li>
            <li>Optionally, enter molecular mass to find molecular formula</li>
            <li>Click calculate to get both empirical and molecular formulas</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormulaCalculator;
