import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Droplet, Lightbulb } from 'lucide-react';
import { determineSubstancePH } from '@/utils/chemistryCalculations';

const SubstancePHDeterminer = () => {
  const [substance, setSubstance] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleDetermine = () => {
    if (!substance.trim()) {
      setError('Please enter a substance');
      return;
    }

    try {
      const pHResult = determineSubstancePH(substance.trim());
      setResult(pHResult);
      setError('');
    } catch (err) {
      setError('Error determining pH');
      setResult(null);
    }
  };

  const getColorForPH = (ph: number | null) => {
    if (ph === null) return 'text-gray-600';
    if (ph < 3) return 'text-red-600';
    if (ph < 7) return 'text-orange-600';
    if (ph === 7) return 'text-green-600';
    if (ph < 11) return 'text-blue-600';
    return 'text-purple-600';
  };

  const examples = [
    'HCl', 'lemon juice', 'vinegar', 'coffee', 'milk', 'pure water',
    'baking soda', 'ammonia', 'NaOH', 'H₂SO₄'
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-blue-900">
          <Droplet className="w-6 h-6" />
          Substance pH Determiner
        </CardTitle>
        <CardDescription className="text-blue-700">
          Determine the pH of substances and classify them as acidic, neutral, or basic
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-blue-900">Substance Name or Formula</label>
          <div className="flex gap-2">
            <Input
              value={substance}
              onChange={(e) => setSubstance(e.target.value)}
              placeholder="Enter substance (e.g., lemon juice, HCl, NaOH)"
              className="flex-1"
            />
            <Button onClick={handleDetermine} className="bg-blue-600 hover:bg-blue-700 text-white">
              Determine pH
            </Button>
          </div>
        </div>

        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <Alert className="border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">
              <div className="space-y-3">
                <div>
                  <strong>Substance:</strong>
                  <p className="mt-1">{result.substance}</p>
                </div>
                {result.ph !== null ? (
                  <div>
                    <strong>pH Value:</strong>
                    <p className={`mt-1 text-2xl font-bold ${getColorForPH(result.ph)}`}>
                      {result.ph}
                    </p>
                  </div>
                ) : (
                  <div>
                    <strong>pH Value:</strong>
                    <p className="mt-1 text-gray-600">Not available</p>
                  </div>
                )}
                <div>
                  <strong>Classification:</strong>
                  <p className={`mt-1 font-semibold ${getColorForPH(result.ph)}`}>
                    {result.classification}
                  </p>
                </div>
                <div>
                  <strong>Type:</strong>
                  <p className="mt-1">{result.type}</p>
                </div>
                <div>
                  <strong>Description:</strong>
                  <p className="mt-1">{result.description}</p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-blue-700">
            <Lightbulb className="w-4 h-4" />
            <span className="font-medium">Common Substances:</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {examples.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-blue-600 hover:bg-blue-50"
                onClick={() => setSubstance(example)}
              >
                {example}
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">pH Scale Reference:</h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-red-600">
              <strong>Acidic (0-6.9)</strong>
              <p>Higher H⁺ concentration</p>
            </div>
            <div className="text-green-600">
              <strong>Neutral (7.0)</strong>
              <p>Equal H⁺ and OH⁻</p>
            </div>
            <div className="text-blue-600">
              <strong>Basic (7.1-14)</strong>
              <p>Higher OH⁻ concentration</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubstancePHDeterminer;