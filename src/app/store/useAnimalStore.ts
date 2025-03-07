import { create } from 'zustand/react';
import { Animal } from '@/types/Animal';

type AnimalStore = {
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
  isError: boolean;
  setIsError: (isError: boolean) => void;
  animals: Animal[];
  setAnimalsFromPrev: (fn: (animals: Animal[]) => Animal[]) => void;
};

export const useAnimalStore = create<AnimalStore>((setState) => ({
  loading: false,
  setLoading: (loading) => setState({ loading }),
  isError: false,
  setIsError: (isError) => setState({ isError }),
  animals: [],
  setAnimalsFromPrev: (fn) =>
    setState(({ animals: prevAnimals }) => ({ animals: fn(prevAnimals) })),
}));

export const getAnimalStore = useAnimalStore.getState;
