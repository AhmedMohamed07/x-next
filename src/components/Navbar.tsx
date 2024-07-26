'use client';
import { BsThreeDots } from 'react-icons/bs';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { BsTwitterX } from 'react-icons/bs';
import { HiHome } from 'react-icons/hi';
import { myLoader } from './MyLoder';
import { ExtendedUser } from '@/types';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="flex sm:hidden justify-between items-center  p-3 h-20 w-full sticky bottom-0 bg-white border">
      <div className=" flex justify-between w-full items-center">
        <Link href={'/'}>
          <BsTwitterX className="w-16 h-16 hover:bg-slate-100 rounded-full p-3 cursor-pointer transition-all duration-200" />
        </Link>

        {session ? (
          <button
            className=" px-2 py-1 inline bg-blue-400 text-white font-bold hover:bg-blue-600 transition-all duration-200 rounded-full h-10"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        ) : (
          <button
            className=" px-2 py-1 inline bg-blue-400 text-white font-bold hover:bg-blue-600 transition-all duration-200 rounded-full h-10"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        )}
      </div>

      {session?.user && (
        <div className="flex items-center gap-2 hover:bg-gray-200 p-3  rounded-full cursor-pointer">
          <Image
            src={session.user?.image || ''}
            alt="user logo"
            width={50}
            height={50}
            loader={myLoader}
            className="rounded-full"
          />
          <div className="hidden xl:inline-block">
            <h4 className="font-bold text-sm">{session.user.name}</h4>
            <p className="text-sm text-gray-500">
              @{(session.user as ExtendedUser).username}
            </p>
          </div>
          <BsThreeDots className="ml-4 hidden xl:inline-block" />
        </div>
      )}
    </div>
  );
};

export default Navbar;
