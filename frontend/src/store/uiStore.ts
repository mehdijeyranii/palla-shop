import { create } from "zustand";

type ActiveOverlay = "search" | "cart" | "account" | null;

interface UIState {
  activeOverlay: ActiveOverlay;
  setActiveOverlay: (overlay: ActiveOverlay) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeOverlay: null,
  setActiveOverlay: (overlay) => set({ activeOverlay: overlay }),
}));
