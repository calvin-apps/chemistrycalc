
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FlaskConical, ArrowUpDown } from 'lucide-react';
import { convertUnits } from '@/utils/chemistryCalculations';

const UnitConverter = () => {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [molarMass, setMolarMass] = useState('');
  const [result, setResult] = useState<number | null>(null);

  // Text mode removed: dropdown mode only

  const convertCubicUnits = (val: number, fromUnit: string, toUnit: string): number => {
    const volumeConversions: { [key: string]: number } = {
      'm3': 1000000,
      'dm3': 1000,
      'cm3': 1,
      'mm3': 0.001,
      'liters': 1000,
      'milliliters': 1
    };

    if (volumeConversions[fromUnit] && volumeConversions[toUnit]) {
      const fromCm3 = val * volumeConversions[fromUnit];
      return fromCm3 / volumeConversions[toUnit];
    }
    
    return convertUnits(val, fromUnit, toUnit);
  };

  const handleConvert = () => {
    const conversionValue = parseFloat(value);
    const conversionFromUnit = fromUnit;
    const conversionToUnit = toUnit;

    if (isNaN(conversionValue)) return;

    const numMolarMass = parseFloat(molarMass);

    // Check if it's a cubic unit conversion
    if ((conversionFromUnit?.includes('3') || conversionFromUnit === 'liters' || conversionFromUnit === 'milliliters') &&
        (conversionToUnit?.includes('3') || conversionToUnit === 'liters' || conversionToUnit === 'milliliters')) {
      const convertedResult = convertCubicUnits(conversionValue, conversionFromUnit, conversionToUnit);
      setResult(convertedResult);
    } else {
      const convertedResult = convertUnits(conversionValue, conversionFromUnit, conversionToUnit, numMolarMass);
      setResult(convertedResult);
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-blue-900">
          <FlaskConical className="w-6 h-6" />
          Unit Converter
        </CardTitle>
        <CardDescription className="text-blue-700">
          Convert between different units commonly used in chemistry
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Dropdown Mode Only */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="text-blue-900">Value</Label>
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter value"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-blue-900">From Unit</Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grams">Grams (g)</SelectItem>
                  <SelectItem value="kilograms">Kilograms (kg)</SelectItem>
                  <SelectItem value="moles">Moles (mol)</SelectItem>
                  <SelectItem value="liters">Liters (L)</SelectItem>
                  <SelectItem value="milliliters">Milliliters (mL)</SelectItem>
                  <SelectItem value="dm3">Cubic Decimeters (dm³)</SelectItem>
                  <SelectItem value="cm3">Cubic Centimeters (cm³)</SelectItem>
                  <SelectItem value="mm3">Cubic Millimeters (mm³)</SelectItem>
                  <SelectItem value="m3">Cubic Meters (m³)</SelectItem>
                  <SelectItem value="atoms">Atoms/Molecules</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-blue-900">To Unit</Label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grams">Grams (g)</SelectItem>
                  <SelectItem value="kilograms">Kilograms (kg)</SelectItem>
                  <SelectItem value="moles">Moles (mol)</SelectItem>
                  <SelectItem value="liters">Liters (L)</SelectItem>
                  <SelectItem value="milliliters">Milliliters (mL)</SelectItem>
                  <SelectItem value="dm3">Cubic Decimeters (dm³)</SelectItem>
                  <SelectItem value="cm3">Cubic Centimeters (cm³)</SelectItem>
                  <SelectItem value="mm3">Cubic Millimeters (mm³)</SelectItem>
                  <SelectItem value="m3">Cubic Meters (m³)</SelectItem>
                  <SelectItem value="atoms">Atoms/Molecules</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-blue-900">Molar Mass (g/mol)</Label>
              <Input
                type="number"
                value={molarMass}
                onChange={(e) => setMolarMass(e.target.value)}
                placeholder="Required for mole conversions"
                className="mt-1"
              />
              <p className="text-xs text-blue-600 mt-1">
                Only needed for conversions involving moles
              </p>
            </div>

            <div className="flex items-center justify-center p-8">
              <ArrowUpDown className="w-8 h-8 text-blue-400" />
            </div>

            <button
              onClick={handleConvert}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
              disabled={!value || !fromUnit || !toUnit}
            >
              Convert
            </button>
          </div>
        </div>

        {result !== null && (
          <Alert className="border-blue-200 bg-blue-50">
            <AlertDescription>
              <div className="text-center">
                <p className="text-lg font-semibold text-blue-900">
                  {value} {fromUnit} = {result.toFixed(6)} {toUnit}
                </p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-3">Common Conversions:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="text-sm space-y-1">
              <p className="font-medium text-blue-800">Mass ↔ Moles:</p>
              <p className="text-blue-700">Requires molar mass</p>
              <p className="font-mono text-xs">moles = grams ÷ M</p>
            </div>
            <div className="text-sm space-y-1">
              <p className="font-medium text-blue-800">STP Volume:</p>
              <p className="text-blue-700">1 mole = 22.4 L</p>
              <p className="font-mono text-xs">V = n × 22.4 L</p>
            </div>
            <div className="text-sm space-y-1">
              <p className="font-medium text-blue-800">Avogadro's Number:</p>
              <p className="text-blue-700">1 mole = 6.022 × 10²³</p>
              <p className="font-mono text-xs">particles = n × Nₐ</p>
            </div>
            <div className="text-sm space-y-1">
              <p className="font-medium text-blue-800">Volume:</p>
              <p className="text-blue-700">1 L = 1000 mL</p>
              <p className="font-mono text-xs">1 kg = 1000 g</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnitConverter;
