import { create } from 'zustand';

interface AppState {
    showPhrases: boolean;
    setShowPhrases: (show: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
    showPhrases: false,
    setShowPhrases: (show) => set({ showPhrases: show }),
}));
