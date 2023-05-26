import React, { ReactNode } from 'react';

import '@styles/gloabal.css';

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
        <div className="main">
          <div className="gradient"></div>
        </div>

        <main className="app">
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
