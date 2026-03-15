import { create } from 'zustand';
import { 
  CalculatorInputs, 
  ROIResult, 
  calculateROI, 
  DesignTier, 
  AutomationLevel, 
  FinishGrade, 
  MaintenanceTier, 
  Profession 
} from './roi-engine';
import { getLocalityById, LocalityData } from './localities';

interface CalculatorState {
  // Inputs
  inputs: CalculatorInputs;
  selectedLocality: LocalityData;

  // Actions
  setLocality: (id: string) => void;
  setPropertyType: (type: 'apartment' | 'villa') => void;
  setCurrentValue: (value: number) => void;
  setInvestmentAmount: (amount: number) => void;
  setDesignTier: (tier: DesignTier) => void;
  setAutomationLevel: (level: AutomationLevel) => void;
  setFinishGrade: (grade: FinishGrade) => void;
  setMaintenanceTier: (tier: MaintenanceTier) => void;
  setProfession: (prof: Profession) => void;
  toggleModule: (module: keyof CalculatorInputs['modules']) => void;

  // Dynamic Results
  results: ROIResult;
}

const defaultLocality = getLocalityById('whitefield')!;

export const useCalculatorStore = create<CalculatorState>((set, get) => ({
  inputs: {
    localityId: defaultLocality.id,
    localityFactor: defaultLocality.localityFactor,
    noisePollutionScore: defaultLocality.noisePollutionScore,
    quietPremiumMultiplier: defaultLocality.quietPremiumMultiplier,
    propertyType: 'apartment',
    currentValue: 150, // 1.5 Cr
    investmentAmount: 40, // 40L
    designTier: 'hybrid',
    automationLevel: 'basic',
    finishGrade: 'premium',
    maintenanceTier: 'low',
    profession: 'none',
    modules: {
      acoustic: false,
      bespokeKitchen: true,
      wfhZone: false,
      smartHome: true,
      documentationLocker: true,
      outdoor: false,
    },
  },
  selectedLocality: defaultLocality,

  results: calculateROI({
    localityId: defaultLocality.id,
    localityFactor: defaultLocality.localityFactor,
    noisePollutionScore: defaultLocality.noisePollutionScore,
    quietPremiumMultiplier: defaultLocality.quietPremiumMultiplier,
    propertyType: 'apartment',
    currentValue: 150,
    investmentAmount: 40,
    designTier: 'hybrid',
    automationLevel: 'basic',
    finishGrade: 'premium',
    maintenanceTier: 'low',
    profession: 'none',
    modules: {
      acoustic: false,
      bespokeKitchen: true,
      wfhZone: false,
      smartHome: true,
      documentationLocker: true,
      outdoor: false,
    },
  }),

  setLocality: (id) => {
    const loc = getLocalityById(id);
    if (!loc) return;
    const newInputs = { 
      ...get().inputs, 
      localityId: id,
      localityFactor: loc.localityFactor,
      noisePollutionScore: loc.noisePollutionScore,
      quietPremiumMultiplier: loc.quietPremiumMultiplier
    };
    set({ 
      selectedLocality: loc,
      inputs: newInputs,
      results: calculateROI(newInputs)
    });
  },

  setPropertyType: (type) => {
    const newInputs = { ...get().inputs, propertyType: type };
    set({ inputs: newInputs, results: calculateROI(newInputs) });
  },

  setCurrentValue: (value) => {
    const newInputs = { ...get().inputs, currentValue: value };
    set({ inputs: newInputs, results: calculateROI(newInputs) });
  },

  setInvestmentAmount: (amount) => {
    const newInputs = { ...get().inputs, investmentAmount: amount };
    set({ inputs: newInputs, results: calculateROI(newInputs) });
  },

  setDesignTier: (tier) => {
    const newInputs = { ...get().inputs, designTier: tier };
    set({ inputs: newInputs, results: calculateROI(newInputs) });
  },

  setAutomationLevel: (level) => {
    const newInputs = { ...get().inputs, automationLevel: level };
    set({ inputs: newInputs, results: calculateROI(newInputs) });
  },

  setFinishGrade: (grade) => {
    const newInputs = { ...get().inputs, finishGrade: grade };
    set({ inputs: newInputs, results: calculateROI(newInputs) });
  },

  setMaintenanceTier: (tier) => {
    const newInputs = { ...get().inputs, maintenanceTier: tier };
    set({ inputs: newInputs, results: calculateROI(newInputs) });
  },

  setProfession: (prof) => {
    const newInputs = { ...get().inputs, profession: prof };
    set({ inputs: newInputs, results: calculateROI(newInputs) });
  },

  toggleModule: (module) => {
    const newInputs = { 
      ...get().inputs, 
      modules: { 
        ...get().inputs.modules, 
        [module]: !get().inputs.modules[module] 
      } 
    };
    set({ inputs: newInputs, results: calculateROI(newInputs) });
  },
}));
