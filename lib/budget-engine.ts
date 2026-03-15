// ============================================================
// beMore Budget Estimator™ — Core Logic Engine
// Based on 2026 Indian Market Benchmarks
// ============================================================

export type MaterialTier = 'essential' | 'premium' | 'luxury';
export type PropertyType = '1bhk' | '2bhk' | '3bhk' | '4bhk' | 'villa';

export interface BOQItem {
  id: string;
  category: 'Woodwork' | 'Kitchen' | 'Ceiling' | 'Walls' | 'Electrical' | 'Civil' | 'Other';
  name: string;
  unit: 'sq ft' | 'running ft' | 'per pt' | 'unit' | 'total';
  quantity: number;
  rates: {
    essential: number;
    premium: number;
    luxury: number;
  };
  description?: string;
}

export interface EstimatorInputs {
  propertyType: PropertyType;
  city: 'Bangalore' | 'Mumbai' | 'Jaipur' | 'Delhi' | 'Pune';
  tier: MaterialTier;
  carpetArea: number; // in sq ft
  items: BOQItem[];
  includeCivil: boolean;
  designerFeePercent: number;
}

export interface EstimatorResult {
  baseTotal: number;
  categoryTotals: Record<string, number>;
  designerFee: number;
  gst: number;
  grandTotal: number;
  tierAesthetic: {
    accentColor: string;
    label: string;
  };
  cityMultiplier: number;
}

// --- Benchmarks & Multipliers ---

export const CITY_MULTIPLIERS: Record<string, number> = {
  Bangalore: 1.0,
  Mumbai: 1.2,
  Jaipur: 0.85,
  Delhi: 1.1,
  Pune: 0.95,
};

export const WASTE_MARGIN = 0.05; // 5% standard waste

const TIER_AESTHETICS: Record<MaterialTier, { accentColor: string; label: string }> = {
  essential: { accentColor: '#2C7A7B', label: 'Efficient & Functional' },
  premium: { accentColor: '#C4922A', label: 'Superior Craftsmanship' },
  luxury: { accentColor: '#1A1712', label: 'Elite Bespoke Statement' },
};

// --- Default BOQ Items Template ---

export const DEFAULT_ITEMS: BOQItem[] = [
  {
    id: 'wardrobe',
    category: 'Woodwork',
    name: 'Wardrobe (Full Height)',
    unit: 'sq ft',
    quantity: 100, // Default for 3BHK
    rates: { essential: 1200, premium: 1800, luxury: 3500 },
    description: 'BWR/BWP Ply with choice of Laminate, Acrylic or Veneer finishes.'
  },
  {
    id: 'kitchen',
    category: 'Kitchen',
    name: 'Modular Kitchen Cabinets',
    unit: 'running ft',
    quantity: 15,
    rates: { essential: 1500, premium: 2500, luxury: 4500 },
    description: 'Marine ply cabinets with soft-close hardware and tailored organizers.'
  },
  {
    id: 'ceiling',
    category: 'Ceiling',
    name: 'False Ceiling (Designer)',
    unit: 'sq ft',
    quantity: 1200,
    rates: { essential: 90, premium: 160, luxury: 350 },
    description: 'Saint-Gobain Gypsum with strategic LED cove lighting.'
  },
  {
    id: 'walls',
    category: 'Walls',
    name: 'Premium Wall Finishes',
    unit: 'sq ft',
    quantity: 3500,
    rates: { essential: 25, premium: 55, luxury: 120 },
    description: 'Multi-coat Emulsion, Royal or Venetian Luster finishes.'
  },
  {
    id: 'electrical',
    category: 'Electrical',
    name: 'Electrical Refitting',
    unit: 'per pt',
    quantity: 40,
    rates: { essential: 600, premium: 1200, luxury: 2500 },
    description: 'Modular switch plates and customized circuit mapping.'
  },
  {
    id: 'flooring',
    category: 'Civil',
    name: 'Tiling / Flooring Refresh',
    unit: 'sq ft',
    quantity: 1200,
    rates: { essential: 45, premium: 85, luxury: 180 },
    description: 'Italian marble or large-format vitrified tiling labor and materials.'
  }
];

// --- Auto-populate Quantities based on BHK ---

export function getAdjustedItems(bhk: PropertyType, carpetArea: number): BOQItem[] {
  const multiplier = {
    '1bhk': 0.4,
    '2bhk': 0.7,
    '3bhk': 1.0,
    '4bhk': 1.4,
    'villa': 2.2,
  }[bhk] || 1.0;

  return DEFAULT_ITEMS.map(item => {
    let q = item.quantity * multiplier;
    if (item.id === 'ceiling' || item.id === 'flooring') q = carpetArea;
    if (item.id === 'walls') q = carpetArea * 3.5; // Rough estimate for wall area
    return { ...item, quantity: Math.round(q) };
  });
}

// --- Main Calculation Engine ---

export function calculateBudget(inputs: EstimatorInputs): EstimatorResult {
  const { city, tier, items, includeCivil, designerFeePercent } = inputs;
  const cityMultiplier = CITY_MULTIPLIERS[city] || 1.0;

  let baseTotal = 0;
  const categoryTotals: Record<string, number> = {};

  items.forEach(item => {
    // Skip civil if toggled off
    if (item.category === 'Civil' && !includeCivil) return;

    const baseRate = item.rates[tier];
    const cost = (baseRate * cityMultiplier * item.quantity) * (1 + WASTE_MARGIN);
    
    baseTotal += cost;
    categoryTotals[item.category] = (categoryTotals[item.category] || 0) + cost;
  });

  const designerFee = baseTotal * (designerFeePercent / 100);
  const gst = (baseTotal + designerFee) * 0.18;
  const grandTotal = baseTotal + designerFee + gst;

  return {
    baseTotal,
    categoryTotals,
    designerFee,
    gst,
    grandTotal,
    tierAesthetic: TIER_AESTHETICS[tier],
    cityMultiplier,
  };
}

// --- Helper: Format for Display ---

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
