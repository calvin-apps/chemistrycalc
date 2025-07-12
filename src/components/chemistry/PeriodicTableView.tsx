
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Element {
  symbol: string;
  name: string;
  atomicNumber: number;
  atomicMass: number;
  electronegativity: number | null;
  group: number;
  period: number;
}

const elements: Element[] = [
  { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, atomicMass: 1.008, electronegativity: 2.20, group: 1, period: 1 },
  { symbol: 'He', name: 'Helium', atomicNumber: 2, atomicMass: 4.003, electronegativity: null, group: 18, period: 1 },
  { symbol: 'Li', name: 'Lithium', atomicNumber: 3, atomicMass: 6.94, electronegativity: 0.98, group: 1, period: 2 },
  { symbol: 'Be', name: 'Beryllium', atomicNumber: 4, atomicMass: 9.012, electronegativity: 1.57, group: 2, period: 2 },
  { symbol: 'B', name: 'Boron', atomicNumber: 5, atomicMass: 10.81, electronegativity: 2.04, group: 13, period: 2 },
  { symbol: 'C', name: 'Carbon', atomicNumber: 6, atomicMass: 12.011, electronegativity: 2.55, group: 14, period: 2 },
  { symbol: 'N', name: 'Nitrogen', atomicNumber: 7, atomicMass: 14.007, electronegativity: 3.04, group: 15, period: 2 },
  { symbol: 'O', name: 'Oxygen', atomicNumber: 8, atomicMass: 15.999, electronegativity: 3.44, group: 16, period: 2 },
  { symbol: 'F', name: 'Fluorine', atomicNumber: 9, atomicMass: 18.998, electronegativity: 3.98, group: 17, period: 2 },
  { symbol: 'Ne', name: 'Neon', atomicNumber: 10, atomicMass: 20.180, electronegativity: null, group: 18, period: 2 },
  { symbol: 'Na', name: 'Sodium', atomicNumber: 11, atomicMass: 22.990, electronegativity: 0.93, group: 1, period: 3 },
  { symbol: 'Mg', name: 'Magnesium', atomicNumber: 12, atomicMass: 24.305, electronegativity: 1.31, group: 2, period: 3 },
  { symbol: 'Al', name: 'Aluminum', atomicNumber: 13, atomicMass: 26.982, electronegativity: 1.61, group: 13, period: 3 },
  { symbol: 'Si', name: 'Silicon', atomicNumber: 14, atomicMass: 28.085, electronegativity: 1.90, group: 14, period: 3 },
  { symbol: 'P', name: 'Phosphorus', atomicNumber: 15, atomicMass: 30.974, electronegativity: 2.19, group: 15, period: 3 },
  { symbol: 'S', name: 'Sulfur', atomicNumber: 16, atomicMass: 32.06, electronegativity: 2.58, group: 16, period: 3 },
  { symbol: 'Cl', name: 'Chlorine', atomicNumber: 17, atomicMass: 35.45, electronegativity: 3.16, group: 17, period: 3 },
  { symbol: 'Ar', name: 'Argon', atomicNumber: 18, atomicMass: 39.948, electronegativity: null, group: 18, period: 3 },
  { symbol: 'K', name: 'Potassium', atomicNumber: 19, atomicMass: 39.098, electronegativity: 0.82, group: 1, period: 4 },
  { symbol: 'Ca', name: 'Calcium', atomicNumber: 20, atomicMass: 40.078, electronegativity: 1.00, group: 2, period: 4 },
  { symbol: 'Sc', name: 'Scandium', atomicNumber: 21, atomicMass: 44.956, electronegativity: 1.36, group: 3, period: 4 },
  { symbol: 'Ti', name: 'Titanium', atomicNumber: 22, atomicMass: 47.867, electronegativity: 1.54, group: 4, period: 4 },
  { symbol: 'V', name: 'Vanadium', atomicNumber: 23, atomicMass: 50.942, electronegativity: 1.63, group: 5, period: 4 },
  { symbol: 'Cr', name: 'Chromium', atomicNumber: 24, atomicMass: 51.996, electronegativity: 1.66, group: 6, period: 4 },
  { symbol: 'Mn', name: 'Manganese', atomicNumber: 25, atomicMass: 54.938, electronegativity: 1.55, group: 7, period: 4 },
  { symbol: 'Fe', name: 'Iron', atomicNumber: 26, atomicMass: 55.845, electronegativity: 1.83, group: 8, period: 4 },
  { symbol: 'Co', name: 'Cobalt', atomicNumber: 27, atomicMass: 58.933, electronegativity: 1.88, group: 9, period: 4 },
  { symbol: 'Ni', name: 'Nickel', atomicNumber: 28, atomicMass: 58.693, electronegativity: 1.91, group: 10, period: 4 },
  { symbol: 'Cu', name: 'Copper', atomicNumber: 29, atomicMass: 63.546, electronegativity: 1.90, group: 11, period: 4 },
  { symbol: 'Zn', name: 'Zinc', atomicNumber: 30, atomicMass: 65.38, electronegativity: 1.65, group: 12, period: 4 },
  // Adding more essential elements for a comprehensive table
  { symbol: 'Ga', name: 'Gallium', atomicNumber: 31, atomicMass: 69.723, electronegativity: 1.81, group: 13, period: 4 },
  { symbol: 'Ge', name: 'Germanium', atomicNumber: 32, atomicMass: 72.630, electronegativity: 2.01, group: 14, period: 4 },
  { symbol: 'As', name: 'Arsenic', atomicNumber: 33, atomicMass: 74.922, electronegativity: 2.18, group: 15, period: 4 },
  { symbol: 'Se', name: 'Selenium', atomicNumber: 34, atomicMass: 78.971, electronegativity: 2.55, group: 16, period: 4 },
  { symbol: 'Br', name: 'Bromine', atomicNumber: 35, atomicMass: 79.904, electronegativity: 2.96, group: 17, period: 4 },
  { symbol: 'Kr', name: 'Krypton', atomicNumber: 36, atomicMass: 83.798, electronegativity: 3.00, group: 18, period: 4 },
  { symbol: 'Rb', name: 'Rubidium', atomicNumber: 37, atomicMass: 85.468, electronegativity: 0.82, group: 1, period: 5 },
  { symbol: 'Sr', name: 'Strontium', atomicNumber: 38, atomicMass: 87.62, electronegativity: 0.95, group: 2, period: 5 },
  { symbol: 'I', name: 'Iodine', atomicNumber: 53, atomicMass: 126.904, electronegativity: 2.66, group: 17, period: 5 },
  { symbol: 'Xe', name: 'Xenon', atomicNumber: 54, atomicMass: 131.29, electronegativity: 2.60, group: 18, period: 5 },
  { symbol: 'Cs', name: 'Cesium', atomicNumber: 55, atomicMass: 132.905, electronegativity: 0.79, group: 1, period: 6 },
  { symbol: 'Ba', name: 'Barium', atomicNumber: 56, atomicMass: 137.327, electronegativity: 0.89, group: 2, period: 6 },
  { symbol: 'Au', name: 'Gold', atomicNumber: 79, atomicMass: 196.967, electronegativity: 2.54, group: 11, period: 6 },
  { symbol: 'Hg', name: 'Mercury', atomicNumber: 80, atomicMass: 200.592, electronegativity: 2.00, group: 12, period: 6 },
  { symbol: 'Pb', name: 'Lead', atomicNumber: 82, atomicMass: 207.2, electronegativity: 2.33, group: 14, period: 6 },
  { symbol: 'Ra', name: 'Radium', atomicNumber: 88, atomicMass: 226, electronegativity: 0.9, group: 2, period: 7 },
  { symbol: 'U', name: 'Uranium', atomicNumber: 92, atomicMass: 238.029, electronegativity: 1.38, group: 3, period: 7 }
];

const PeriodicTableView = () => {
  return (
    <div className="w-full h-full p-6">
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <span className="text-blue-600">⚛️</span>
            Periodic Table of Elements
          </CardTitle>
          <CardDescription>
            Complete reference with atomic properties and electronegativity values
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {elements.map((element) => (
                <Card key={element.symbol} className="p-4 hover:shadow-lg transition-shadow border-2 hover:border-blue-300">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {element.symbol}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {element.atomicNumber}
                    </div>
                    <div className="font-semibold text-lg mb-3">
                      {element.name}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Atomic Mass:</span>
                        <span className="font-medium">{element.atomicMass}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Electronegativity:</span>
                        <span className="font-medium">
                          {element.electronegativity ? element.electronegativity : 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Group:</span>
                        <span className="font-medium">{element.group}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Period:</span>
                        <span className="font-medium">{element.period}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default PeriodicTableView;
