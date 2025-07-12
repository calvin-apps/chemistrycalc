
import React from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Plus } from 'lucide-react';

interface ChemicalSymbolInserterProps {
  onSymbolInsert: (symbol: string) => void;
}

const ChemicalSymbolInserter: React.FC<ChemicalSymbolInserterProps> = ({ onSymbolInsert }) => {
  const symbols = {
    'Arrows': [
      { symbol: '→', name: 'Forward Arrow', description: 'Reaction proceeds forward' },
      { symbol: '⇌', name: 'Equilibrium Arrow', description: 'Reversible reaction' },
      { symbol: '⇆', name: 'Reversible Arrow', description: 'Alternative reversible' },
      { symbol: '↑', name: 'Gas Evolution', description: 'Gas product' },
      { symbol: '↓', name: 'Precipitate', description: 'Solid precipitate forms' }
    ],
    'States & Conditions': [
      { symbol: '∆', name: 'Heat', description: 'Heat required' },
      { symbol: '(s)', name: 'Solid State', description: 'Solid phase' },
      { symbol: '(l)', name: 'Liquid State', description: 'Liquid phase' },
      { symbol: '(g)', name: 'Gas State', description: 'Gas phase' },
      { symbol: '(aq)', name: 'Aqueous', description: 'Dissolved in water' }
    ],
    'Charges & Ions': [
      { symbol: '⊕', name: 'Positive Ion', description: 'Positively charged' },
      { symbol: '⊖', name: 'Negative Ion', description: 'Negatively charged' },
      { symbol: '⁺', name: 'Plus Charge', description: 'Positive charge superscript' },
      { symbol: '⁻', name: 'Minus Charge', description: 'Negative charge superscript' },
      { symbol: '²⁺', name: '2+ Charge', description: 'Double positive charge' },
      { symbol: '²⁻', name: '2- Charge', description: 'Double negative charge' }
    ],
    'Subscripts': [
      { symbol: '₀', name: 'Subscript 0', description: 'Subscript zero' },
      { symbol: '₁', name: 'Subscript 1', description: 'Subscript one' },
      { symbol: '₂', name: 'Subscript 2', description: 'Subscript two' },
      { symbol: '₃', name: 'Subscript 3', description: 'Subscript three' },
      { symbol: '₄', name: 'Subscript 4', description: 'Subscript four' },
      { symbol: '₅', name: 'Subscript 5', description: 'Subscript five' }
    ],
    'Superscripts': [
      { symbol: '⁰', name: 'Superscript 0', description: 'Superscript zero' },
      { symbol: '¹', name: 'Superscript 1', description: 'Superscript one' },
      { symbol: '²', name: 'Superscript 2', description: 'Superscript two' },
      { symbol: '³', name: 'Superscript 3', description: 'Superscript three' },
      { symbol: '⁴', name: 'Superscript 4', description: 'Superscript four' },
      { symbol: '⁵', name: 'Superscript 5', description: 'Superscript five' }
    ],
    'Common Formulas': [
      { symbol: 'H₂O', name: 'Water', description: 'Water molecule' },
      { symbol: 'CO₂', name: 'Carbon Dioxide', description: 'Carbon dioxide' },
      { symbol: 'NaCl', name: 'Sodium Chloride', description: 'Table salt' },
      { symbol: 'H₂SO₄', name: 'Sulfuric Acid', description: 'Sulfuric acid' },
      { symbol: 'CaCO₃', name: 'Calcium Carbonate', description: 'Limestone' },
      { symbol: 'NH₃', name: 'Ammonia', description: 'Ammonia gas' }
    ]
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-700 hover:from-blue-100 hover:to-indigo-100 hover:border-blue-300 shadow-sm transition-all duration-200 font-medium min-w-fit whitespace-nowrap"
        >
          <Plus className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="hidden sm:inline">Insert Symbols</span>
          <span className="sm:hidden">Symbols</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 sm:w-96 max-h-96 overflow-y-auto bg-white border border-gray-200 shadow-lg z-50" 
        align="start"
        side="bottom"
        sideOffset={8}
      >
        <div className="space-y-4">
          <div className="sticky top-0 bg-white pb-2 border-b border-gray-100">
            <h3 className="font-semibold text-blue-900 text-sm sm:text-base">Chemical Symbols & Formulas</h3>
          </div>
          
          {Object.entries(symbols).map(([category, symbolList]) => (
            <div key={category} className="space-y-2">
              <h4 className="text-xs sm:text-sm font-medium text-blue-800 bg-blue-50 px-2 py-1 rounded-md">{category}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                {symbolList.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => onSymbolInsert(item.symbol)}
                    className="flex flex-col items-start p-2 text-left bg-gray-50 hover:bg-blue-50 rounded border transition-colors duration-150 group min-h-[60px] sm:min-h-[65px]"
                    title={item.description}
                  >
                    <div className="flex items-center gap-2 w-full mb-1">
                      <Badge variant="outline" className="font-mono text-sm sm:text-base px-2 py-1 bg-white group-hover:bg-blue-100 transition-colors">
                        {item.symbol}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 leading-tight">{item.name}</p>
                  </button>
                ))}
              </div>
            </div>
          ))}
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-xs text-blue-700 leading-relaxed">
              <strong>Tip:</strong> Click any symbol to insert it at your cursor position in the equation input field.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ChemicalSymbolInserter;
