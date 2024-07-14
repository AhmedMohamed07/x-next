'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { myLoader } from './MyLoder';
import { TbPhoto } from 'react-icons/tb';

const Input = () => {
  const session = useSession().data;
  if (!session) return null;

  return (
    <div className="flex border-b">
      <div className="p-3">
        <Image
          src={session?.user?.image || ''}
          alt="logo"
          width={50}
          height={50}
          loader={myLoader}
          className="rounded-full cursor-pointer hover:brightness-90"
        />{' '}
      </div>
      <div className="p-2 w-full">
        <div className="border-b">
          <textarea
            placeholder="Whats happening?"
            className="placeholder:text-gray-500 w-full pb-2 outline-none min-h-[50px] tracking-wide text-gray-700"
          />
        </div>
        <div className="flex justify-between items-center py-1">
          <TbPhoto className="text-blue-400 w-10 h-10 rounded-full cursor-pointer hover:bg-blue-100 p-2" />
          <button
            disabled
            className="disabled:opacity-50 hidden xl:inline bg-blue-400 text-white font-bold px-4 py-1 hover:bg-blue-600 transition-all duration-200 rounded-full shadow"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
