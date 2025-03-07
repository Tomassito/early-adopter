import { SWRConfig } from 'swr';
import { fetcher } from '@/_baseService/helpers';
import { PropsWithChildren } from 'react';

export const SwrConfigProvider = ({ children }: PropsWithChildren) => {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
      }}
    >
      {children}
    </SWRConfig>
  );
};
