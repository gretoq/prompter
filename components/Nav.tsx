'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

import Skeleton from 'react-loading-skeleton';
import { NavBar } from './NavBar';
import { ROUTE_HOME } from '@utils/constants/routes';

const Nav: React.FC = () => {
  const [providers, setProviders]
    = useState<Record<LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider> | null>(null);

  const { data: session } = useSession();
  const [isProviderLoaded, setIsProviderLoaded] = useState(false);

  useEffect(() => {
    const setProvider = async() => {
      try {
        const response = await getProviders();
        setProviders(response);
        setIsProviderLoaded(true);
      } catch (error: any) {
        global.console.log('Failed to get providers!');
      }
    };

    setProvider();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3 h-9">
      <Link href={ROUTE_HOME} className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promter logo"
          width={30}
          height={30}
          className="object-containe"
        />
        <p className="logo_text">
          Prompter
        </p>
      </Link>

      {!isProviderLoaded && (
        <Skeleton
          width={200}
          height={37}
        />
      )}

      {isProviderLoaded && (
        <NavBar
          session={session}
          providers={providers}
        />
      )}
    </nav>
  );
};

export default Nav;
