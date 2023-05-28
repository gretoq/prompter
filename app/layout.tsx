'use client';

import React, { ReactNode } from 'react';
import '@styles/gloabal.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
  title: 'Prompter',
  description: 'Discover & Share AI Prompts',
};

interface Props {
  children: ReactNode,
}

const RootLayout: React.FC<Props> = ({ children }) => {

  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />

            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
