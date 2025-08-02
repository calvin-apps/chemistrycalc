
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

// Word equation to chemical equation converter
export const convertWordEquation = (wordEquation: string) => {
  const wordToFormula: { [key: string]: string } = {
    // Common compounds
    'water': 'H₂O',
    'hydrogen': 'H₂',
    'oxygen': 'O₂',
    'carbon dioxide': 'CO₂',
    'methane': 'CH₄',
    'ammonia': 'NH₃',
    'hydrogen chloride': 'HCl',
    'sodium chloride': 'NaCl',
    'calcium carbonate': 'CaCO₃',
    'sulfuric acid': 'H₂SO₄',
    'nitric acid': 'HNO₃',
    'iron': 'Fe',
    'iron oxide': 'Fe₂O₃',
    'sodium': 'Na',
    'chlorine': 'Cl₂',
    'nitrogen': 'N₂',
    'calcium oxide': 'CaO',
    'carbon monoxide': 'CO',
    'ethane': 'C₂H₆',
    'propane': 'C₃H₈',
    'butane': 'C₄H₁₀'
  };

  const cleanEquation = wordEquation.toLowerCase().trim();
  let chemicalEquation = cleanEquation;

  // Replace word compounds with chemical formulas
  Object.entries(wordToFormula).forEach(([word, formula]) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    chemicalEquation = chemicalEquation.replace(regex, formula);
  });

  // Replace common words
  chemicalEquation = chemicalEquation.replace(/\bplus\b/g, '+');
  chemicalEquation = chemicalEquation.replace(/\band\b/g, '+');
  chemicalEquation = chemicalEquation.replace(/\byields\b/g, '→');
  chemicalEquation = chemicalEquation.replace(/\bproduces\b/g, '→');
  chemicalEquation = chemicalEquation.replace(/\bforms\b/g, '→');
  chemicalEquation = chemicalEquation.replace(/\breacts with\b/g, '+');

  return {
    wordEquation,
    chemicalEquation: chemicalEquation.trim(),
    balanced: balanceEquation(chemicalEquation.trim()).balanced
  };
};

// Conjugate acid-base pair identification
export const identifyConjugatePairs = (compound: string) => {
  const commonAcids: { [key: string]: { conjugateBase: string; strength: string } } = {
    'HCl': { conjugateBase: 'Cl⁻', strength: 'Strong acid' },
    'HBr': { conjugateBase: 'Br⁻', strength: 'Strong acid' },
    'HI': { conjugateBase: 'I⁻', strength: 'Strong acid' },
    'HNO₃': { conjugateBase: 'NO₃⁻', strength: 'Strong acid' },
    'H₂SO₄': { conjugateBase: 'HSO₄⁻', strength: 'Strong acid' },
    'HClO₄': { conjugateBase: 'ClO₄⁻', strength: 'Strong acid' },
    'CH₃COOH': { conjugateBase: 'CH₃COO⁻', strength: 'Weak acid' },
    'HF': { conjugateBase: 'F⁻', strength: 'Weak acid' },
    'NH₄⁺': { conjugateBase: 'NH₃', strength: 'Weak acid' },
    'H₃O⁺': { conjugateBase: 'H₂O', strength: 'Strong acid' }
  };

  const commonBases: { [key: string]: { conjugateAcid: string; strength: string } } = {
    'OH⁻': { conjugateAcid: 'H₂O', strength: 'Strong base' },
    'NH₃': { conjugateAcid: 'NH₄⁺', strength: 'Weak base' },
    'CH₃COO⁻': { conjugateAcid: 'CH₃COOH', strength: 'Weak base' },
    'F⁻': { conjugateAcid: 'HF', strength: 'Weak base' },
    'Cl⁻': { conjugateAcid: 'HCl', strength: 'Very weak base' },
    'H₂O': { conjugateAcid: 'H₃O⁺', strength: 'Very weak base' }
  };

  if (commonAcids[compound]) {
    return {
      type: 'acid',
      compound,
      conjugate: commonAcids[compound].conjugateBase,
      strength: commonAcids[compound].strength,
      pair: `${compound} / ${commonAcids[compound].conjugateBase}`
    };
  }

  if (commonBases[compound]) {
    return {
      type: 'base',
      compound,
      conjugate: commonBases[compound].conjugateAcid,
      strength: commonBases[compound].strength,
      pair: `${commonBases[compound].conjugateAcid} / ${compound}`
    };
  }

  return {
    type: 'unknown',
    compound,
    conjugate: 'Not found',
    strength: 'Unknown',
    pair: 'Not identified'
  };
};

// Enhanced pH determination
export const determineSubstancePH = (substance: string) => {
  const substancePH: { [key: string]: { ph: number; type: string; description: string } } = {
    'HCl': { ph: 0.5, type: 'Strong Acid', description: 'Hydrochloric acid - very corrosive' },
    'H₂SO₄': { ph: 0.3, type: 'Strong Acid', description: 'Sulfuric acid - very dangerous' },
    'HNO₃': { ph: 0.4, type: 'Strong Acid', description: 'Nitric acid - oxidizing agent' },
    'lemon juice': { ph: 2.0, type: 'Acidic', description: 'Citric acid content' },
    'vinegar': { ph: 2.4, type: 'Acidic', description: 'Acetic acid solution' },
    'coffee': { ph: 5.0, type: 'Acidic', description: 'Caffeic and chlorogenic acids' },
    'milk': { ph: 6.6, type: 'Slightly Acidic', description: 'Lactic acid present' },
    'pure water': { ph: 7.0, type: 'Neutral', description: 'Perfect neutral pH' },
    'H₂O': { ph: 7.0, type: 'Neutral', description: 'Pure water' },
    'baking soda': { ph: 9.0, type: 'Basic', description: 'Sodium bicarbonate solution' },
    'NaHCO₃': { ph: 9.0, type: 'Basic', description: 'Sodium bicarbonate' },
    'ammonia': { ph: 11.0, type: 'Strong Base', description: 'Ammonia solution' },
    'NH₃': { ph: 11.0, type: 'Strong Base', description: 'Ammonia gas in water' },
    'NaOH': { ph: 13.0, type: 'Strong Base', description: 'Sodium hydroxide - caustic' },
    'KOH': { ph: 13.0, type: 'Strong Base', description: 'Potassium hydroxide' }
  };

  const normalizedSubstance = substance.toLowerCase().trim();
  
  for (const [key, value] of Object.entries(substancePH)) {
    if (key.toLowerCase() === normalizedSubstance || key === substance) {
      return {
        substance,
        ph: value.ph,
        type: value.type,
        description: value.description,
        classification: value.ph < 7 ? 'Acidic' : value.ph > 7 ? 'Basic' : 'Neutral'
      };
    }
  }

  return {
    substance,
    ph: null,
    type: 'Unknown',
    description: 'pH data not available for this substance',
    classification: 'Unknown'
  };
};

// Reactant generator from products
export const generateReactants = (product: string) => {
  const productToReactants: { [key: string]: { reactants: string[]; reactionType: string; equation: string }[] } = {
    'H₂O': [
      { reactants: ['H₂', 'O₂'], reactionType: 'Synthesis', equation: '2H₂ + O₂ → 2H₂O' },
      { reactants: ['HCl', 'NaOH'], reactionType: 'Neutralization', equation: 'HCl + NaOH → NaCl + H₂O' },
      { reactants: ['CH₄', 'O₂'], reactionType: 'Combustion', equation: 'CH₄ + 2O₂ → CO₂ + 2H₂O' }
    ],
    'CO₂': [
      { reactants: ['C', 'O₂'], reactionType: 'Synthesis', equation: 'C + O₂ → CO₂' },
      { reactants: ['CH₄', 'O₂'], reactionType: 'Combustion', equation: 'CH₄ + 2O₂ → CO₂ + 2H₂O' },
      { reactants: ['CaCO₃'], reactionType: 'Decomposition', equation: 'CaCO₃ → CaO + CO₂' }
    ],
    'NaCl': [
      { reactants: ['Na', 'Cl₂'], reactionType: 'Synthesis', equation: '2Na + Cl₂ → 2NaCl' },
      { reactants: ['HCl', 'NaOH'], reactionType: 'Neutralization', equation: 'HCl + NaOH → NaCl + H₂O' }
    ],
    'Fe₂O₃': [
      { reactants: ['Fe', 'O₂'], reactionType: 'Synthesis', equation: '4Fe + 3O₂ → 2Fe₂O₃' }
    ],
    'NH₃': [
      { reactants: ['N₂', 'H₂'], reactionType: 'Synthesis (Haber Process)', equation: 'N₂ + 3H₂ → 2NH₃' }
    ]
  };

  const normalizedProduct = product.trim();
  
  if (productToReactants[normalizedProduct]) {
    return {
      product: normalizedProduct,
      possibleReactions: productToReactants[normalizedProduct]
    };
  }

  return {
    product: normalizedProduct,
    possibleReactions: []
  };
};
