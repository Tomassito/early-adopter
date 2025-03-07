'use server';

import axiosInstance from '@/_baseService/index';

export const fetcher = async <Data>(url: string, body?: any) => {
  return (
    body ? axiosInstance.post<Data>(url, body) : axiosInstance.get<Data>(url)
  ).then(({ data }) => data);
};
