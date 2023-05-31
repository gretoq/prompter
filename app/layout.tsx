import React, { ReactNode } from 'react';
import '@styles/gloabal.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import { Session } from 'next-auth';

export const metadata = {
  title: 'Prompter',
  description: 'Discover & Share AI Prompts',
};

interface Props {
  children: ReactNode,
  session: Session | null
}

const RootLayout: React.FC<Props> = ({ children, session }) => {

  return (
    <html lang="en">
      <body>
        <Provider session={session}>
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
