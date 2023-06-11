'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  signIn,
  signOut, LiteralUnion,
  ClientSafeProvider,
} from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import { NavDropdown } from './NavDropdown';
import { Session } from 'next-auth/core/types';

interface Props {
  session: Session | null;
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
}

export const NavBar: React.FC<Props> = ({
  session, providers,
}) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const isUserLoggedIn = session?.user;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
              href="/create-prompt"
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
              <Link href="/profile" className="pointer-events-none sm:pointer-events-auto">
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
