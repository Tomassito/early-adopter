import { Animal } from '@/types/Animal';

export type AnimalsResponse = {
  animals: Animal[];
};

export type AnimalResponse = {
  animal: Animal;
};

export type BreedsResponse = {
  breeds: Array<{ name: string }>;
};
