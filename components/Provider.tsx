'use client';

import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

interface Props {
  children: ReactNode,
  session?: Session,
}

const Provider: React.FC<Props> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
};

export default Provider;