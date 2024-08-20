'use client';
import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';

const Header = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  console.log({user})
  return (
    <nav className="py-4 max-lg:px-4 flex items-center justify-between">
      <Link href="/" className='flex gap-2 items-center pl-4'>
        <Image src="/bat.png" alt="Logo" width="45" height="45"></Image>
        <h1 className='text-3xl font-extrabold bg-gradient-to-r from-violet-400 to-indigo-600 bg-clip-text text-transparent'>ECHO</h1>
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
