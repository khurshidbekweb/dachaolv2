// store.ts (yangi fayl)
import { create } from "zustand";

interface LanguageState {
  language: string;
  setLanguage: (language: string) => void;
}

const useLanguageStore = create<LanguageState>((set) => ({
  language: typeof window !== "undefined" ? localStorage.getItem("language") || "uz" : "uz",
  setLanguage: (language: string) => {
    localStorage.setItem("language", language);
    set({ language });
  },
}));

export default useLanguageStore;
