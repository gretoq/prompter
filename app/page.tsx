import React from 'react';
import Feed from '@components/Feed';

const Home: React.FC = () => (
  <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">
      Discover & Share
    </h1>

    <span className="head_text orange_gradient text-center m-0">
      AI-Powered Prompts
    </span>

    <p className="desc text-center">
      Prompter is an open-source AI promptingtool for modern world to discover,
      create and share creative prompts
    </p>

    <Feed />
  </section>
);

export default Home;
