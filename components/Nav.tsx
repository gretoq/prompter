'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

// interface Props {}

const Nav: React.FC = () => {
  const [providers, setProviders]
    = useState<Record<
    LiteralUnion<BuiltInProviderType,string>,
    ClientSafeProvider> | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const setProvider = async() => {
      const response = await getProviders();

      setProviders(response);
    };

    setProvider();
  }, []);

  const isUserLoggedIn = session?.user;

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
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

      {/* desktop nav */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link
              href="/create-prompt"
              className="black_btn"
            >
              Create Post
            </Link>

            <button
              className="outline_btn"
              type="button"
              onClick={() => signOut()}
            >
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                className="rounded-full"
                src={session?.user?.image || ''}
                width={37}
                height={37}
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers && (
              Object.values(providers).map(({ name, id }) => (
                <button
                  className="black_btn"
                  type="button"
                  key={name}
                  onClick={() => signIn(id)}
                >
                  Sign In
                </button>
              ))
            )}
          </>
        )}
      </div>

      {/* mob nav */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              className="rounded-full"
              src={session?.user?.image || ''}
              width={37}
              height={37}
              alt="profile"
              onClick={() => setToggleDropdown(prev => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  className='dropdown_link'
                  href="/profile"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>

                <Link
                  className='dropdown_link'
                  href="/create-prompt"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>

                <button
                  className="mt-5 w-full black_btn"
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers && Object.values(providers)
              .map(({ id, name }) => (
                <button
                  className="black_btn"
                  key={name}
                  type="button"
                  onClick={() => signIn(id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
