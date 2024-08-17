'use client';
import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';

const Header = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  return (
    <nav className="py-4 max-md:px-4 flex items-center justify-between">
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width="200" height="200"></Image>
      </Link>

      <div>
        {isLoaded && isSignedIn ? (
          <div className="flex gap-4 items-center">
            <Link href={'/create'}>
              <Button>Create</Button>
            </Link>

            <UserButton />
          </div>
        ) : (
          <div className="flex gap-2">
            <Link href={'/sign-up'}>
              <Button variant="ghost">Sign up</Button>
            </Link>
            <Link href={'/sign-in'}>
              <Button>Login</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
