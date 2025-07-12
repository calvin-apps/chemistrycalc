
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Droplet, Calculator } from 'lucide-react';

const PhCalculator = () => {
  const [calculationType, setCalculationType] = useState('ph-to-all');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculatePh = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) return;

    let calculatedResult: any = {};

    switch (calculationType) {
      case 'ph-to-all':
        if (value >= 0 && value <= 14) {
          const pOH = 14 - value;
          const hConc = Math.pow(10, -value);
          const ohConc = Math.pow(10, -pOH);
          
          calculatedResult = {
            pH: value.toFixed(2),
            pOH: pOH.toFixed(2),
            hConcentration: hConc.toExponential(2),
            ohConcentration: ohConc.toExponential(2),
            solution: value < 7 ? 'Acidic' : value > 7 ? 'Basic' : 'Neutral'
          };
        }
        break;
      
      case 'poh-to-all':
        if (value >= 0 && value <= 14) {
          const pH = 14 - value;
          const hConc = Math.pow(10, -pH);
          const ohConc = Math.pow(10, -value);
          
          calculatedResult = {
            pH: pH.toFixed(2),
            pOH: value.toFixed(2),
            hConcentration: hConc.toExponential(2),
            ohConcentration: ohConc.toExponential(2),
            solution: pH < 7 ? 'Acidic' : pH > 7 ? 'Basic' : 'Neutral'
          };
        }
        break;
      
      case 'h-to-all':
        if (value > 0) {
          const pH = -Math.log10(value);
          const pOH = 14 - pH;
          const ohConc = Math.pow(10, -pOH);
          
          calculatedResult = {
            pH: pH.toFixed(2),
            pOH: pOH.toFixed(2),
            hConcentration: value.toExponential(2),
            ohConcentration: ohConc.toExponential(2),
            solution: pH < 7 ? 'Acidic' : pH > 7 ? 'Basic' : 'Neutral'
          };
        }
        break;
      
      case 'oh-to-all':
        if (value > 0) {
          const pOH = -Math.log10(value);
          const pH = 14 - pOH;
          const hConc = Math.pow(10, -pH);
          
          calculatedResult = {
            pH: pH.toFixed(2),
            pOH: pOH.toFixed(2),
            hConcentration: hConc.toExponential(2),
            ohConcentration: value.toExponential(2),
            solution: pH < 7 ? 'Acidic' : pH > 7 ? 'Basic' : 'Neutral'
          };
        }
        break;
    }

    setResult(calculatedResult);
  };

  const getInputLabel = () => {
    switch (calculationType) {
      case 'ph-to-all': return 'pH Value (0-14)';
      case 'poh-to-all': return 'pOH Value (0-14)';
      case 'h-to-all': return '[H⁺] Concentration (M)';
      case 'oh-to-all': return '[OH⁻] Concentration (M)';
      default: return 'Input Value';
    }
  };

  const getInputPlaceholder = () => {
    switch (calculationType) {
      case 'ph-to-all': return 'e.g., 7.4';
      case 'poh-to-all': return 'e.g., 6.6';
      case 'h-to-all': return 'e.g., 1.0e-7';
      case 'oh-to-all': return 'e.g., 1.0e-7';
      default: return 'Enter value';
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-blue-900">
          <Droplet className="w-6 h-6" />
          pH / pOH Calculator
        </CardTitle>
        <CardDescription className="text-blue-700">
          Calculate pH, pOH, [H⁺], and [OH⁻] concentrations
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
                <SelectItem value="ph-to-all">From pH → Calculate All</SelectItem>
                <SelectItem value="poh-to-all">From pOH → Calculate All</SelectItem>
                <SelectItem value="h-to-all">From [H⁺] → Calculate All</SelectItem>
                <SelectItem value="oh-to-all">From [OH⁻] → Calculate All</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-blue-900">{getInputLabel()}</Label>
            <Input
              type="number"
              step="any"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={getInputPlaceholder()}
              className="mt-1"
            />
          </div>

          <Button 
            onClick={calculatePh}
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={!inputValue}
          >
            <Calculator className="w-4 h-4 mr-2" />
            Calculate
          </Button>
        </div>

        {result && Object.keys(result).length > 0 && (
          <Alert className="border-blue-200 bg-blue-50">
            <AlertDescription>
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div>
                      <p className="font-semibold text-blue-800">pH:</p>
                      <p className="text-xl font-bold text-blue-900">{result.pH}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-800">pOH:</p>
                      <p className="text-xl font-bold text-blue-900">{result.pOH}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="font-semibold text-blue-800">[H⁺] Concentration:</p>
                      <p className="text-lg font-mono text-blue-900">{result.hConcentration} M</p>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-800">[OH⁻] Concentration:</p>
                      <p className="text-lg font-mono text-blue-900">{result.ohConcentration} M</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="font-semibold text-blue-800">Solution Type:</p>
                  <div className={`inline-block px-4 py-2 rounded-full font-bold text-white ${
                    result.solution === 'Acidic' ? 'bg-red-500' :
                    result.solution === 'Basic' ? 'bg-blue-500' : 'bg-green-500'
                  }`}>
                    {result.solution}
                  </div>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-3">Key Relationships:</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p><strong>pH + pOH = 14</strong> (at 25°C)</p>
            <p><strong>pH = -log[H⁺]</strong></p>
            <p><strong>pOH = -log[OH⁻]</strong></p>
            <p><strong>[H⁺] × [OH⁻] = 1.0 × 10⁻¹⁴</strong> (Kw at 25°C)</p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div className="bg-red-100 p-2 rounded">
                <p className="font-semibold text-red-800">Acidic</p>
                <p>pH &lt; 7</p>
                <p>[H⁺] &gt; [OH⁻]</p>
              </div>
              <div className="bg-green-100 p-2 rounded">
                <p className="font-semibold text-green-800">Neutral</p>
                <p>pH = 7</p>
                <p>[H⁺] = [OH⁻]</p>
              </div>
              <div className="bg-blue-100 p-2 rounded">
                <p className="font-semibold text-blue-800">Basic</p>
                <p>pH &gt; 7</p>
                <p>[H⁺] &lt; [OH⁻]</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhCalculator;
