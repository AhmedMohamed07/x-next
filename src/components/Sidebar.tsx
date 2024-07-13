'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { BsTwitterX } from 'react-icons/bs';
import { HiHome } from 'react-icons/hi';

const Sidebar = () => {
  const session = useSession().data;
  return (
    <div className="hidden sm:inline p-3 space-y-4 h-screen flex-1 sticky top-0">
      <Link href={'/'}>
        <BsTwitterX className="w-16 h-16 hover:bg-slate-100 rounded-full p-3 cursor-pointer transition-all duration-200" />
      </Link>
      <Link
        href={'/'}
        className="flex items-center gap-2 text-xl hover:bg-slate-100 rounded-full p-3 cursor-pointer transition-all duration-200"
      >
        <HiHome className="w-7 h-7" />
        <span className="font-bold hidden xl:inline">Home</span>
      </Link>
      {session ? (
        <button
          className="hidden xl:inline bg-blue-400 text-white font-bold px-4 py-2 mt-4 hover:bg-blue-600 transition-all duration-200 rounded-full w-40 h-10"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      ) : (
        <button
          className="hidden xl:inline bg-blue-400 text-white font-bold px-4 py-2 mt-4 hover:bg-blue-600 transition-all duration-200 rounded-full w-40 h-10"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default Sidebar;
