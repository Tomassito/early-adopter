import { AnimalAge, AnimalType, Gender } from '@/types/Animal';

export type QueryParams = {
  page: number;
  limit: number;
  type: AnimalType;
  breed: string | null;
  gender: Gender;
  age: AnimalAge;
  name: string | null;
  // location: string,
  // distance: string,
  // order: string,
  // order_by: string,
};
