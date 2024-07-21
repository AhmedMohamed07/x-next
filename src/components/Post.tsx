'use client';

import Image from 'next/image';
import Link from 'next/link';
import { HiDotsHorizontal } from 'react-icons/hi';
import { myLoader } from './MyLoder';
import Icons from '@/components/Icons';
import { PostWithID } from '@/types';

export default function Post({ post, id }: PostWithID) {
  return (
    <div className="flex p-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
      <Image
        src={post?.profileImg}
        alt="user-img"
        width={10}
        height={10}
        className="h-11 w-11 rounded-full mr-4"
        loader={myLoader}
        priority={true}
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className=" flex flex-col items-start justify-start space-x-1 whitespace-nowrap sm:flex-row sm:items-center">
            <h4 className="font-bold text-sm truncate">{post?.name}</h4>
            <span className="text-xs truncate">@{post?.username}</span>
          </div>
          <HiDotsHorizontal className="text-sm" />
        </div>

        <Link href={`/posts/${id}`}>
          <p className="text-gray-800 text-sm my-3">{post?.text}</p>
        </Link>
        <Link href={`/posts/${id}`}>
          {post.image && (
            <Image
              src={post?.image}
              alt="post image"
              className="rounded-2xl mr-2"
              height={500}
              width={500}
              loader={myLoader}
            />
          )}
        </Link>
        <Icons id={id} uid={post.uid} />
      </div>
    </div>
  );
}
