import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowRight, Lightbulb } from 'lucide-react';
import { convertWordEquation } from '@/utils/chemistryCalculations';

const WordEquationConverter = () => {
  const [wordEquation, setWordEquation] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleConvert = () => {
    if (!wordEquation.trim()) {
      setError('Please enter a word equation');
      return;
    }

    try {
      const conversionResult = convertWordEquation(wordEquation);
      setResult(conversionResult);
      setError('');
    } catch (err) {
      setError('Error converting word equation');
      setResult(null);
    }
  };

  const examples = [
    'hydrogen plus oxygen yields water',
    'methane and oxygen produces carbon dioxide and water',
    'iron reacts with oxygen to form iron oxide',
    'sodium plus chlorine yields sodium chloride'
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-blue-900">
          <ArrowRight className="w-6 h-6" />
          Word Equation Converter
        </CardTitle>
        <CardDescription className="text-blue-700">
          Convert word equations to chemical formulas and get balanced equations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-blue-900">Word Equation</label>
          <Textarea
            value={wordEquation}
            onChange={(e) => setWordEquation(e.target.value)}
            placeholder="Enter word equation (e.g., hydrogen plus oxygen yields water)"
            className="min-h-20"
          />
          <Button onClick={handleConvert} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Convert to Chemical Equation
          </Button>
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
                  <strong>Original Word Equation:</strong>
                  <p className="mt-1">{result.wordEquation}</p>
                </div>
                <div>
                  <strong>Chemical Equation:</strong>
                  <p className="mt-1 font-mono text-lg">{result.chemicalEquation}</p>
                </div>
                <div>
                  <strong>Balanced Equation:</strong>
                  <p className="mt-1 font-mono text-lg text-blue-600">{result.balanced}</p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-blue-700">
            <Lightbulb className="w-4 h-4" />
            <span className="font-medium">Example Word Equations:</span>
          </div>
          <div className="grid gap-2">
            {examples.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-left justify-start h-auto p-3 text-sm text-blue-600 hover:bg-blue-50"
                onClick={() => setWordEquation(example)}
              >
                {example}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WordEquationConverter;