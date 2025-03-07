'use client';

import { FC, PropsWithChildren } from 'react';
import { SwrConfigProvider } from '@/_baseService/SwrConfigProvider';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return <SwrConfigProvider>{children}</SwrConfigProvider>;
};
