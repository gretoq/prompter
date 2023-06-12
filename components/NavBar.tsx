'use client';

import React, { useState, useEffect } from 'react';
import { BuiltInProviderType } from 'next-auth/providers';
import { Session } from 'next-auth/core/types';
import Link from 'next/link';
import Image from 'next/image';
import {
  signIn,
  signOut,
  LiteralUnion,
  ClientSafeProvider,
} from 'next-auth/react';

import { NavDropdown } from './NavDropdown';
import { ROUTE_CREATE, ROUTE_PROFILE } from '@utils/constants/routes';

interface Props {
  session: Session | null;
  providers: Record<LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider> | null;
}

export const NavBar: React.FC<Props> = ({ session, providers }) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isUserLoggedIn = session?.user;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(() => window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <div className="sm:flex relative">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link
              href={ROUTE_CREATE}
              className="black_btn sm:block hidden"
            >
              Create Post
            </Link>
            <button
              className="outline_btn sm:block hidden"
              type="button"
              onClick={() => signOut()}
            >
              Sign Out
            </button>

            {windowWidth > 640 ? (
              <Link href={ROUTE_PROFILE}>
                <Image
                  className="rounded-full"
                  src={session.user.image || ''}
                  width={37}
                  height={37}
                  alt="profile" />
              </Link>
            ) : (
              <Image
                className="rounded-full"
                src={session.user.image || ''}
                width={37}
                height={37}
                alt="profile"
                onClick={() => setToggleDropdown(prev => !prev)} />
            )}

            {toggleDropdown && (
              <NavDropdown onToggleClick={setToggleDropdown} />
            )}
          </div>
        ) : (
          <>
            {providers && (
              <div className="flex gap-2 sm:gap-8">
                {Object.values(providers).map(({ name, id }) => (
                  <button
                    className="black_btn"
                    type="button"
                    key={id}
                    onClick={() => signIn(id)}
                  >
                    Sign In {name}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
