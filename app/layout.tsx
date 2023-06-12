import React, { ReactNode } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '@styles/gloabal.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import { Metadata } from 'next';

export const metadata: Metadata= {
  title: 'Prompter',
  description: 'Discover & Share AI Prompts',
  icons: '/favicon.ico',
};

interface Props {
  children: ReactNode,
}

const RootLayout: React.FC<Props> = ({ children }) => (
  <html lang="en">
    <body>
      <Provider>
        <div className="main">
          <div className="gradient"></div>
        </div>

        <main className="app">
          <Nav />

          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            {children}
          </SkeletonTheme>
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
