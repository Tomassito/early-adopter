'use client';

import animals from '@/_api/animals';
import { Paginated } from '@/types/Pagination';
import { AnimalsResponse } from '@/_api/animals/types';
import { QueryParams } from '@/_baseService/types';
import {
  parseFilterValuesToQueryString,
  withQueryString,
} from '@/_baseService/queryParamsParser';
import { fetcher } from '@/_baseService/helpers';

export const getAnimals = async (params: Partial<QueryParams>) => {
  const queryString = parseFilterValuesToQueryString(params);
  const url = withQueryString(animals.animals, queryString);
  try {
    return fetcher<Paginated<AnimalsResponse>>(url);
  } catch (e) {
    throw new Error(`Error fetching animals: ${e}`);
  }
};
