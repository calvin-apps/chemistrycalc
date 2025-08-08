import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeftRight, Lightbulb } from 'lucide-react';
import { identifyConjugatePairs, identifyConjugatePairsInReaction } from '@/utils/chemistryCalculations';

const ConjugatePairIdentifier = () => {
  const [compound, setCompound] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleIdentify = () => {
    if (!compound.trim()) {
      setError('Please enter a compound or reaction');
      return;
    }

    try {
      const input = compound.trim();
      const isReaction = /(→|->|=)/.test(input);
      if (isReaction) {
        const res = identifyConjugatePairsInReaction(input);
        if (!res.pairs || res.pairs.length === 0) {
          setError('No conjugate acid-base pairs identified in this reaction');
          setResult(null);
        } else {
          setResult({ mode: 'reaction', ...res });
          setError('');
        }
      } else {
        const identificationResult = identifyConjugatePairs(input);
        setResult({ mode: 'single', data: identificationResult });
        setError('');
      }
    } catch (err) {
      setError('Error identifying conjugate pairs');
      setResult(null);
    }
  };

  const examples = ['HCl', 'NH₃', 'CH₃COOH', 'OH⁻', 'H₂O', 'F⁻', 'HCl + H₂O -> H₃O⁺ + Cl⁻'];

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-blue-900">
          <ArrowLeftRight className="w-6 h-6" />
          Conjugate Acid-Base Pair Identifier
        </CardTitle>
        <CardDescription className="text-blue-700">
          Identify conjugate acid-base pairs and their properties
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-blue-900">Chemical Compound or Ion</label>
          <div className="flex gap-2">
            <Input
              value={compound}
              onChange={(e) => setCompound(e.target.value)}
              placeholder="Enter compound or reaction (e.g., HCl, NH₃, or HCl + H2O -> H3O+ + Cl-)"
              className="flex-1"
            />
            <Button onClick={handleIdentify} className="bg-blue-600 hover:bg-blue-700 text-white">
              Identify
            </Button>
          </div>
        </div>

        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <>
            {result.mode === 'single' && result.data && (
              <Alert className={`border-green-200 bg-green-50 ${result.data.type === 'unknown' ? 'border-yellow-200 bg-yellow-50' : ''}`}>
                <AlertDescription className={result.data.type === 'unknown' ? 'text-yellow-800' : 'text-green-800'}>
                  <div className="space-y-3">
                    <div>
                      <strong>Compound:</strong>
                      <p className="mt-1 font-mono text-lg">{result.data.compound}</p>
                    </div>
                    <div>
                      <strong>Type:</strong>
                      <p className="mt-1 capitalize">{result.data.type}</p>
                    </div>
                    <div>
                      <strong>Conjugate Partner:</strong>
                      <p className="mt-1 font-mono text-lg">{result.data.conjugate}</p>
                    </div>
                    <div>
                      <strong>Conjugate Pair:</strong>
                      <p className="mt-1 font-mono text-lg text-blue-600">{result.data.pair}</p>
                    </div>
                    <div>
                      <strong>Strength:</strong>
                      <p className="mt-1">{result.data.strength}</p>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {result.mode === 'reaction' && result.pairs && (
              <Alert className="border-green-200 bg-green-50">
                <AlertDescription className="text-green-800">
                  <div className="space-y-4">
                    <div>
                      <strong>Identified Conjugate Pairs:</strong>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {result.pairs.map((p: any, idx: number) => (
                        <div key={idx} className="p-3 rounded-md bg-white border">
                          <p className="text-sm text-blue-800 font-semibold capitalize">{p.type}</p>
                          <p className="font-mono text-lg mt-1">{p.pair}</p>
                          {p.strength && (
                            <p className="text-sm mt-1">Strength: {p.strength}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </>
        )}

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-blue-700">
            <Lightbulb className="w-4 h-4" />
            <span className="font-medium">Common Examples:</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {examples.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-blue-600 hover:bg-blue-50 font-mono"
                onClick={() => setCompound(example)}
              >
                {example}
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Key Concepts:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>Conjugate Acid:</strong> Formed when a base gains a proton (H⁺)</li>
            <li>• <strong>Conjugate Base:</strong> Formed when an acid loses a proton (H⁺)</li>
            <li>• <strong>Acid-Base Pair:</strong> Two species that differ by one proton</li>
            <li>• <strong>Strength:</strong> Strong acids have weak conjugate bases and vice versa</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConjugatePairIdentifier;