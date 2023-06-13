import React, { ReactNode } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '@styles/gloabal.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import Head from 'next/head';
import { Metadata } from 'next';

export const metadata: Metadata= {
  title: 'Prompter',
  description: 'Discover & Share AI Prompts',
};

interface Props {
  children: ReactNode,
}

const RootLayout: React.FC<Props> = ({ children }) => {

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon/favicon.ico" type="image/x-icon"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
        <link rel="manifest" href="/favicon/site.webmanifest"/>
      </head>
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
};

export default RootLayout;
