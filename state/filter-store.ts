import { createStore } from './create-store';
import type { CategoryId } from '@/data/types';

type FilterState = {
  categories: CategoryId[];
  dateOption: 'today' | 'tomorrow' | 'this-week' | null;
  location: string;
  maxPrice: number;
};

const store = createStore<FilterState>({
  categories: [],
  dateOption: null,
  location: 'Mirpur 10, Dhaka, Bangladesh',
  maxPrice: 120,
});

export const filterStore = {
  ...store,
  toggleCategory: (id: CategoryId) =>
    store.set((s) => ({
      ...s,
      categories: s.categories.includes(id)
        ? s.categories.filter((c) => c !== id)
        : [...s.categories, id],
    })),
  setDateOption: (option: FilterState['dateOption']) =>
    store.set((s) => ({ ...s, dateOption: s.dateOption === option ? null : option })),
  setMaxPrice: (maxPrice: number) => store.set((s) => ({ ...s, maxPrice })),
  reset: () => store.set({ categories: [], dateOption: null, location: 'Mirpur 10, Dhaka, Bangladesh', maxPrice: 120 }),
};

export const useFilterState = store.useStore;
