import { create } from 'zustand';
import { 
  EstimatorInputs, 
  EstimatorResult, 
  calculateBudget, 
  MaterialTier, 
  PropertyType,
  BOQItem,
  getAdjustedItems
} from './budget-engine';

interface EstimatorState {
  // Inputs
  inputs: EstimatorInputs;

  // Actions
  setCity: (city: EstimatorInputs['city']) => void;
  setLocality: (locality: string) => void;
  setProjectType: (type: EstimatorInputs['projectType']) => void;
  setFloorPlan: (file: File | string | null) => void;
  setPropertyType: (type: PropertyType) => void;
  setPurpose: (purpose: EstimatorInputs['purpose']) => void;
  setTier: (tier: MaterialTier) => void;
  setCarpetArea: (area: number) => void;
  setIncludeCivil: (include: boolean) => void;
  setDesignerFee: (percent: number) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  resetToDefaults: () => void;

  setScope: (scope: EstimatorInputs['scope']) => void;
  setKitchenConfig: (config: Partial<Pick<EstimatorInputs, 'kitchenLayout' | 'kitchenCountertop' | 'kitchenShutter' | 'kitchenHardware' | 'kitchenAppliances' | 'kitchenWallAFeet' | 'kitchenWallAInches' | 'kitchenWallBFeet' | 'kitchenWallBInches' | 'kitchenAccessories'>>) => void;
  setBathConfig: (config: Partial<Pick<EstimatorInputs, 'bathTiling' | 'bathFixtures' | 'bathVanity' | 'bathPartition'>>) => void;

  // Dynamic Results
  results: EstimatorResult;
}

const DEFAULT_CARPET_AREA = 0;
const DEFAULT_BHK: PropertyType = '1bhk';

const initialInputs: EstimatorInputs = {
  scope: 'full',
  projectType: 'apartment',
  propertyType: DEFAULT_BHK,
  floorPlan: null,
  city: 'Bangalore',
  locality: '',
  tier: 'premium',
  purpose: 'move-in',
  carpetArea: DEFAULT_CARPET_AREA,
  items: getAdjustedItems(DEFAULT_BHK, DEFAULT_CARPET_AREA),
  includeCivil: true,
  designerFeePercent: 10,
  
  // Defaults for micro-calculators
  kitchenLayout: 'l-shape',
  kitchenCountertop: 'granite',
  kitchenShutter: 'laminate',
  kitchenHardware: 'soft-close',
  kitchenAppliances: 'freestanding',
  kitchenWallAFeet: 0,
  kitchenWallAInches: 0,
  kitchenWallBFeet: 0,
  kitchenWallBInches: 0,
  kitchenAccessories: {},
  
  bathTiling: 'full-height',
  bathFixtures: 'standard',
  bathVanity: 'hdhmr-storage',
  bathPartition: 'none'
};

export const useCalculatorStore = create<EstimatorState>((set, get) => ({
  inputs: initialInputs,
  results: calculateBudget(initialInputs),

  setCity: (city) => {
    const newInputs = { ...get().inputs, city };
    set({ inputs: newInputs, results: calculateBudget(newInputs) });
  },
  
  setLocality: (locality) => {
    const newInputs = { ...get().inputs, locality };
    set({ inputs: newInputs, results: calculateBudget(newInputs) });
  },

  setProjectType: (type) => {
    const newInputs = { ...get().inputs, projectType: type };
    set({ inputs: newInputs, results: calculateBudget(newInputs) });
  },

  setFloorPlan: (file) => {
    set({ inputs: { ...get().inputs, floorPlan: file } });
  },

  setPropertyType: (type) => {
    // When property type changes, we re-baseline the items
    const adjustedItems = getAdjustedItems(type, get().inputs.carpetArea);
    const newInputs = { ...get().inputs, propertyType: type, items: adjustedItems };
    set({ inputs: newInputs, results: calculateBudget(newInputs) });
  },

  setTier: (tier) => {
    const newInputs = { ...get().inputs, tier };
    set({ inputs: newInputs, results: calculateBudget(newInputs) });
  },

  setPurpose: (purpose) => {
    const newInputs = { ...get().inputs, purpose };
    set({ inputs: newInputs, results: calculateBudget(newInputs) });
  },

  setCarpetArea: (area) => {
    // When area changes, we re-baseline items that depend on area (ceiling, flooring, walls)
    const adjustedItems = getAdjustedItems(get().inputs.propertyType, area);
    const newInputs = { ...get().inputs, carpetArea: area, items: adjustedItems };
    set({ inputs: newInputs, results: calculateBudget(newInputs) });
  },

  setIncludeCivil: (include) => {
    const newInputs = { ...get().inputs, includeCivil: include };
    set({ inputs: newInputs, results: calculateBudget(newInputs) });
  },

  setDesignerFee: (percent) => {
    const newInputs = { ...get().inputs, designerFeePercent: percent };
    set({ inputs: newInputs, results: calculateBudget(newInputs) });
  },

  updateItemQuantity: (id, quantity) => {
    const newItems = get().inputs.items.map(item => 
      item.id === id ? { ...item, quantity } : item
    );
    const newInputs = { ...get().inputs, items: newItems };
    set({ inputs: newInputs, results: calculateBudget(newInputs) });
  },

  resetToDefaults: () => {
    set({ inputs: initialInputs, results: calculateBudget(initialInputs) });
  },

  setScope: (scope) => {
    const newInputs = { ...get().inputs, scope };
    set({ inputs: newInputs, results: calculateBudget(newInputs) });
  },

  setKitchenConfig: (config) => {
    const newInputs = { ...get().inputs, ...config };
    set({ inputs: newInputs, results: calculateBudget(newInputs) });
  },

  setBathConfig: (config) => {
    const newInputs = { ...get().inputs, ...config };
    set({ inputs: newInputs, results: calculateBudget(newInputs) });
  }
}));
