import { ROUTE_HOME } from '@utils/constants/routes';
import Link from 'next/link';
import React from 'react';

const NotFoundPage: React.FC = () => (
  <section className="w-full flex-center flex-col">
    <h1 className="head_text leading-normal text-center m-0 mb-4">
      Sorry, page is not found
    </h1>

    <span className="head_text orange_gradient text-center leading-normal m-0 mb-8">
      Please go to Home Page
    </span>

    <Link href={ROUTE_HOME} className="black_btn">
      Go Home
    </Link>
  </section>
);

export default NotFoundPage;
