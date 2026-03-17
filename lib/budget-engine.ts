// ============================================================
// beMore Budget Estimator™ — Core Logic Engine
// Based on 2026 Indian Market Benchmarks
// ============================================================

export type MaterialTier = 'essential' | 'premium' | 'luxury';
export type PropertyType = '1bhk' | '2bhk' | '3bhk' | '4bhk' | '5bhk' | 'villa' | 'independent-home' | 'apartment' | 'commercial' | 'hospitality';
export type ProjectScope = 'full' | 'kitchen' | 'bathroom';
export type KitchenLayout = 'straight' | 'l-shape' | 'u-shape' | 'parallel' | 'island';

export interface BOQItem {
  id: string;
  category: 'Woodwork' | 'Kitchen' | 'Ceiling' | 'Walls' | 'Electrical' | 'Civil' | 'Other';
  room: 'Living' | 'Kitchen' | 'Bedroom 1' | 'Bedroom 2' | 'Bedroom 3' | 'Toilets' | 'Dining' | 'Balcony';
  name: string;
  unit: 'sq ft' | 'running ft' | 'per pt' | 'unit' | 'total';
  quantity: number;
  rates: {
    essential: number;
    premium: number;
    luxury: number;
  };
  specs: {
    essential: string;
    premium: string;
    luxury: string;
  };
  description?: string;
}

export interface EstimatorInputs {
  scope: ProjectScope;
  projectType: 'independent-home' | 'apartment' | 'commercial' | 'hospitality';
  propertyType: PropertyType;
  floorPlan?: File | string | null;
  city: 'Bangalore' | 'Mumbai' | 'Jaipur' | 'Delhi' | 'Pune';
  locality?: string;
  tier: MaterialTier;
  purpose: 'move-in' | 'rent-out' | 'renovate';
  carpetArea: number; // in sq ft
  items: BOQItem[];
  includeCivil: boolean;
  designerFeePercent: number;
  
  // Kitchen Micro-Calculator Fields
  kitchenLayout?: KitchenLayout;
  kitchenCountertop?: 'granite' | 'quartz' | 'nano-white';
  kitchenShutter?: 'laminate' | 'acrylic' | 'glass-ceramic';
  kitchenHardware?: 'basic' | 'soft-close' | 'premium-blum';
  kitchenAppliances?: 'freestanding' | 'built-in';
  kitchenWallAFeet?: number;
  kitchenWallAInches?: number;
  kitchenWallBFeet?: number;
  kitchenWallBInches?: number;
  kitchenAccessories?: Record<string, number>;

  // Bathroom Micro-Calculator Fields
  bathTiling?: 'dado' | 'full-height';
  bathFixtures?: 'standard' | 'premium' | 'luxury-kohler';
  bathVanity?: 'minimal' | 'hdhmr-storage';
  bathPartition?: 'none' | 'fixed' | 'sliding';
}

export interface EstimatorResult {
  baseTotal: number;
  categoryTotals: Record<string, number>;
  roomTotals: Record<string, number>;
  designerFee: number;
  gst: number;
  grandTotal: number;
  tierAesthetic: {
    accentColor: string;
    bgColor: string;
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

export const ARCH_MULTIPLIERS: Record<string, number> = {
  'apartment': 1.0,
  'independent-home': 1.15,
  'commercial': 1.4,
  'hospitality': 1.8,
};

export const WASTE_MARGIN = 0.05; // 5% standard waste

const TIER_AESTHETICS: Record<MaterialTier, { accentColor: string; bgColor: string; label: string }> = {
  essential: { accentColor: '#2C7A7B', bgColor: '#F8F9F9', label: 'Efficient & Functional' },
  premium: { accentColor: '#C4922A', bgColor: '#FCFAF6', label: 'Superior Craftsmanship' },
  luxury: { accentColor: '#D4AF37', bgColor: '#1A1712', label: 'Elite Bespoke Statement' },
};

// --- Default BOQ Items Template ---

export const DEFAULT_ITEMS: BOQItem[] = [
  {
    id: 'tv-unit',
    category: 'Woodwork',
    room: 'Living',
    name: 'Entertainment Unit (Floating)',
    unit: 'sq ft',
    quantity: 0,
    rates: { essential: 950, premium: 1600, luxury: 2800 },
    specs: {
      essential: "Commercial Ply + Standard Finish",
      premium: "Greenply BWP + Matte Acrylic",
      luxury: "Marine Ply + Exotic Veneer + PU"
    }
  },
  {
    id: 'shoe-rack',
    category: 'Woodwork',
    room: 'Living',
    name: 'Foyer Shoe Console',
    unit: 'sq ft',
    quantity: 0,
    rates: { essential: 850, premium: 1400, luxury: 2200 },
    specs: {
      essential: "Pre-lam Particle Board",
      premium: "HDHMR + Glossy Laminate",
      luxury: "BWP Ply + Charcoal Louvers"
    }
  },
  {
    id: 'kitchen-main',
    category: 'Kitchen',
    room: 'Kitchen',
    name: 'Modular Base & Wall Cabinets',
    unit: 'running ft',
    quantity: 0,
    rates: { essential: 1800, premium: 3200, luxury: 5800 },
    specs: {
      essential: "BWR Ply + Manual Hardware",
      premium: "BWP Ply + Hettich Soft-close",
      luxury: "Anti-fingerprint Matte + Blum Aventos"
    }
  },
  {
    id: 'wardrobe-1',
    category: 'Woodwork',
    room: 'Bedroom 1',
    name: 'Floor-to-Ceiling Wardrobe',
    unit: 'sq ft',
    quantity: 0,
    rates: { essential: 1200, premium: 1850, luxury: 3800 },
    specs: {
      essential: "Standard BWR + Basic Handles",
      premium: "BWP Marine + Profile Handles",
      luxury: "BWP + Leather/Mirror Panels + Internal Auto-lights"
    }
  },
  {
    id: 'bed-1',
    category: 'Woodwork',
    room: 'Bedroom 1',
    name: 'Queen Bed with Hydraulic Storage',
    unit: 'unit',
    quantity: 0,
    rates: { essential: 35000, premium: 65000, luxury: 145000 },
    specs: {
      essential: "Plywood + Standard Fabric",
      premium: "Teak Wood + Premium Velvet Headboard",
      luxury: "Fully Customized Italian Design + Suede Wrap"
    }
  },
  {
    id: 'bath-vanity',
    category: 'Civil',
    room: 'Toilets',
    name: 'Floating Vanity with Mirror Cabinet',
    unit: 'unit',
    quantity: 0,
    rates: { essential: 12000, premium: 28000, luxury: 65000 },
    specs: {
      essential: "Wall-mount Basic",
      premium: "BWP Ply + Quartz Countertop",
      luxury: "Stone Slab Pedestal + LED Defogger Mirror"
    }
  },
  {
    id: 'ceiling-global',
    category: 'Ceiling',
    room: 'Living',
    name: 'Full False Ceiling (Saint-Gobain)',
    unit: 'sq ft',
    quantity: 0,
    rates: { essential: 100, premium: 185, luxury: 450 },
    specs: {
      essential: "Basic Perimeter Grid",
      premium: "Cove Lighting + Shadow Gaps",
      luxury: "Multi-layered Acoustic + Magnetic Tracks"
    }
  }
];

// --- Auto-populate Quantities based on BHK ---

export function getAdjustedItems(bhk: PropertyType, carpetArea: number): BOQItem[] {
  const roomMultipliers: Record<string, number> = {
    '1bhk': 0.5,
    '2bhk': 0.8,
    '3bhk': 1.0,
    '4bhk': 1.3,
    '5bhk': 1.6,
    'villa': 2.5,
    'independent-home': 2.2,
    'apartment': 1.0,
    'commercial': 1.8,
    'hospitality': 3.0,
  };
  
  const multiplier = roomMultipliers[bhk] || 1.0;

  return DEFAULT_ITEMS.map(item => {
    let q = item.quantity;
    
    // Scale quantity based on property type for certain items
    if (['wardrobe-1', 'vanity', 'bath-vanity'].includes(item.id)) {
      q = Math.round(item.quantity * multiplier);
    }
    
    // Area-based scaling
    if (item.id === 'ceiling-global') {
      q = carpetArea;
    }

    return { ...item, quantity: q };
  });
}

// --- Main Calculation Engine ---

export function calculateBudget(inputs: EstimatorInputs): EstimatorResult {
  const { city, tier, items, includeCivil, designerFeePercent, scope, projectType } = inputs;
  const cityMultiplier = CITY_MULTIPLIERS[city] || 1.0;
  const archMultiplier = ARCH_MULTIPLIERS[projectType || 'apartment'] || 1.0;
  const totalMultiplier = cityMultiplier * archMultiplier;

  let baseTotal = 0;
  const categoryTotals: Record<string, number> = {};
  const roomTotals: Record<string, number> = {};

  if (scope === 'full') {
    items.forEach(item => {
      // Skip civil if toggled off
      if (item.category === 'Civil' && !includeCivil) return;

      const baseRate = item.rates[tier];
      const cost = (baseRate * totalMultiplier * item.quantity) * (1 + WASTE_MARGIN);
      
      baseTotal += cost;
      categoryTotals[item.category] = (categoryTotals[item.category] || 0) + cost;
      roomTotals[item.room] = (roomTotals[item.room] || 0) + cost;
    });
  } else if (scope === 'kitchen') {
    // Specialized Kitchen logic with dimensions and accessories
    const layoutMultipliers: Record<KitchenLayout, number> = {
      'straight': 1.0, 'l-shape': 1.15, 'parallel': 1.4, 'u-shape': 1.7, 'island': 2.1
    };
    
    const materialRates = {
      countertop: { 'granite': 850, 'quartz': 2400, 'nano-white': 4800 },
      shutter: { 'laminate': 1100, 'acrylic': 1950, 'glass-ceramic': 3800 },
      hardware: { 'basic': 12000, 'soft-close': 38000, 'premium-blum': 85000 }
    };

    // Calculate total running length in feet
    const wallAFt = (inputs.kitchenWallAFeet || 0) + (inputs.kitchenWallAInches || 0) / 12;
    const wallBFt = (inputs.kitchenWallBFeet || 0) + (inputs.kitchenWallBInches || 0) / 12;
    const totalRunningFt = wallAFt + wallBFt;

    const multiplier = layoutMultipliers[inputs.kitchenLayout || 'straight'];
    const hardwareCost = materialRates.hardware[inputs.kitchenHardware || 'basic'];
    
    // Structure cost (Carcass + Countertop)
    const countertopRate = inputs.kitchenCountertop ? materialRates.countertop[inputs.kitchenCountertop] : 1000;
    const structureCost = (countertopRate + 2500) * totalRunningFt * multiplier; 
    
    // Shutter cost
    const shutterRate = inputs.kitchenShutter ? materialRates.shutter[inputs.kitchenShutter] : 1000;
    const shutterCost = shutterRate * totalRunningFt * 2.5; // Roughly 2.5ft height
    
    const applianceExtra = inputs.kitchenAppliances === 'built-in' ? 55000 : 0;

    // Accessories cost
    let accessoriesCost = 0;
    const accessoryRates: Record<string, number> = {
      'detergent_holder': 2500,
      'detergent_350': 1800,
      'cutlery_tray': 4500,
      'bottle_pullout': 3800
    };

    if (inputs.kitchenAccessories) {
      Object.entries(inputs.kitchenAccessories).forEach(([id, qty]) => {
        accessoriesCost += (accessoryRates[id] || 0) * qty;
      });
    }

    if (totalRunningFt > 0) {
      baseTotal = (structureCost + shutterCost + hardwareCost + applianceExtra + accessoriesCost) * cityMultiplier;
    } else {
      baseTotal = 0;
    }
    
    categoryTotals['Kitchen'] = baseTotal;
    roomTotals['Kitchen'] = baseTotal;
  } else if (scope === 'bathroom') {
    // Specialized Bathroom logic
    const bathRates = {
      waterproofing: 15000,
      tiling: inputs.bathTiling === 'full-height' ? 45000 : 25000,
      fixtures: { 'standard': 25000, 'premium': 55000, 'luxury-kohler': 125000 },
      vanity: inputs.bathVanity === 'hdhmr-storage' ? 35000 : 12000,
      partition: { 'none': 0, 'fixed': 18000, 'sliding': 32000 }
    };

    const fixtureCost = bathRates.fixtures[inputs.bathFixtures || 'standard'];
    const partitionCost = bathRates.partition[inputs.bathPartition || 'none'];
    
    baseTotal = (bathRates.waterproofing + bathRates.tiling + fixtureCost + bathRates.vanity + partitionCost) * cityMultiplier;
    categoryTotals['Civil'] = baseTotal;
    roomTotals['Toilets'] = baseTotal;
  }

  const designerFee = baseTotal * (designerFeePercent / 100);
  const gst = (baseTotal + designerFee) * 0.18;
  const grandTotal = baseTotal + designerFee + gst;

  return {
    baseTotal,
    categoryTotals,
    roomTotals,
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
