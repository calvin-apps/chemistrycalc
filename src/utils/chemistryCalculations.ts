
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

// Normalize chemical formula symbols: convert Unicode subscripts/superscripts, strip charges and states
const normalizeFormulaSymbols = (input: string): string => {
  const subMap: Record<string, string> = { '₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9' };
  const supMap: Record<string, string> = { '⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9' };
  let s = (input || '').toString();
  s = s.replace(/\s+/g, '');
  s = s.replace(/·/g, ''); // remove hydrate dot (treated as concatenation)
  s = s.replace(/\((aq|s|l|g)\)/gi, '');
  // Normalize unicode signs and digits
  s = s.replace(/[₀-₉]/g, (ch) => subMap[ch] || ch);
  s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (ch) => supMap[ch] || '');
  s = s.replace(/−/g, '-').replace(/⁻/g, '-').replace(/⁺/g, '+');
  // Strip trailing charge notations: ^2-, 2-, +, superscripts, etc.
  s = s.replace(/\^?\d*[+\-]$/,'');
  s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]*[⁺⁻]$/,'');
  s = s.replace(/[+\-]$/,'');
  return s;
};

// Parse normalized formula into element counts, handling parentheses
const parseToCounts = (formula: string): Record<string, number> => {
  const f = normalizeFormulaSymbols(formula);
  const stack: Array<Map<string, number>> = [new Map()];
  let i = 0;
  const n = f.length;

  const isDigit = (ch: string) => ch >= '0' && ch <= '9';
  const isLower = (ch: string) => ch >= 'a' && ch <= 'z';
  const isUpper = (ch: string) => ch >= 'A' && ch <= 'Z';

  const parseNumber = (): number => {
    if (i >= n || !isDigit(f[i])) return 1;
    let val = 0;
    while (i < n && isDigit(f[i])) { val = val * 10 + (f.charCodeAt(i) - 48); i++; }
    return val || 1;
  };

  const parseElement = (): string | null => {
    if (i >= n || !isUpper(f[i])) return null;
    let el = f[i++];
    if (i < n && isLower(f[i])) el += f[i++];
    return el;
  };

  const add = (map: Map<string, number>, el: string, cnt: number) => {
    map.set(el, (map.get(el) || 0) + cnt);
  };

  while (i < n) {
    const ch = f[i];
    if (ch === '(') {
      i++; stack.push(new Map());
    } else if (ch === ')') {
      i++; const mult = parseNumber();
      const grp = stack.pop()!;
      const top = stack[stack.length - 1];
      for (const [el, cnt] of grp) add(top, el, cnt * mult);
    } else {
      const el = parseElement();
      if (el) {
        const cnt = parseNumber();
        add(stack[stack.length - 1], el, cnt);
      } else {
        // Skip any non-parsed character gracefully
        i++;
      }
    }
  }

  const out: Record<string, number> = {};
  for (const [el, cnt] of stack[0]) out[el] = cnt;
  return out;
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
  const counts = parseToCounts(formula);
  const breakdown: { [key: string]: { count: number; atomicMass: number } } = {};
  let totalMass = 0;

  for (const [element, count] of Object.entries(counts)) {
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
  try {
    const normalizeFormula = (f: string) => normalizeFormulaSymbols(f);

    const cleanEq = equation.replace(/=/g, '→');
    const arrowParts = cleanEq.split(/→|->/);
    if (arrowParts.length < 2) {
      return { moles: {}, limitingReagent: '', products: {} };
    }

    const parseSide = (side: string) => side
      .split('+')
      .map(s => s.trim())
      .filter(Boolean)
      .map(s => {
        const m = s.match(/^(\d+)\s*(.*)$/);
        const coeff = m ? parseInt(m[1]) : 1;
        const raw = m ? m[2].trim() : s;
        const normalized = normalizeFormula(raw);
        return { raw, normalized, coeff };
      });

    const reactants = parseSide(arrowParts[0]);
    const products = parseSide(arrowParts[1]);

    const molarMassOf = (formula: string) => calculateMolarMass(formula).molarMass;

    // Compute moles of reactants from provided masses
    const moles: { [key: string]: number } = {};
    reactants.forEach(r => {
      const mass = masses[r.raw] ?? masses[r.normalized] ?? 0;
      if (mass > 0) {
        const M = molarMassOf(r.normalized);
        const n = mass / M;
        moles[r.raw] = n;
      } else {
        moles[r.raw] = 0;
      }
    });

    // Determine limiting reagent using extent = n/coeff (only positive extents)
    const extents = reactants
      .map(r => ({ r, extent: (moles[r.raw] || 0) / r.coeff }))
      .filter(x => x.extent > 0);

    if (extents.length === 0) {
      return { moles, limitingReagent: '', products: {} };
    }

    const limiting = extents.reduce((a, b) => (a.extent <= b.extent ? a : b));
    const extent = limiting.extent;
    const limitingReagent = limiting.r.raw;

    // Calculate product masses
    const productsOut: { [key: string]: number } = {};
    products.forEach(p => {
      const M = molarMassOf(p.normalized);
      const nProd = extent * p.coeff;
      productsOut[p.raw] = nProd * M; // grams
    });

    return { moles, limitingReagent, products: productsOut };
  } catch (e) {
    return { moles: {}, limitingReagent: '', products: {} };
  }
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

// Identify conjugate acid-base pairs from a full reaction
export const identifyConjugatePairsInReaction = (equation: string) => {
  const normalize = (f: string) => {
    const subMap: Record<string, string> = { '₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9' };
    let s = f.replace(/\s+/g, '');
    s = s.replace(/[₀-₉]/g, (ch) => subMap[ch] || ch);
    s = s.replace(/\((aq|s|l|g)\)/gi, '');
    s = s.replace(/[⁺⁻]/g, '');
    s = s.replace(/[+-]$/g, '');
    return s;
  };

  const toCounts = (formula: string) => {
    const counts: Record<string, number> = {};
    const re = /([A-Z][a-z]?)(\d*)/g;
    let m: RegExpExecArray | null;
    const f = normalize(formula);
    while ((m = re.exec(f)) !== null) {
      const el = m[1];
      const c = m[2] ? parseInt(m[2]) : 1;
      counts[el] = (counts[el] || 0) + c;
    }
    return counts;
  };

  const sameNonHydrogen = (a: Record<string, number>, b: Record<string, number>) => {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)].filter(k => k !== 'H'));
    for (const k of keys) {
      if ((a[k] || 0) !== (b[k] || 0)) return false;
    }
    return true;
  };

  const cleanEq = equation.replace(/=/g, '→');
  const parts = cleanEq.split(/→|->/);
  if (parts.length < 2) return { pairs: [] };

  const parseSide = (side: string) => side.split('+').map(s => s.trim()).filter(Boolean).map(s => s.replace(/^(\d+)\s*/, ''));

  const left = parseSide(parts[0]);
  const right = parseSide(parts[1]);

  const commonAcids: Record<string, { conjugateBase: string; strength: string }> = {
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
  const commonBases: Record<string, { conjugateAcid: string; strength: string }> = {
    'OH⁻': { conjugateAcid: 'H₂O', strength: 'Strong base' },
    'NH₃': { conjugateAcid: 'NH₄⁺', strength: 'Weak base' },
    'CH₃COO⁻': { conjugateAcid: 'CH₃COOH', strength: 'Weak base' },
    'F⁻': { conjugateAcid: 'HF', strength: 'Weak base' },
    'Cl⁻': { conjugateAcid: 'HCl', strength: 'Very weak base' },
    'H₂O': { conjugateAcid: 'H₃O⁺', strength: 'Very weak base' }
  };

  const pairs: { type: 'acid' | 'base'; reactant: string; conjugate: string; pair: string; strength?: string }[] = [];

  left.forEach(L => {
    const cL = toCounts(L);
    right.forEach(R => {
      const cR = toCounts(R);
      if (!sameNonHydrogen(cL, cR)) return;
      const dH = (cR['H'] || 0) - (cL['H'] || 0);
      if (dH === -1) {
        // L lost H -> acid
        pairs.push({
          type: 'acid',
          reactant: L,
          conjugate: R,
          pair: `${L} / ${R}`,
          strength: commonAcids[L]?.strength
        });
      } else if (dH === 1) {
        // L gained H -> base
        pairs.push({
          type: 'base',
          reactant: L,
          conjugate: R,
          pair: `${R} / ${L}`,
          strength: commonBases[L]?.strength
        });
      }
    });
  });

  // Deduplicate pairs
  const key = (p: any) => `${p.type}-${p.reactant}-${p.conjugate}`;
  const unique = Object.values(pairs.reduce((acc: any, p) => { acc[key(p)] = p; return acc; }, {}));

  return { pairs: unique };
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
