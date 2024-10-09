// src/store/likeStore.ts
import {create} from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

// Typing for the store state and actions
interface LikeStoreState {
  likedCards: string[];
  toggleLike: (cardId: string) => void;
}

// Define persist options typing
type LikeStorePersist = (
  Partial<LikeStoreState> & { likedCards: string[] }
);

// Creating Zustand store with persist
export const useLikeStore = create<LikeStoreState>(
  persist<LikeStoreState, PersistOptions<LikeStoreState, LikeStorePersist>>(
    (set) => ({
      likedCards: [],
      toggleLike: (cardId) =>
        set((state) => {
          if (state.likedCards.includes(cardId)) {
            return { likedCards: state.likedCards.filter(id => id !== cardId) };
          } else {
            return { likedCards: [...state.likedCards, cardId] };
          }
        }),
    }),
    {
      name: 'likes', // LocalStorage kaliti
      getStorage: () => localStorage, // localStorage-dan foydalanamiz
    }
  )
);
