'use client';

import Image from 'next/image';
import { HiDotsHorizontal } from 'react-icons/hi';
import { myLoader } from './MyLoder';

export default function Comment({ comment, id }) {
  return (
    <div className="flex p-3 border-b border-gray-200 hover:bg-gray-50 pl-10">
      <Image
        src={comment?.userImg}
        height={10}
        width={10}
        loader={myLoader}
        alt="user-img"
        className="h-9 w-9 rounded-full mr-4"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-sm truncate">{comment?.name}</h4>
            <span className="text-xs truncate">@{comment?.username}</span>
          </div>
          <HiDotsHorizontal className="text-sm" />
        </div>

        <p className="text-gray-800 text-xs my-3">{comment?.comment}</p>
      </div>
    </div>
  );
}
