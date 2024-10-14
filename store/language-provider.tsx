// store.ts (yangi fayl)
import { safeLocalStorage } from "@/utils/safeLocalstorge";
import { create } from "zustand";

interface LanguageState {
  language: string;
  setLanguage: (language: string) => void;
}

const useLanguageStore = create<LanguageState>((set) => ({
  language: typeof window !== "undefined" ? safeLocalStorage.getItem("language") || "uz" : "uz",
  setLanguage: (language: string) => {
    safeLocalStorage.setItem("language", language);
      set({ language });
  },
}));

export default useLanguageStore;
