'use client';
import React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface Props {
  onToggleClick: (param: boolean) => void;
}

export const NavDropdown: React.FC<Props> = ({ onToggleClick }) => (
  <div className="dropdown">
    <Link
      className='dropdown_link'
      href="/profile"
      onClick={() => onToggleClick(false)}
    >
      My Profile
    </Link>
    <Link
      className='dropdown_link'
      href="/create-prompt"
      onClick={() => onToggleClick(false)}
    >
      Create Prompt
    </Link>
    <button
      className="mt-5 w-full black_btn"
      type="button"
      onClick={() => {
        onToggleClick(false);
        signOut();
      }}
    >
      Sign Out
    </button>
  </div>
);
