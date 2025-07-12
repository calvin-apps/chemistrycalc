
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Beaker, Calculator } from 'lucide-react';

const ConcentrationCalculator = () => {
  const [calculationType, setCalculationType] = useState('molarity');
  const [moles, setMoles] = useState('');
  const [volume, setVolume] = useState('');
  const [molarity, setMolarity] = useState('');
  const [mass, setMass] = useState('');
  const [molarMass, setMolarMass] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculateConcentration = () => {
    const n = parseFloat(moles);
    const V = parseFloat(volume);
    const M = parseFloat(molarity);
    const m = parseFloat(mass);
    const MM = parseFloat(molarMass);

    let calculatedResult: any = {};

    switch (calculationType) {
      case 'molarity':
        if (!isNaN(n) && !isNaN(V) && V > 0) {
          calculatedResult = {
            type: 'Molarity',
            formula: 'M = n / V',
            result: n / V,
            unit: 'M (mol/L)',
            inputs: `${n} mol in ${V} L`
          };
        }
        break;
      case 'moles':
        if (!isNaN(M) && !isNaN(V)) {
          calculatedResult = {
            type: 'Moles',
            formula: 'n = M × V',
            result: M * V,
            unit: 'mol',
            inputs: `${M} M in ${V} L`
          };
        }
        break;
      case 'volume':
        if (!isNaN(n) && !isNaN(M) && M > 0) {
          calculatedResult = {
            type: 'Volume',
            formula: 'V = n / M',
            result: n / M,
            unit: 'L',
            inputs: `${n} mol at ${M} M`
          };
        }
        break;
      case 'mass-to-molarity':
        if (!isNaN(m) && !isNaN(MM) && !isNaN(V) && MM > 0 && V > 0) {
          const molesFromMass = m / MM;
          const molarityFromMass = molesFromMass / V;
          calculatedResult = {
            type: 'Mass to Molarity',
            formula: 'M = (mass / MM) / V',
            result: molarityFromMass,
            unit: 'M (mol/L)',
            inputs: `${m} g, MM = ${MM} g/mol, V = ${V} L`,
            intermediate: `Moles = ${molesFromMass.toFixed(4)} mol`
          };
        }
        break;
    }

    setResult(calculatedResult);
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-blue-900">
          <Beaker className="w-6 h-6" />
          Concentration Calculator
        </CardTitle>
        <CardDescription className="text-blue-700">
          Calculate molarity, moles, volume, and concentration relationships
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label className="text-blue-900">Calculation Type</Label>
            <Select value={calculationType} onValueChange={setCalculationType}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="molarity">Calculate Molarity (M = n/V)</SelectItem>
                <SelectItem value="moles">Calculate Moles (n = M×V)</SelectItem>
                <SelectItem value="volume">Calculate Volume (V = n/M)</SelectItem>
                <SelectItem value="mass-to-molarity">Mass to Molarity</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(calculationType === 'molarity' || calculationType === 'volume') && (
              <div>
                <Label className="text-blue-900">Moles (mol)</Label>
                <Input
                  type="number"
                  value={moles}
                  onChange={(e) => setMoles(e.target.value)}
                  placeholder="Enter moles"
                  className="mt-1"
                />
              </div>
            )}

            {(calculationType === 'molarity' || calculationType === 'moles') && (
              <div>
                <Label className="text-blue-900">Volume (L)</Label>
                <Input
                  type="number"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  placeholder="Enter volume in liters"
                  className="mt-1"
                />
              </div>
            )}

            {(calculationType === 'moles' || calculationType === 'volume') && (
              <div>
                <Label className="text-blue-900">Molarity (M)</Label>
                <Input
                  type="number"
                  value={molarity}
                  onChange={(e) => setMolarity(e.target.value)}
                  placeholder="Enter molarity"
                  className="mt-1"
                />
              </div>
            )}

            {calculationType === 'mass-to-molarity' && (
              <>
                <div>
                  <Label className="text-blue-900">Mass (g)</Label>
                  <Input
                    type="number"
                    value={mass}
                    onChange={(e) => setMass(e.target.value)}
                    placeholder="Enter mass in grams"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-blue-900">Molar Mass (g/mol)</Label>
                  <Input
                    type="number"
                    value={molarMass}
                    onChange={(e) => setMolarMass(e.target.value)}
                    placeholder="Enter molar mass"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-blue-900">Volume (L)</Label>
                  <Input
                    type="number"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    placeholder="Enter volume in liters"
                    className="mt-1"
                  />
                </div>
              </>
            )}
          </div>

          <Button 
            onClick={calculateConcentration}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Calculate
          </Button>
        </div>

        {result && result.result !== undefined && (
          <Alert className="border-green-200 bg-green-50">
            <AlertDescription>
              <div className="space-y-2">
                <div>
                  <p className="font-semibold text-green-800">{result.type}:</p>
                  <p className="text-2xl font-bold text-green-900">
                    {result.result.toFixed(4)} {result.unit}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-green-700">Formula: {result.formula}</p>
                  <p className="text-sm text-green-700">Given: {result.inputs}</p>
                  {result.intermediate && (
                    <p className="text-sm text-green-700">{result.intermediate}</p>
                  )}
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Concentration Formulas:</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Molarity (M):</strong> M = moles of solute / liters of solution</p>
            <p><strong>Moles:</strong> n = M × V</p>
            <p><strong>Volume:</strong> V = n / M</p>
            <p><strong>From Mass:</strong> M = (mass / molar mass) / volume</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConcentrationCalculator;
