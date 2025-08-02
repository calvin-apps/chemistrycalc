import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Zap, Scale, Atom } from 'lucide-react';

const ChemistryReference = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const laws = [
    {
      name: "Law of Conservation of Mass",
      statement: "Mass is neither created nor destroyed in a chemical reaction.",
      formula: "Mass of reactants = Mass of products",
      application: "Used in balancing chemical equations and stoichiometry calculations.",
      grade: "8-9"
    },
    {
      name: "Law of Definite Proportions",
      statement: "A chemical compound always contains its component elements in fixed ratio by mass.",
      formula: "% element = (mass of element / total mass) × 100",
      application: "Determining empirical and molecular formulas.",
      grade: "10-11"
    },
    {
      name: "Ideal Gas Law",
      statement: "Relates pressure, volume, temperature, and amount of gas.",
      formula: "PV = nRT",
      application: "Gas calculations, where P=pressure, V=volume, n=moles, R=gas constant, T=temperature",
      grade: "11-12"
    },
    {
      name: "Boyle's Law",
      statement: "At constant temperature, pressure is inversely proportional to volume.",
      formula: "P₁V₁ = P₂V₂",
      application: "Gas pressure and volume relationships",
      grade: "10-11"
    },
    {
      name: "Charles's Law",
      statement: "At constant pressure, volume is directly proportional to temperature.",
      formula: "V₁/T₁ = V₂/T₂",
      application: "Gas volume and temperature relationships",
      grade: "10-11"
    },
    {
      name: "Avogadro's Law",
      statement: "Equal volumes of gases at same temperature and pressure contain equal numbers of molecules.",
      formula: "V₁/n₁ = V₂/n₂",
      application: "Molar volume calculations",
      grade: "11-12"
    }
  ];

  const definitions = [
    {
      term: "Atom",
      definition: "The smallest unit of an element that retains its chemical properties.",
      grade: "8-9"
    },
    {
      term: "Molecule",
      definition: "Two or more atoms bonded together chemically.",
      grade: "8-9"
    },
    {
      term: "Ion",
      definition: "An atom or molecule with a net electric charge due to loss or gain of electrons.",
      grade: "9-10"
    },
    {
      term: "Ionic Bond",
      definition: "Chemical bond formed by electrostatic attraction between oppositely charged ions.",
      grade: "9-10"
    },
    {
      term: "Covalent Bond",
      definition: "Chemical bond formed by sharing of electron pairs between atoms.",
      grade: "9-10"
    },
    {
      term: "Mole",
      definition: "The amount of substance containing 6.022 × 10²³ particles (Avogadro's number).",
      grade: "10-11"
    },
    {
      term: "Molarity",
      definition: "Concentration expressed as moles of solute per liter of solution (M = mol/L).",
      grade: "11-12"
    },
    {
      term: "pH",
      definition: "Measure of hydrogen ion concentration; pH = -log[H⁺]",
      grade: "11-12"
    },
    {
      term: "Catalyst",
      definition: "Substance that increases reaction rate without being consumed in the reaction.",
      grade: "10-11"
    },
    {
      term: "Oxidation",
      definition: "Loss of electrons or increase in oxidation state.",
      grade: "11-12"
    },
    {
      term: "Reduction",
      definition: "Gain of electrons or decrease in oxidation state.",
      grade: "11-12"
    }
  ];

  const formulas = [
    {
      name: "Molar Mass",
      formula: "M = m/n",
      variables: "M = molar mass (g/mol), m = mass (g), n = moles",
      grade: "10-11"
    },
    {
      name: "Density",
      formula: "ρ = m/V",
      variables: "ρ = density, m = mass, V = volume",
      grade: "8-9"
    },
    {
      name: "Concentration (Molarity)",
      formula: "M = n/V",
      variables: "M = molarity (mol/L), n = moles, V = volume (L)",
      grade: "11-12"
    },
    {
      name: "pH Calculations",
      formula: "pH = -log[H⁺]",
      variables: "[H⁺] = hydrogen ion concentration",
      grade: "11-12"
    },
    {
      name: "Percent Yield",
      formula: "% Yield = (actual yield / theoretical yield) × 100",
      variables: "Yields in same units (grams, moles, etc.)",
      grade: "11-12"
    },
    {
      name: "Heat Capacity",
      formula: "q = mcΔT",
      variables: "q = heat, m = mass, c = specific heat, ΔT = temperature change",
      grade: "11-12"
    }
  ];

  return (
    <Card className="w-full max-w-6xl mx-auto bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-blue-900">
          <BookOpen className="w-6 h-6" />
          Chemistry Reference Guide
        </CardTitle>
        <CardDescription className="text-blue-700">
          Essential chemistry laws, definitions, and formulas for grades 8-12
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="laws" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="laws" className="flex items-center gap-2">
              <Scale className="w-4 h-4" />
              Laws
            </TabsTrigger>
            <TabsTrigger value="definitions" className="flex items-center gap-2">
              <Atom className="w-4 h-4" />
              Definitions
            </TabsTrigger>
            <TabsTrigger value="formulas" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Formulas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="laws" className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Fundamental Chemistry Laws</h3>
            {laws.map((law, index) => (
              <Card key={index} className="border-blue-200">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg text-blue-800">{law.name}</CardTitle>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      Grade {law.grade}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <strong className="text-blue-900">Statement:</strong>
                    <p className="mt-1 text-gray-700">{law.statement}</p>
                  </div>
                  <div>
                    <strong className="text-blue-900">Formula:</strong>
                    <p className="mt-1 font-mono text-lg text-blue-600">{law.formula}</p>
                  </div>
                  <div>
                    <strong className="text-blue-900">Application:</strong>
                    <p className="mt-1 text-gray-700">{law.application}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="definitions" className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Key Chemistry Terms</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {definitions.map((def, index) => (
                <Card key={index} className="border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-blue-800">{def.term}</h4>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        Grade {def.grade}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">{def.definition}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="formulas" className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Essential Formulas</h3>
            {formulas.map((formula, index) => (
              <Card key={index} className="border-blue-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-blue-800">{formula.name}</h4>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      Grade {formula.grade}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <strong className="text-blue-900">Formula:</strong>
                      <p className="mt-1 font-mono text-xl text-blue-600">{formula.formula}</p>
                    </div>
                    <div>
                      <strong className="text-blue-900">Variables:</strong>
                      <p className="mt-1 text-sm text-gray-700">{formula.variables}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ChemistryReference;