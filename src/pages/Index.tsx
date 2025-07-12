
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, FlaskConical, Scale, Atom, ArrowLeftRight, Beaker, Target, Wind, Droplet } from 'lucide-react';
import EquationBalancer from '@/components/chemistry/EquationBalancer';
import ReactionIdentifier from '@/components/chemistry/ReactionIdentifier';
import StoichiometryCalculator from '@/components/chemistry/StoichiometryCalculator';
import MolarMassCalculator from '@/components/chemistry/MolarMassCalculator';
import UnitConverter from '@/components/chemistry/UnitConverter';
import ConcentrationCalculator from '@/components/chemistry/ConcentrationCalculator';
import FormulaCalculator from '@/components/chemistry/FormulaCalculator';
import PercentYieldCalculator from '@/components/chemistry/PercentYieldCalculator';
import PhCalculator from '@/components/chemistry/PhCalculator';
import GasLawCalculator from '@/components/chemistry/GasLawCalculator';
import OverflowToolbar from '@/components/OverflowToolbar';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative">
      {/* Overflow Toolbar */}
      <OverflowToolbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FlaskConical className="w-12 h-12 text-blue-300 mr-3" />
            <h1 className="text-5xl font-bold text-white">ChemQuest Solver</h1>
          </div>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Your comprehensive chemistry calculation companion for students and professionals
          </p>
        </div>

        {/* Main Calculator Interface */}
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="balancer" className="w-full">
            <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 mb-8 bg-white/10 backdrop-blur-sm">
              <TabsTrigger 
                value="balancer" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-900"
              >
                <Scale className="w-4 h-4" />
                <span className="hidden sm:inline">Balancer</span>
              </TabsTrigger>
              <TabsTrigger 
                value="reactions"
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-900"
              >
                <ArrowLeftRight className="w-4 h-4" />
                <span className="hidden sm:inline">Reactions</span>
              </TabsTrigger>
              <TabsTrigger 
                value="stoichiometry"
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-900"
              >
                <Calculator className="w-4 h-4" />
                <span className="hidden sm:inline">Stoichiometry</span>
              </TabsTrigger>
              <TabsTrigger 
                value="molarmass"
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-900"
              >
                <Atom className="w-4 h-4" />
                <span className="hidden sm:inline">Molar Mass</span>
              </TabsTrigger>
              <TabsTrigger 
                value="converter"
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-900"
              >
                <FlaskConical className="w-4 h-4" />
                <span className="hidden sm:inline">Converter</span>
              </TabsTrigger>
              <TabsTrigger 
                value="concentration"
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-900"
              >
                <Beaker className="w-4 h-4" />
                <span className="hidden sm:inline">Concentration</span>
              </TabsTrigger>
              <TabsTrigger 
                value="formulas"
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-900"
              >
                <Atom className="w-4 h-4" />
                <span className="hidden sm:inline">Formulas</span>
              </TabsTrigger>
              <TabsTrigger 
                value="yield"
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-900"
              >
                <Target className="w-4 h-4" />
                <span className="hidden sm:inline">% Yield</span>
              </TabsTrigger>
              <TabsTrigger 
                value="ph"
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-900"
              >
                <Droplet className="w-4 h-4" />
                <span className="hidden sm:inline">pH/pOH</span>
              </TabsTrigger>
              <TabsTrigger 
                value="gaslaw"
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-900"
              >
                <Wind className="w-4 h-4" />
                <span className="hidden sm:inline">Gas Laws</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="balancer">
              <EquationBalancer />
            </TabsContent>

            <TabsContent value="reactions">
              <ReactionIdentifier />
            </TabsContent>

            <TabsContent value="stoichiometry">
              <StoichiometryCalculator />
            </TabsContent>

            <TabsContent value="molarmass">
              <MolarMassCalculator />
            </TabsContent>

            <TabsContent value="converter">
              <UnitConverter />
            </TabsContent>

            <TabsContent value="concentration">
              <ConcentrationCalculator />
            </TabsContent>

            <TabsContent value="formulas">
              <FormulaCalculator />
            </TabsContent>

            <TabsContent value="yield">
              <PercentYieldCalculator />
            </TabsContent>

            <TabsContent value="ph">
              <PhCalculator />
            </TabsContent>

            <TabsContent value="gaslaw">
              <GasLawCalculator />
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-blue-300">
          <p className="text-sm">
            Built for chemistry students and professionals • Always verify critical calculations • By Mafole Makhetha
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
