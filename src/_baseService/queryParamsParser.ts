'use client';

import { QueryParams } from '@/_baseService/types';
import { DEFAULT_PER_PAGE, FIRST_PAGE } from '@/app/constants';
import { isNil } from '@/utils/value';

export const parseFilterValuesToQueryString = (
  filters: Partial<QueryParams>,
) => {
  filters = setDefaultValues(filters);
  return parseParamsToQueryString(filters);
};

export const withQueryString = (url: string, queryString: string | null) => {
  return queryString ? `${url}?${queryString}` : url;
};

const setDefaultValues = (params: Partial<QueryParams>) => {
  return {
    page: FIRST_PAGE,
    limit: DEFAULT_PER_PAGE,
    ...params,
  };
};
const parseParamsToQueryString = (params: Partial<QueryParams>) => {
  let queryString = '';

  for (const [key, value] of Object.entries(params)) {
    if (isNil(value)) {
      continue;
    }
    switch (key) {
      case 'page':
      case 'limit':
      case 'type':
      case 'breed':
      case 'gender':
      case 'age':
      case 'name':
        queryString += `${key}=${value}&`;
        break;
    }
  }

  if (queryString.length > 0) {
    queryString = queryString.slice(0, -1);
  }
  return queryString || null;
};
