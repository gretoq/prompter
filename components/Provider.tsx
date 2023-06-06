'use client';

import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
// import { Session } from 'next-auth';

interface Props {
  children: ReactNode,
}

const Provider: React.FC<Props> = ({ children }) => {
  return (
    <SessionProvider> {/* session={session} */}
      {children}
    </SessionProvider>
  );
};

export default Provider;
