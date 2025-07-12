
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Formula {
  name: string;
  formula: string;
  description: string;
  category: string;
}

const formulas: Formula[] = [
  // Basic Chemistry
  { name: 'Molarity', formula: 'M = n/V', description: 'Moles of solute per liter of solution', category: 'basic' },
  { name: 'Density', formula: 'ρ = m/V', description: 'Mass per unit volume', category: 'basic' },
  { name: 'Concentration', formula: 'C = n/V', description: 'Amount of substance per volume', category: 'basic' },
  { name: 'Dilution', formula: 'M₁V₁ = M₂V₂', description: 'Dilution of solutions', category: 'basic' },
  
  // Gas Laws
  { name: 'Ideal Gas Law', formula: 'PV = nRT', description: 'Relationship between pressure, volume, temperature, and moles', category: 'gas' },
  { name: "Boyle's Law", formula: 'P₁V₁ = P₂V₂', description: 'Pressure-volume relationship at constant temperature', category: 'gas' },
  { name: "Charles's Law", formula: 'V₁/T₁ = V₂/T₂', description: 'Volume-temperature relationship at constant pressure', category: 'gas' },
  { name: "Gay-Lussac's Law", formula: 'P₁/T₁ = P₂/T₂', description: 'Pressure-temperature relationship at constant volume', category: 'gas' },
  { name: 'Combined Gas Law', formula: '(P₁V₁)/T₁ = (P₂V₂)/T₂', description: 'Combined relationship of P, V, and T', category: 'gas' },
  
  // Thermodynamics
  { name: 'Enthalpy Change', formula: 'ΔH = H_products - H_reactants', description: 'Change in enthalpy during reaction', category: 'thermo' },
  { name: 'Heat Capacity', formula: 'q = mcΔT', description: 'Heat required to change temperature', category: 'thermo' },
  { name: 'Gibbs Free Energy', formula: 'ΔG = ΔH - TΔS', description: 'Free energy change in a reaction', category: 'thermo' },
  { name: 'Entropy Change', formula: 'ΔS = S_products - S_reactants', description: 'Change in entropy during reaction', category: 'thermo' },
  
  // Equilibrium
  { name: 'Equilibrium Constant', formula: 'K = [products]/[reactants]', description: 'Ratio of products to reactants at equilibrium', category: 'equilibrium' },
  { name: 'pH', formula: 'pH = -log[H⁺]', description: 'Measure of hydrogen ion concentration', category: 'equilibrium' },
  { name: 'pOH', formula: 'pOH = -log[OH⁻]', description: 'Measure of hydroxide ion concentration', category: 'equilibrium' },
  { name: 'Water Constant', formula: 'Kw = [H⁺][OH⁻] = 1×10⁻¹⁴', description: 'Ion product of water', category: 'equilibrium' },
  { name: 'Henderson-Hasselbalch', formula: 'pH = pKa + log([A⁻]/[HA])', description: 'Buffer equation', category: 'equilibrium' },
  
  // Kinetics
  { name: 'Rate Law', formula: 'Rate = k[A]ᵐ[B]ⁿ', description: 'Reaction rate dependence on concentration', category: 'kinetics' },
  { name: 'Arrhenius Equation', formula: 'k = Ae^(-Ea/RT)', description: 'Temperature dependence of rate constant', category: 'kinetics' },
  { name: 'Half-life (1st order)', formula: 't₁/₂ = 0.693/k', description: 'Time for concentration to reduce by half', category: 'kinetics' },
  
  // Electrochemistry
  { name: 'Nernst Equation', formula: 'E = E° - (RT/nF)ln(Q)', description: 'Cell potential under non-standard conditions', category: 'electro' },
  { name: "Faraday's Law", formula: 'Q = nF', description: 'Charge required for electrochemical reaction', category: 'electro' },
  { name: 'Cell Potential', formula: 'E°cell = E°cathode - E°anode', description: 'Standard cell potential', category: 'electro' }
];

const categories = {
  basic: 'Basic Chemistry',
  gas: 'Gas Laws',
  thermo: 'Thermodynamics',
  equilibrium: 'Equilibrium & pH',
  kinetics: 'Chemical Kinetics',
  electro: 'Electrochemistry'
};

const ChemistryFormulasView = () => {
  return (
    <div className="w-full h-full p-6">
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <span className="text-green-600">🧮</span>
            Chemistry Formulas Reference
          </CardTitle>
          <CardDescription>
            Comprehensive collection of essential chemistry equations and formulas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              {Object.entries(categories).map(([key, label]) => (
                <TabsTrigger key={key} value={key} className="text-xs">
                  {label.split(' ')[0]}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {Object.entries(categories).map(([key, label]) => (
              <TabsContent key={key} value={key}>
                <ScrollArea className="h-[calc(100vh-300px)]">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">{label}</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {formulas
                        .filter(formula => formula.category === key)
                        .map((formula, index) => (
                          <Card key={index} className="p-4 hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                            <div className="space-y-3">
                              <h4 className="font-semibold text-lg text-gray-800">
                                {formula.name}
                              </h4>
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <code className="text-lg font-mono text-blue-600">
                                  {formula.formula}
                                </code>
                              </div>
                              <p className="text-gray-600 text-sm">
                                {formula.description}
                              </p>
                            </div>
                          </Card>
                        ))}
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChemistryFormulasView;
