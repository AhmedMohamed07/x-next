'use client';
import { BsThreeDots } from 'react-icons/bs';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { BsTwitterX } from 'react-icons/bs';
import { HiHome } from 'react-icons/hi';
import { myLoader } from './MyLoder';

interface ExtendedUser {
  username?: string;
  uid?: string;
}

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <div className="hidden sm:flex sm:flex-col sm:justify-between p-3  h-screen sticky top-0">
      <div className="space-y-4">
        <Link href={'/'}>
          <BsTwitterX className="w-16 h-16 hover:bg-slate-100 rounded-full p-3 cursor-pointer transition-all duration-200" />
        </Link>
        <Link
          href={'/'}
          className="flex items-center gap-2 text-xl hover:bg-slate-100 rounded-full p-3 cursor-pointer transition-all duration-200 w-fit"
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

export default Sidebar;
