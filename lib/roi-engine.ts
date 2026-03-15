// ============================================================
// Be More Design Equity™ — ROI Formula Engine (Pure TypeScript)
// ============================================================

export type DesignTier = 'modular' | 'hybrid' | 'bespoke';
export type AutomationLevel = 'none' | 'basic' | 'intermediate' | 'full';
export type FinishGrade = 'commercial' | 'premium' | 'luxury';
export type MaintenanceTier = 'low' | 'medium' | 'high';
export type Profession = 'none' | 'developer' | 'creator' | 'executive' | 'other';

export interface CalculatorInputs {
  // Step 1 — Property
  localityId: string;
  localityFactor: number;
  noisePollutionScore: number;
  quietPremiumMultiplier: number;
  propertyType: 'apartment' | 'villa';
  currentValue: number;                    // ₹ in Lakhs

  // Step 2 — Investment
  investmentAmount: number;                // ₹ in Lakhs (10 → 100)
  automationLevel: AutomationLevel;
  finishGrade: FinishGrade;
  designTier: DesignTier;
  maintenanceTier: MaintenanceTier;

  // Step 3 — Modules
  modules: {
    acoustic: boolean;
    bespokeKitchen: boolean;
    wfhZone: boolean;
    smartHome: boolean;
    documentationLocker: boolean;
    outdoor: boolean;
  };
  profession: Profession;                  // for WFH ROI calculation
}

export interface ROIResult {
  // Core outputs
  futureValue: number;                     // ₹ Lakhs (5-year projection)
  capitalAppreciation: number;             // ₹ Lakhs gained
  appreciationPercent: number;             // %
  rentalYield: number;                     // % annual
  rentalPremium: number;                   // % above market rate
  resaleSpeedDays: number;                 // Days faster to sell vs undesigned

  // Comparison breakdown
  hybridAdvantage: number;                 // % advantage over pure modular
  bespokePenalty: number;                  // % disadvantage of 100% bespoke (maintenance)
  modularValue5yr: number;                 // ₹ Lakhs if gone 100% modular
  bespokeValue5yr: number;                 // ₹ Lakhs if gone 100% bespoke
  hybridValue5yr: number;                  // actual result ₹ (is your selection)

  // Module contributions
  contributions: {
    acoustic: number;
    bespokeKitchen: number;
    wfhZone: number;
    smartHome: number;
    documentationLocker: number;
    outdoor: number;
    hybridBonus: number;
  };

  // Factors used (for display/debugging)
  factors: {
    Rf: number;
    Lf: number;
    Af: number;
    Mf: number;
    totalMultiplier: number;
  };
}

// --- Factor Lookup Tables ---

const DESIGN_TIER_FACTOR: Record<DesignTier, number> = {
  modular:  0.85,
  hybrid:   1.20,   // sweet spot
  bespoke:  1.10,   // higher quality but higher maintenance
};

const AUTOMATION_BONUS: Record<AutomationLevel, number> = {
  none:         0,
  basic:        0.03,
  intermediate: 0.07,
  full:         0.12,  // KNX/Control4
};

const FINISH_BONUS: Record<FinishGrade, number> = {
  commercial: 0,
  premium:    0.05,
  luxury:     0.11,  // Marble/Venetian Plaster
};

const MAINTENANCE_FACTOR: Record<MaintenanceTier, number> = {
  low:    1.00,
  medium: 0.95,
  high:   0.87,   // open-pore wood etc — discourages buyers
};

const WFH_PROFESSION_YIELD: Record<Profession, number> = {
  none:      0.04,
  developer: 0.09,
  creator:   0.14,
  executive: 0.12,
  other:     0.06,
};

// --- Helper: format for labels ---
export function formatLakhs(value: number): string {
  if (value >= 100) {
    const cr = value / 100;
    return cr % 1 === 0 ? `₹${cr}Cr` : `₹${cr.toFixed(2)}Cr`;
  }
  return `₹${Math.round(value)}L`;
}

// --- Main ROI Calculator ---
export function calculateROI(inputs: CalculatorInputs): ROIResult {
  const {
    currentValue,
    investmentAmount,
    localityFactor: Lf,
    quietPremiumMultiplier,
    noisePollutionScore,
    designTier,
    automationLevel,
    finishGrade,
    maintenanceTier,
    modules,
    profession,
  } = inputs;

  // Base design tier factor
  let Rf = DESIGN_TIER_FACTOR[designTier];

  // Add automation and finish grade bonuses
  Rf += AUTOMATION_BONUS[automationLevel];
  Rf += FINISH_BONUS[finishGrade];

  // Maintenance penalty
  const Mf = MAINTENANCE_FACTOR[maintenanceTier];

  // Acoustic factor: scaled by noise pollution score (louder area = bigger acoustic ROI)
  const acousticActive = modules.acoustic;
  const noiseScale = noisePollutionScore / 10;  // 0 → 1
  const Af = acousticActive ? 1 + (quietPremiumMultiplier - 1) * noiseScale : 1.0;

  // --- Module contribution amounts (₹ Lakhs gained) ---
  const I = investmentAmount;  // shorthand

  const acousticContrib        = acousticActive        ? I * 0.12 * noiseScale * quietPremiumMultiplier : 0;
  const bespokeKitchenContrib  = modules.bespokeKitchen ? I * 0.09 : 0;
  const smartHomeContrib       = modules.smartHome       ? I * 0.08 * AUTOMATION_BONUS[automationLevel] + I * 0.04 : 0;
  const documentationContrib   = modules.documentationLocker ? I * 0.05 : 0;    // liquidity bonus
  const outdoorContrib         = modules.outdoor         ? I * 0.04 : 0;

  // WFH zone — profession-weighted
  const wfhYieldBonus          = modules.wfhZone ? WFH_PROFESSION_YIELD[profession] : 0;
  const wfhContrib             = modules.wfhZone ? I * wfhYieldBonus * 1.2 : 0;

  // Hybrid Bonus: if design tier is 'hybrid', add extra 8% on investment
  const hybridBonus = designTier === 'hybrid' ? I * 0.08 : 0;

  const totalContributions =
    acousticContrib + bespokeKitchenContrib + smartHomeContrib +
    wfhContrib + documentationContrib + outdoorContrib + hybridBonus;

  // --- Core Formula ---
  // V_future = V_base + (I × Rf × Lf × Af × Mf) + module contributions
  const coreAppreciation = I * Rf * Lf * Af * Mf;
  const capitalAppreciation = coreAppreciation + totalContributions;
  const futureValue = currentValue + capitalAppreciation;
  const appreciationPercent = (capitalAppreciation / currentValue) * 100;

  // --- Rental Yield ---
  const baseRentalYield = 0.035;  // Bengaluru average: 3.5%
  const rentalPremiumPercent =
    (designTier === 'hybrid' ? 0.12 : designTier === 'bespoke' ? 0.10 : 0.06) +
    (acousticActive ? noiseScale * 0.06 : 0) +
    wfhYieldBonus +
    (modules.smartHome ? 0.04 : 0) +
    (modules.documentationLocker ? 0.02 : 0);

  const rentalYield = baseRentalYield + rentalPremiumPercent;
  const rentalPremium = rentalPremiumPercent * 100;

  // --- Comparison: Pure Modular vs Hybrid vs Pure Bespoke ---
  const modularValue5yr = currentValue + (I * DESIGN_TIER_FACTOR.modular * Lf * Mf);
  const hybridValue5yr  = futureValue;
  const bespokeValue5yr = currentValue + (I * DESIGN_TIER_FACTOR.bespoke * Lf * 0.88);  // bespoke has higher maintenance drag over 5yr

  const hybridAdvantage = ((hybridValue5yr - modularValue5yr) / modularValue5yr) * 100;
  const bespokePenalty  = ((bespokeValue5yr - hybridValue5yr) / hybridValue5yr) * 100;

  // --- Resale Speed ---
  // Documented, acoustically-treated homes sell faster
  let daysFromMarket = 45;  // avg Bengaluru secondary market
  if (modules.documentationLocker) daysFromMarket -= 10;
  if (acousticActive) daysFromMarket -= 8;
  if (modules.smartHome) daysFromMarket -= 5;
  const resaleSpeedDays = Math.max(7, daysFromMarket);

  return {
    futureValue,
    capitalAppreciation,
    appreciationPercent,
    rentalYield: rentalYield * 100,
    rentalPremium,
    resaleSpeedDays,
    hybridAdvantage,
    bespokePenalty,
    modularValue5yr,
    bespokeValue5yr,
    hybridValue5yr,
    contributions: {
      acoustic:            acousticContrib,
      bespokeKitchen:      bespokeKitchenContrib,
      wfhZone:             wfhContrib,
      smartHome:           smartHomeContrib,
      documentationLocker: documentationContrib,
      outdoor:             outdoorContrib,
      hybridBonus,
    },
    factors: {
      Rf,
      Lf,
      Af,
      Mf,
      totalMultiplier: Rf * Lf * Af * Mf,
    },
  };
}
