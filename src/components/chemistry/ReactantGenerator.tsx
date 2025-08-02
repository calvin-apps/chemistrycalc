import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Lightbulb } from 'lucide-react';
import { generateReactants } from '@/utils/chemistryCalculations';

const ReactantGenerator = () => {
  const [product, setProduct] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleGenerate = () => {
    if (!product.trim()) {
      setError('Please enter a product');
      return;
    }

    try {
      const generationResult = generateReactants(product.trim());
      setResult(generationResult);
      setError('');
    } catch (err) {
      setError('Error generating reactants');
      setResult(null);
    }
  };

  const examples = ['H₂O', 'CO₂', 'NaCl', 'Fe₂O₃', 'NH₃'];

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-blue-900">
          <ArrowLeft className="w-6 h-6" />
          Reactant Generator
        </CardTitle>
        <CardDescription className="text-blue-700">
          Generate possible reactants that could form a given product
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-blue-900">Product Formula</label>
          <div className="flex gap-2">
            <Input
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="Enter product formula (e.g., H₂O, CO₂, NaCl)"
              className="flex-1"
            />
            <Button onClick={handleGenerate} className="bg-blue-600 hover:bg-blue-700 text-white">
              Generate Reactants
            </Button>
          </div>
        </div>

        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <div className="space-y-4">
            <Alert className="border-blue-200 bg-blue-50">
              <AlertDescription className="text-blue-800">
                <div className="space-y-2">
                  <div>
                    <strong>Product:</strong>
                    <span className="ml-2 font-mono text-lg">{result.product}</span>
                  </div>
                  <div>
                    <strong>Number of possible reactions found:</strong>
                    <span className="ml-2">{result.possibleReactions.length}</span>
                  </div>
                </div>
              </AlertDescription>
            </Alert>

            {result.possibleReactions.length > 0 ? (
              <div className="space-y-3">
                <h4 className="font-semibold text-blue-900">Possible Reactions:</h4>
                {result.possibleReactions.map((reaction: any, index: number) => (
                  <Alert key={index} className="border-green-200 bg-green-50">
                    <AlertDescription className="text-green-800">
                      <div className="space-y-2">
                        <div>
                          <strong>Reaction Type:</strong>
                          <span className="ml-2">{reaction.reactionType}</span>
                        </div>
                        <div>
                          <strong>Reactants:</strong>
                          <span className="ml-2 font-mono">{reaction.reactants.join(' + ')}</span>
                        </div>
                        <div>
                          <strong>Balanced Equation:</strong>
                          <p className="mt-1 font-mono text-lg text-blue-600">{reaction.equation}</p>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            ) : (
              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertDescription className="text-yellow-800">
                  No known reactions found for this product in our database. 
                  This doesn't mean no reactions exist - there might be other possible pathways not included here.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-blue-700">
            <Lightbulb className="w-4 h-4" />
            <span className="font-medium">Try These Products:</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {examples.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-blue-600 hover:bg-blue-50 font-mono"
                onClick={() => setProduct(example)}
              >
                {example}
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Reaction Types:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>Synthesis:</strong> Two or more reactants combine to form one product</li>
            <li>• <strong>Decomposition:</strong> One reactant breaks down into multiple products</li>
            <li>• <strong>Combustion:</strong> Reaction with oxygen producing CO₂ and H₂O</li>
            <li>• <strong>Neutralization:</strong> Acid + Base → Salt + Water</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReactantGenerator;