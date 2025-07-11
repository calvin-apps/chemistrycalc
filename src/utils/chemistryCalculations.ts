
// Periodic table data for molar mass calculations
const ATOMIC_MASSES: { [key: string]: number } = {
  H: 1.008, He: 4.003, Li: 6.941, Be: 9.012, B: 10.811, C: 12.011, N: 14.007, O: 15.999,
  F: 18.998, Ne: 20.180, Na: 22.990, Mg: 24.305, Al: 26.982, Si: 28.086, P: 30.974, S: 32.065,
  Cl: 35.453, Ar: 39.948, K: 39.098, Ca: 40.078, Sc: 44.956, Ti: 47.867, V: 50.942, Cr: 51.996,
  Mn: 54.938, Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546, Zn: 65.38, Ga: 69.723, Ge: 72.64,
  As: 74.922, Se: 78.96, Br: 79.904, Kr: 83.798, Rb: 85.468, Sr: 87.62, Y: 88.906, Zr: 91.224,
  Nb: 92.906, Mo: 95.96, Tc: 98, Ru: 101.07, Rh: 102.906, Pd: 106.42, Ag: 107.868, Cd: 112.411,
  In: 114.818, Sn: 118.71, Sb: 121.76, Te: 127.6, I: 126.904, Xe: 131.293, Cs: 132.905, Ba: 137.327
};

export const balanceEquation = (equation: string) => {
  // Simplified equation balancing - in a real app, this would use a matrix algebra approach
  const cleanEquation = equation.replace(/\s/g, '').replace(/=/g, '→');
  
  // Simple cases for demonstration
  const balancedEquations: { [key: string]: { balanced: string; coefficients: number[] } } = {
    'H2+O2→H2O': { balanced: '2H₂ + O₂ → 2H₂O', coefficients: [2, 1, 2] },
    '2H2+O2→2H2O': { balanced: '2H₂ + O₂ → 2H₂O', coefficients: [2, 1, 2] },
    'CH4+O2→CO2+H2O': { balanced: 'CH₄ + 2O₂ → CO₂ + 2H₂O', coefficients: [1, 2, 1, 2] },
    'Fe+O2→Fe2O3': { balanced: '4Fe + 3O₂ → 2Fe₂O₃', coefficients: [4, 3, 2] },
    'C2H6+O2→CO2+H2O': { balanced: '2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O', coefficients: [2, 7, 4, 6] }
  };

  const result = balancedEquations[cleanEquation];
  if (result) {
    return result;
  }

  // If not in our simple database, return a generic response
  return {
    balanced: equation + ' (Please verify - complex balancing needed)',
    coefficients: [1, 1, 1]
  };
};

export const identifyReactionType = (equation: string) => {
  const cleanEquation = equation.toLowerCase().replace(/\s/g, '');
  
  // Simple pattern matching for reaction types
  if (cleanEquation.includes('o2') && (cleanEquation.includes('co2') || cleanEquation.includes('h2o'))) {
    return {
      type: 'Combustion',
      description: 'A substance reacts with oxygen to produce carbon dioxide and water.'
    };
  }
  
  if (cleanEquation.includes('+') && cleanEquation.split('→')[0].split('+').length === 2 && 
      cleanEquation.split('→')[1].split('+').length === 1) {
    return {
      type: 'Synthesis',
      description: 'Two or more reactants combine to form a single product.'
    };
  }
  
  if (cleanEquation.split('→')[0].split('+').length === 1 && 
      cleanEquation.split('→')[1].split('+').length >= 2) {
    return {
      type: 'Decomposition',
      description: 'A single reactant breaks down into multiple products.'
    };
  }
  
  if (cleanEquation.split('→')[0].split('+').length === 2 && 
      cleanEquation.split('→')[1].split('+').length === 2) {
    return {
      type: 'Double Displacement',
      description: 'Two compounds exchange ions to form two new compounds.'
    };
  }

  return {
    type: 'Unknown',
    description: 'Unable to determine reaction type from the given equation.'
  };
};

export const calculateMolarMass = (formula: string) => {
  const elementRegex = /([A-Z][a-z]?)(\d*)/g;
  let match;
  const breakdown: { [key: string]: { count: number; atomicMass: number } } = {};
  let totalMass = 0;

  while ((match = elementRegex.exec(formula)) !== null) {
    const element = match[1];
    const count = parseInt(match[2]) || 1;
    const atomicMass = ATOMIC_MASSES[element];
    
    if (!atomicMass) {
      throw new Error(`Unknown element: ${element}`);
    }
    
    breakdown[element] = { count, atomicMass };
    totalMass += atomicMass * count;
  }

  return {
    formula,
    molarMass: totalMass,
    breakdown
  };
};

export const calculateStoichiometry = (equation: string, masses: { [key: string]: number }) => {
  // Simplified stoichiometry calculation
  const moles: { [key: string]: number } = {};
  
  // Calculate moles from masses (assuming we know molar masses)
  const molarMasses = { H2: 2.016, O2: 31.998, H2O: 18.015 }; // simplified
  
  Object.entries(masses).forEach(([compound, mass]) => {
    if (molarMasses[compound as keyof typeof molarMasses]) {
      moles[compound] = mass / molarMasses[compound as keyof typeof molarMasses];
    }
  });
  
  // Find limiting reagent (simplified)
  let limitingReagent = '';
  let minMoles = Infinity;
  
  Object.entries(moles).forEach(([compound, molAmount]) => {
    if (molAmount < minMoles) {
      minMoles = molAmount;
      limitingReagent = compound;
    }
  });
  
  // Calculate products (simplified for H2 + O2 → H2O)
  const products: { [key: string]: number } = {};
  if (limitingReagent === 'H2') {
    products['H2O'] = minMoles * 18.015; // mass of water produced
  } else if (limitingReagent === 'O2') {
    products['H2O'] = minMoles * 2 * 18.015; // 1 O2 produces 2 H2O
  }

  return {
    moles,
    limitingReagent,
    products
  };
};

export const convertUnits = (value: number, fromUnit: string, toUnit: string, molarMass?: number) => {
  const AVOGADRO = 6.022e23;
  const STP_VOLUME = 22.4; // L/mol at STP
  
  // Conversion factors
  const conversions: { [key: string]: { [key: string]: (val: number, M?: number) => number } } = {
    grams: {
      moles: (val, M) => M ? val / M : val,
      kilograms: (val) => val / 1000,
      atoms: (val, M) => M ? (val / M) * AVOGADRO : val
    },
    moles: {
      grams: (val, M) => M ? val * M : val,
      liters: (val) => val * STP_VOLUME,
      atoms: (val) => val * AVOGADRO
    },
    kilograms: {
      grams: (val) => val * 1000,
      moles: (val, M) => M ? (val * 1000) / M : val
    },
    liters: {
      milliliters: (val) => val * 1000,
      moles: (val) => val / STP_VOLUME
    },
    milliliters: {
      liters: (val) => val / 1000
    },
    atoms: {
      moles: (val) => val / AVOGADRO,
      grams: (val, M) => M ? (val / AVOGADRO) * M : val
    }
  };

  if (conversions[fromUnit] && conversions[fromUnit][toUnit]) {
    return conversions[fromUnit][toUnit](value, molarMass);
  }

  return value; // No conversion available
};
