
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeftRight, Info } from 'lucide-react';
import { identifyReactionType } from '@/utils/chemistryCalculations';
import ChemicalSymbolInserter from './ChemicalSymbolInserter';

const ReactionIdentifier = () => {
  const [equation, setEquation] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleIdentify = () => {
    const identification = identifyReactionType(equation);
    setResult(identification);
  };

  const insertSymbol = (symbol: string) => {
    setEquation(prev => prev + symbol);
  };

  const reactionTypes = {
    'Synthesis': { color: 'bg-green-100 text-green-800', description: 'A + B → AB' },
    'Decomposition': { color: 'bg-red-100 text-red-800', description: 'AB → A + B' },
    'Single Displacement': { color: 'bg-blue-100 text-blue-800', description: 'A + BC → AC + B' },
    'Double Displacement': { color: 'bg-purple-100 text-purple-800', description: 'AB + CD → AD + CB' },
    'Combustion': { color: 'bg-orange-100 text-orange-800', description: 'Fuel + O₂ → CO₂ + H₂O' },
    'Acid-Base': { color: 'bg-yellow-100 text-yellow-800', description: 'Acid + Base → Salt + Water' }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-blue-900">
          <ArrowLeftRight className="w-6 h-6" />
          Reaction Type Identifier
        </CardTitle>
        <CardDescription className="text-blue-700">
          Identify the type of chemical reaction based on the equation pattern
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-blue-900">
                Chemical Equation
              </label>
              <ChemicalSymbolInserter onSymbolInsert={insertSymbol} />
            </div>
            <Input
              value={equation}
              onChange={(e) => setEquation(e.target.value)}
              placeholder="e.g., 2H2 + O2 → 2H2O"
              className="text-lg"
            />
          </div>
          
          <Button 
            onClick={handleIdentify}
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={!equation.trim()}
          >
            Identify Reaction Type
          </Button>
        </div>

        {result && (
          <Alert className="border-blue-200 bg-blue-50">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-blue-800 mb-2">Reaction Type:</p>
                  <Badge className={reactionTypes[result.type]?.color || 'bg-gray-100 text-gray-800'}>
                    {result.type}
                  </Badge>
                </div>
                
                {result.type !== 'Unknown' && (
                  <div>
                    <p className="font-semibold text-blue-800">General Pattern:</p>
                    <p className="font-mono text-sm bg-white p-2 rounded border">
                      {reactionTypes[result.type]?.description}
                    </p>
                  </div>
                )}
                
                {result.description && (
                  <div>
                    <p className="font-semibold text-blue-800">Description:</p>
                    <p className="text-sm text-blue-700">{result.description}</p>
                  </div>
                )}
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-8">
          <h3 className="font-semibold text-blue-900 mb-4">Reaction Types Reference:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(reactionTypes).map(([type, info]) => (
              <div key={type} className="p-4 bg-gray-50 rounded-lg border">
                <Badge className={info.color + ' mb-2'}>
                  {type}
                </Badge>
                <p className="font-mono text-sm text-gray-700">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReactionIdentifier;
