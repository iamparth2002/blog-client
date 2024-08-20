import Image from 'next/image'
import React from 'react'
import Link from 'next/link';


const Footer = () => {
  return (
    <footer className="bg-gray-50 my-2 rounded-xl">
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="flex justify-center  sm:justify-start">
        <Link href="/" className='flex gap-2 items-center pl-4'>
        <Image src="/bat.png" alt="Logo" width="45" height="45"></Image>
        <h1 className='text-3xl font-extrabold bg-gradient-to-r from-violet-400 to-indigo-600 bg-clip-text text-transparent'>ECHO</h1>
      </Link>
        </div>
  
        <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
          Created By @Parth Gandhi
        </p>
      </div>
    </div>
  </footer>
  )
}

export default Footer