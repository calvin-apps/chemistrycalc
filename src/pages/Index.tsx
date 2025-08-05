
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, FlaskConical, Scale, Atom, ArrowLeftRight, Beaker, Target, Wind, Droplet, ArrowRight, BookOpen, ArrowLeft, LayoutGrid, Type } from 'lucide-react';
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
import WordEquationConverter from '@/components/chemistry/WordEquationConverter';
import ConjugatePairIdentifier from '@/components/chemistry/ConjugatePairIdentifier';
import SubstancePHDeterminer from '@/components/chemistry/SubstancePHDeterminer';
import ReactantGenerator from '@/components/chemistry/ReactantGenerator';
import ChemistryReference from '@/components/chemistry/ChemistryReference';
import ChemicalSymbolInserter from '@/components/chemistry/ChemicalSymbolInserter';
import ChemistryFormulasView from '@/components/chemistry/ChemistryFormulasView';
import PeriodicTableView from '@/components/chemistry/PeriodicTableView';
import OverflowToolbar from '@/components/OverflowToolbar';

const Index = () => {
  return (
    <div className="min-h-mobile bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative safe-area-top safe-area-bottom">
      {/* Overflow Toolbar */}
      <OverflowToolbar />

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-12">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <FlaskConical className="w-8 h-8 sm:w-10 md:w-12 sm:h-10 md:h-12 text-blue-300 mr-2 sm:mr-3" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              ChemX
            </h1>
          </div>
          <p className="text-sm sm:text-lg md:text-xl text-blue-200 max-w-2xl mx-auto px-4">
            Your comprehensive chemistry calculation companion for students and professionals
          </p>
        </div>

        {/* Main Calculator Interface */}
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="balancer" className="w-full">
            {/* Mobile: Horizontal scroll tabs, Desktop: Grid layout */}
            <div className="mb-4 sm:mb-8">
              <TabsList className="
                flex md:grid w-full h-auto p-1
                md:grid-cols-5 lg:grid-cols-15 
                bg-white/10 backdrop-blur-sm
                overflow-x-auto md:overflow-x-visible
                gap-1 md:gap-0
                scrollbar-hide
              " style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}>
              <TabsTrigger 
                value="balancer" 
                className="
                  flex items-center gap-1 sm:gap-2 
                  data-[state=active]:bg-white data-[state=active]:text-blue-900
                  min-w-[80px] sm:min-w-0 px-2 sm:px-3 py-2 sm:py-2.5
                  text-xs sm:text-sm whitespace-nowrap
                  touch-manipulation
                "
              >
                <Scale className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Balancer</span>
                <span className="sm:hidden">Balance</span>
              </TabsTrigger>
              <TabsTrigger 
                value="word-converter"
                className="
                  flex items-center gap-1 sm:gap-2 
                  data-[state=active]:bg-white data-[state=active]:text-blue-900
                  min-w-[80px] sm:min-w-0 px-2 sm:px-3 py-2 sm:py-2.5
                  text-xs sm:text-sm whitespace-nowrap
                  touch-manipulation
                "
              >
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Word → Chem</span>
                <span className="sm:hidden">Word</span>
              </TabsTrigger>
              <TabsTrigger 
                value="reactions"
                className="
                  flex items-center gap-1 sm:gap-2 
                  data-[state=active]:bg-white data-[state=active]:text-blue-900
                  min-w-[80px] sm:min-w-0 px-2 sm:px-3 py-2 sm:py-2.5
                  text-xs sm:text-sm whitespace-nowrap
                  touch-manipulation
                "
              >
                <ArrowLeftRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Reactions</span>
                <span className="sm:hidden">React</span>
              </TabsTrigger>
              <TabsTrigger 
                value="conjugate"
                className="
                  flex items-center gap-1 sm:gap-2 
                  data-[state=active]:bg-white data-[state=active]:text-blue-900
                  min-w-[80px] sm:min-w-0 px-2 sm:px-3 py-2 sm:py-2.5
                  text-xs sm:text-sm whitespace-nowrap
                  touch-manipulation
                "
              >
                <ArrowLeftRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Conjugate</span>
                <span className="sm:hidden">Conj</span>
              </TabsTrigger>
              <TabsTrigger 
                value="ph-determiner"
                className="
                  flex items-center gap-1 sm:gap-2 
                  data-[state=active]:bg-white data-[state=active]:text-blue-900
                  min-w-[80px] sm:min-w-0 px-2 sm:px-3 py-2 sm:py-2.5
                  text-xs sm:text-sm whitespace-nowrap
                  touch-manipulation
                "
              >
                <Droplet className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="hidden sm:inline">pH Test</span>
                <span className="sm:hidden">Test</span>
              </TabsTrigger>
              <TabsTrigger 
                value="reactant-gen"
                className="
                  flex items-center gap-1 sm:gap-2 
                  data-[state=active]:bg-white data-[state=active]:text-blue-900
                  min-w-[80px] sm:min-w-0 px-2 sm:px-3 py-2 sm:py-2.5
                  text-xs sm:text-sm whitespace-nowrap
                  touch-manipulation
                "
              >
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Reactants</span>
                <span className="sm:hidden">Gen</span>
              </TabsTrigger>
              <TabsTrigger 
                value="stoichiometry"
                className="
                  flex items-center gap-1 sm:gap-2 
                  data-[state=active]:bg-white data-[state=active]:text-blue-900
                  min-w-[80px] sm:min-w-0 px-2 sm:px-3 py-2 sm:py-2.5
                  text-xs sm:text-sm whitespace-nowrap
                  touch-manipulation
                "
              >
                <Calculator className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Stoichiometry</span>
                <span className="sm:hidden">Stoich</span>
              </TabsTrigger>
              <TabsTrigger 
                value="molarmass"
                className="
                  flex items-center gap-1 sm:gap-2 
                  data-[state=active]:bg-white data-[state=active]:text-blue-900
                  min-w-[80px] sm:min-w-0 px-2 sm:px-3 py-2 sm:py-2.5
                  text-xs sm:text-sm whitespace-nowrap
                  touch-manipulation
                "
              >
                <Atom className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Molar Mass</span>
                <span className="sm:hidden">Mass</span>
              </TabsTrigger>
              <TabsTrigger 
                value="converter"
                className="
                  flex items-center gap-1 sm:gap-2 
                  data-[state=active]:bg-white data-[state=active]:text-blue-900
                  min-w-[80px] sm:min-w-0 px-2 sm:px-3 py-2 sm:py-2.5
                  text-xs sm:text-sm whitespace-nowrap
                  touch-manipulation
                "
              >
                <FlaskConical className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Converter</span>
                <span className="sm:hidden">Conv</span>
              </TabsTrigger>
              <TabsTrigger 
                value="concentration"
                className="
                  flex items-center gap-1 sm:gap-2 
                  data-[state=active]:bg-white data-[state=active]:text-blue-900
                  min-w-[80px] sm:min-w-0 px-2 sm:px-3 py-2 sm:py-2.5
                  text-xs sm:text-sm whitespace-nowrap
                  touch-manipulation
                "
              >
                <Beaker className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Concentration</span>
                <span className="sm:hidden">Conc</span>
              </TabsTrigger>
              <TabsTrigger 
                value="formulas"
                className="
                  flex items-center gap-1 sm:gap-2 
                  data-[state=active]:bg-white data-[state=active]:text-blue-900
                  min-w-[80px] sm:min-w-0 px-2 sm:px-3 py-2 sm:py-2.5
                  text-xs sm:text-sm whitespace-nowrap
                  touch-manipulation
                "
              >
                <Atom className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Formulas</span>
                <span className="sm:hidden">Form</span>
              </TabsTrigger>
              <TabsTrigger 
                value="yield"
                className="
                  flex items-center gap-1 sm:gap-2 
                  data-[state=active]:bg-white data-[state=active]:text-blue-900
                  min-w-[80px] sm:min-w-0 px-2 sm:px-3 py-2 sm:py-2.5
                  text-xs sm:text-sm whitespace-nowrap
                  touch-manipulation
                "
              >
                <Target className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="hidden sm:inline">% Yield</span>
                <span className="sm:hidden">Yield</span>
              </TabsTrigger>
              <TabsTrigger 
                value="ph"
                className="
                  flex items-center gap-1 sm:gap-2 
                  data-[state=active]:bg-white data-[state=active]:text-blue-900
                  min-w-[80px] sm:min-w-0 px-2 sm:px-3 py-2 sm:py-2.5
                  text-xs sm:text-sm whitespace-nowrap
                  touch-manipulation
                "
              >
                <Droplet className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="hidden sm:inline">pH/pOH</span>
                <span className="sm:hidden">pH</span>
              </TabsTrigger>
              <TabsTrigger 
                value="gaslaw"
                className="
                  flex items-center gap-1 sm:gap-2 
                  data-[state=active]:bg-white data-[state=active]:text-blue-900
                  min-w-[80px] sm:min-w-0 px-2 sm:px-3 py-2 sm:py-2.5
                  text-xs sm:text-sm whitespace-nowrap
                  touch-manipulation
                "
              >
                <Wind className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Gas Laws</span>
                <span className="sm:hidden">Gas</span>
              </TabsTrigger>
              <TabsTrigger 
                value="periodic-table"
                className="
                  flex items-center gap-1 sm:gap-2 
                  data-[state=active]:bg-white data-[state=active]:text-blue-900
                  min-w-[80px] sm:min-w-0 px-2 sm:px-3 py-2 sm:py-2.5
                  text-xs sm:text-sm whitespace-nowrap
                  touch-manipulation
                "
              >
                <LayoutGrid className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Periodic Table</span>
                <span className="sm:hidden">Table</span>
              </TabsTrigger>
              <TabsTrigger 
                value="symbol-inserter"
                className="
                  flex items-center gap-1 sm:gap-2 
                  data-[state=active]:bg-white data-[state=active]:text-blue-900
                  min-w-[80px] sm:min-w-0 px-2 sm:px-3 py-2 sm:py-2.5
                  text-xs sm:text-sm whitespace-nowrap
                  touch-manipulation
                "
              >
                <Type className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Symbols</span>
                <span className="sm:hidden">Sym</span>
              </TabsTrigger>
              <TabsTrigger 
                value="formulas-view"
                className="
                  flex items-center gap-1 sm:gap-2 
                  data-[state=active]:bg-white data-[state=active]:text-blue-900
                  min-w-[80px] sm:min-w-0 px-2 sm:px-3 py-2 sm:py-2.5
                  text-xs sm:text-sm whitespace-nowrap
                  touch-manipulation
                "
              >
                <Atom className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Formula View</span>
                <span className="sm:hidden">View</span>
              </TabsTrigger>
              <TabsTrigger 
                value="reference"
                className="
                  flex items-center gap-1 sm:gap-2 
                  data-[state=active]:bg-white data-[state=active]:text-blue-900
                  min-w-[80px] sm:min-w-0 px-2 sm:px-3 py-2 sm:py-2.5
                  text-xs sm:text-sm whitespace-nowrap
                  touch-manipulation
                "
              >
                <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Reference</span>
                <span className="sm:hidden">Ref</span>
              </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="balancer">
              <EquationBalancer />
            </TabsContent>

            <TabsContent value="word-converter">
              <WordEquationConverter />
            </TabsContent>

            <TabsContent value="reactions">
              <ReactionIdentifier />
            </TabsContent>

            <TabsContent value="conjugate">
              <ConjugatePairIdentifier />
            </TabsContent>

            <TabsContent value="ph-determiner">
              <SubstancePHDeterminer />
            </TabsContent>

            <TabsContent value="reactant-gen">
              <ReactantGenerator />
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

            <TabsContent value="periodic-table">
              <PeriodicTableView />
            </TabsContent>

            <TabsContent value="symbol-inserter">
              <ChemicalSymbolInserter onSymbolInsert={(symbol) => {
                // Copy symbol to clipboard for easy use
                navigator.clipboard.writeText(symbol).then(() => {
                  console.log('Symbol copied to clipboard:', symbol);
                }).catch(() => {
                  console.log('Could not copy symbol to clipboard');
                });
              }} />
            </TabsContent>

            <TabsContent value="formulas-view">
              <ChemistryFormulasView />
            </TabsContent>

            <TabsContent value="reference">
              <ChemistryReference />
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 sm:mt-16 text-blue-300 px-4">
          <p className="text-xs sm:text-sm leading-relaxed">
            Built for chemistry students and professionals • Always verify critical calculations • By Mafole Makhetha
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
