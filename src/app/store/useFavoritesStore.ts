import { create } from 'zustand/react';
import { persist } from 'zustand/middleware';
import { Animal } from '@/types/Animal';

type FavoritesStore = {
  favouritePetIds: Animal['id'][];
  setFavouritePetIds: (favouritePetIds: Animal['id'][]) => void;
  favouritePetsById: Record<Animal['id'], Animal>;
  addFavouritePet: (pet: Animal, isNew?: boolean) => void;
  removeFavouritePet: (pet: Animal) => void;
  errorCount: number;
  addToErrorCount: () => void;
};

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set) => ({
      favouritePetIds: [],
      setFavouritePetIds: (favouritePetIds) => set({ favouritePetIds }),
      favouritePetsById: {},
      addFavouritePet: (pet, isNew = false) =>
        set((state) => ({
          favouritePetIds: isNew
            ? [...state.favouritePetIds, pet.id]
            : state.favouritePetIds,
          favouritePetsById: { ...state.favouritePetsById, [pet.id]: pet },
        })),
      removeFavouritePet: (pet) =>
        set((state) => {
          const favouritePetIds = state.favouritePetIds.filter(
            (id) => id !== pet.id,
          );
          const favouritePetsById = { ...state.favouritePetsById };
          delete favouritePetsById[pet.id];
          return { favouritePetIds, favouritePetsById };
        }),
      errorCount: 0,
      addToErrorCount: () =>
        set(({ errorCount }) => ({ errorCount: errorCount + 1 })),
    }),
    {
      name: 'favouritePets',
      partialize: (state) => state.favouritePetIds,
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...{
          favouritePetIds:
            (persistedState as FavoritesStore['favouritePetIds']) || [],
        },
      }),
    },
  ),
);
