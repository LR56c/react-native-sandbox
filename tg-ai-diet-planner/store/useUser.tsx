import { create } from 'zustand';

type User = {
  id: string
  name: string;
  email: string;
  height?: string;
  weight?: string;
  gender?: string;
  goal?: string;
  calories?: string;
  proteins?: string;
};

type UserState = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
