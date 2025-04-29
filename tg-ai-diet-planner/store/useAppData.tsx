import { create } from 'zustand';

type AppData = {
  totalCalories: number
};

type AppDataState = {
  data: AppData | null;
  setData: (data: AppData) => void;
  logout: () => void;
};

export const useAppDataStore = create<AppDataState>((set) => ({
  data: null,
  setData: (data) => set({ data }),
  logout: () => set({ data: null }),
}));
