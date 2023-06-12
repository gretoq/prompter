'use client';

import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

interface Props {
  children: ReactNode,
}

const Provider: React.FC<Props> = ({ children }) => (
  <SessionProvider>
    {children}
  </SessionProvider>
);

export default Provider;
