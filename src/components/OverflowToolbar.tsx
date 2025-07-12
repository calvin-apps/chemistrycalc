
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Menu, Atom, Calculator } from 'lucide-react';
import PeriodicTableView from './chemistry/PeriodicTableView';
import ChemistryFormulasView from './chemistry/ChemistryFormulasView';

const OverflowToolbar = () => {
  const [periodicTableOpen, setPeriodicTableOpen] = useState(false);
  const [formulasOpen, setFormulasOpen] = useState(false);

  return (
    <div className="fixed top-4 left-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="icon"
            className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-blue-200 hover:border-blue-300"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="start" 
          className="w-56 bg-white/95 backdrop-blur-sm border-blue-200"
        >
          <Dialog open={periodicTableOpen} onOpenChange={setPeriodicTableOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem 
                className="cursor-pointer hover:bg-blue-50"
                onSelect={(e) => e.preventDefault()}
              >
                <Atom className="mr-2 h-4 w-4 text-blue-600" />
                <span>Periodic Table</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="max-w-7xl w-[95vw] h-[90vh] p-0">
              <PeriodicTableView />
            </DialogContent>
          </Dialog>

          <Dialog open={formulasOpen} onOpenChange={setFormulasOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem 
                className="cursor-pointer hover:bg-blue-50"
                onSelect={(e) => e.preventDefault()}
              >
                <Calculator className="mr-2 h-4 w-4 text-green-600" />
                <span>Chemistry Formulas</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="max-w-7xl w-[95vw] h-[90vh] p-0">
              <ChemistryFormulasView />
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default OverflowToolbar;
