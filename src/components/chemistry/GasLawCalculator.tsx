
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wind, Calculator } from 'lucide-react';

const GasLawCalculator = () => {
  const [calculationType, setCalculationType] = useState('ideal-gas');
  const [pressure, setPressure] = useState('');
  const [volume, setVolume] = useState('');
  const [moles, setMoles] = useState('');
  const [temperature, setTemperature] = useState('');
  const [pressure2, setPressure2] = useState('');
  const [volume2, setVolume2] = useState('');
  const [temperature2, setTemperature2] = useState('');
  const [result, setResult] = useState<any>(null);

  const R = 0.0821; // L·atm/(mol·K)

  const calculateGasLaw = () => {
    let calculatedResult: any = {};

    try {
      switch (calculationType) {
        case 'ideal-gas':
          const P = parseFloat(pressure);
          const V = parseFloat(volume);
          const n = parseFloat(moles);
          const T = parseFloat(temperature);

          if ([P, V, n, T].filter(x => !isNaN(x)).length === 3) {
            if (isNaN(P)) {
              const calculatedP = (n * R * T) / V;
              calculatedResult = {
                type: 'Pressure',
                result: calculatedP.toFixed(3),
                unit: 'atm',
                formula: 'P = nRT/V',
                given: `V=${V}L, n=${n}mol, T=${T}K`
              };
            } else if (isNaN(V)) {
              const calculatedV = (n * R * T) / P;
              calculatedResult = {
                type: 'Volume',
                result: calculatedV.toFixed(3),
                unit: 'L',
                formula: 'V = nRT/P',
                given: `P=${P}atm, n=${n}mol, T=${T}K`
              };
            } else if (isNaN(n)) {
              const calculatedn = (P * V) / (R * T);
              calculatedResult = {
                type: 'Moles',
                result: calculatedn.toFixed(3),
                unit: 'mol',
                formula: 'n = PV/RT',
                given: `P=${P}atm, V=${V}L, T=${T}K`
              };
            } else if (isNaN(T)) {
              const calculatedT = (P * V) / (n * R);
              calculatedResult = {
                type: 'Temperature',
                result: calculatedT.toFixed(3),
                unit: 'K',
                formula: 'T = PV/nR',
                given: `P=${P}atm, V=${V}L, n=${n}mol`,
                celsius: (calculatedT - 273.15).toFixed(1)
              };
            }
          }
          break;

        case 'combined-gas':
          const P1 = parseFloat(pressure);
          const V1 = parseFloat(volume);
          const T1 = parseFloat(temperature);
          const P2_val = parseFloat(pressure2);
          const V2_val = parseFloat(volume2);
          const T2_val = parseFloat(temperature2);

          const knownValues = [P1, V1, T1, P2_val, V2_val, T2_val].filter(x => !isNaN(x));
          
          if (knownValues.length === 5) {
            if (isNaN(P2_val)) {
              const calculatedP2 = (P1 * V1 * T2_val) / (T1 * V2_val);
              calculatedResult = {
                type: 'Final Pressure',
                result: calculatedP2.toFixed(3),
                unit: 'atm',
                formula: 'P₂ = (P₁V₁T₂)/(T₁V₂)',
                initial: `P₁=${P1}atm, V₁=${V1}L, T₁=${T1}K`,
                final: `V₂=${V2_val}L, T₂=${T2_val}K`
              };
            } else if (isNaN(V2_val)) {
              const calculatedV2 = (P1 * V1 * T2_val) / (T1 * P2_val);
              calculatedResult = {
                type: 'Final Volume',
                result: calculatedV2.toFixed(3),
                unit: 'L',
                formula: 'V₂ = (P₁V₁T₂)/(T₁P₂)',
                initial: `P₁=${P1}atm, V₁=${V1}L, T₁=${T1}K`,
                final: `P₂=${P2_val}atm, T₂=${T2_val}K`
              };
            } else if (isNaN(T2_val)) {
              const calculatedT2 = (P2_val * V2_val * T1) / (P1 * V1);
              calculatedResult = {
                type: 'Final Temperature',
                result: calculatedT2.toFixed(3),
                unit: 'K',
                formula: 'T₂ = (P₂V₂T₁)/(P₁V₁)',
                initial: `P₁=${P1}atm, V₁=${V1}L, T₁=${T1}K`,
                final: `P₂=${P2_val}atm, V₂=${V2_val}L`,
                celsius: (calculatedT2 - 273.15).toFixed(1)
              };
            }
          }
          break;
      }

      setResult(calculatedResult);
    } catch (error) {
      setResult({ error: 'Please check your inputs and make sure exactly one field is left empty.' });
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-blue-900">
          <Wind className="w-6 h-6" />
          Gas Law Calculator
        </CardTitle>
        <CardDescription className="text-blue-700">
          Solve ideal gas law (PV = nRT) and combined gas law problems
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label className="text-blue-900">Gas Law Type</Label>
            <Select value={calculationType} onValueChange={setCalculationType}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ideal-gas">Ideal Gas Law (PV = nRT)</SelectItem>
                <SelectItem value="combined-gas">Combined Gas Law</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {calculationType === 'ideal-gas' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-blue-900">Pressure (atm)</Label>
                <Input
                  type="number"
                  value={pressure}
                  onChange={(e) => setPressure(e.target.value)}
                  placeholder="Leave empty to solve for P"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-blue-900">Volume (L)</Label>
                <Input
                  type="number"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  placeholder="Leave empty to solve for V"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-blue-900">Moles (mol)</Label>
                <Input
                  type="number"
                  value={moles}
                  onChange={(e) => setMoles(e.target.value)}
                  placeholder="Leave empty to solve for n"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-blue-900">Temperature (K)</Label>
                <Input
                  type="number"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  placeholder="Leave empty to solve for T"
                  className="mt-1"
                />
                <p className="text-xs text-blue-600 mt-1">
                  To convert °C to K: K = °C + 273.15
                </p>
              </div>
            </div>
          )}

          {calculationType === 'combined-gas' && (
            <div className="space-y-4">
              <div>
                <Label className="text-blue-900 font-semibold">Initial Conditions:</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div>
                    <Label className="text-sm text-blue-800">P₁ (atm)</Label>
                    <Input
                      type="number"
                      value={pressure}
                      onChange={(e) => setPressure(e.target.value)}
                      placeholder="Initial pressure"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-blue-800">V₁ (L)</Label>
                    <Input
                      type="number"
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                      placeholder="Initial volume"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-blue-800">T₁ (K)</Label>
                    <Input
                      type="number"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                      placeholder="Initial temperature"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-blue-900 font-semibold">Final Conditions:</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div>
                    <Label className="text-sm text-blue-800">P₂ (atm)</Label>
                    <Input
                      type="number"
                      value={pressure2}
                      onChange={(e) => setPressure2(e.target.value)}
                      placeholder="Leave empty to solve"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-blue-800">V₂ (L)</Label>
                    <Input
                      type="number"
                      value={volume2}
                      onChange={(e) => setVolume2(e.target.value)}
                      placeholder="Leave empty to solve"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-blue-800">T₂ (K)</Label>
                    <Input
                      type="number"
                      value={temperature2}
                      onChange={(e) => setTemperature2(e.target.value)}
                      placeholder="Leave empty to solve"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <Button 
            onClick={calculateGasLaw}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Calculate
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
                      <p className="font-semibold text-green-800">{result.type}:</p>
                      <p className="text-2xl font-bold text-green-900">
                        {result.result} {result.unit}
                      </p>
                      {result.celsius && (
                        <p className="text-lg text-green-800">
                          ({result.celsius} °C)
                        </p>
                      )}
                    </div>
                    
                    <div className="bg-white p-3 rounded border">
                      <p className="font-semibold text-green-800">Formula Used:</p>
                      <p className="font-mono text-sm text-green-700">{result.formula}</p>
                      
                      {result.given && (
                        <div className="mt-2">
                          <p className="font-semibold text-green-800">Given:</p>
                          <p className="text-sm text-green-700">{result.given}</p>
                        </div>
                      )}
                      
                      {result.initial && (
                        <div className="mt-2">
                          <p className="font-semibold text-green-800">Initial:</p>
                          <p className="text-sm text-green-700">{result.initial}</p>
                          <p className="font-semibold text-green-800 mt-1">Final:</p>
                          <p className="text-sm text-green-700">{result.final}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-3">Gas Law Formulas:</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <div>
              <p><strong>Ideal Gas Law:</strong> PV = nRT</p>
              <p className="text-xs">Where R = 0.0821 L·atm/(mol·K)</p>
            </div>
            <div>
              <p><strong>Combined Gas Law:</strong> (P₁V₁)/T₁ = (P₂V₂)/T₂</p>
              <p className="text-xs">For a fixed amount of gas</p>
            </div>
            <div className="mt-3">
              <p className="font-semibold">Temperature Conversion:</p>
              <p className="text-xs">K = °C + 273.15</p>
              <p className="text-xs">°C = K - 273.15</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GasLawCalculator;
