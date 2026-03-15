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
  setPropertyType: (type: PropertyType) => void;
  setTier: (tier: MaterialTier) => void;
  setCarpetArea: (area: number) => void;
  setIncludeCivil: (include: boolean) => void;
  setDesignerFee: (percent: number) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  resetToDefaults: () => void;

  // Dynamic Results
  results: EstimatorResult;
}

const DEFAULT_CARPET_AREA = 1200;
const DEFAULT_BHK: PropertyType = '3bhk';

const initialInputs: EstimatorInputs = {
  propertyType: DEFAULT_BHK,
  city: 'Bangalore',
  tier: 'premium',
  carpetArea: DEFAULT_CARPET_AREA,
  items: getAdjustedItems(DEFAULT_BHK, DEFAULT_CARPET_AREA),
  includeCivil: true,
  designerFeePercent: 10,
};

export const useCalculatorStore = create<EstimatorState>((set, get) => ({
  inputs: initialInputs,
  results: calculateBudget(initialInputs),

  setCity: (city) => {
    const newInputs = { ...get().inputs, city };
    set({ inputs: newInputs, results: calculateBudget(newInputs) });
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
  }
}));
