import { AnimalType } from '@/types/Animal';

export default {
  animal: (id: number) => `animals/${id}`,
  animals: 'animals',
  breedList: (type: AnimalType) => `types/${type}/breeds`,
};
