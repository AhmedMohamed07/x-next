'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { myLoader } from './MyLoder';
import { TbPhoto } from 'react-icons/tb';
import { useCallback, useEffect, useRef, useState } from 'react';
import { app } from '@/firebase';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from 'firebase/firestore';
import { ExtendedUser } from '@/types';

const Input = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [text, setText] = useState('');
  const [postLoading, setpostLoading] = useState(false);
  const db = getFirestore(app);

  const session = useSession().data;
  const imagePickRef = useRef<HTMLInputElement>(null)!;

  const handleClick = () => {
    if (imagePickRef.current) {
      imagePickRef.current.click();
    }
  };

  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const file = e.target.files![0];
    const file = e.target.files?.[0];

    if (file) {
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const uploagImgToStorage = useCallback(() => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }
    setImageLoading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + '-' + selectedFile?.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress + '% done');
      },
      (error) => {
        console.error('Upload failed', error);
        setImageLoading(false);
        setImageFileUrl(null);
        setSelectedFile(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl);
          console.log('Upload successful');
          setImageLoading(false);
        });
      }
    );
  }, [selectedFile]);

  useEffect(() => {
    if (selectedFile) {
      uploagImgToStorage();
    }
  }, [selectedFile, uploagImgToStorage]);

  const postHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const submitHandler = async () => {
    setpostLoading(true);

    const docRef = await addDoc(collection(db, 'posts'), {
      uid: (session?.user as ExtendedUser).uid,
      name: session?.user?.name,
      username: (session?.user as ExtendedUser).username,
      text,
      profileImg: session?.user?.image,
      timestamp: serverTimestamp(),
      image: imageFileUrl,
    });
    setpostLoading(false);
    setText('');
    setImageFileUrl(null);
    setSelectedFile(null);
    location.reload();
  };

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
            value={text}
            onChange={postHandler}
          />
          {selectedFile && (
            <Image
              src={imageFileUrl || ''}
              loader={myLoader}
              alt="post"
              width={500}
              height={300}
              className={`w-full max-h-[250px] object-cover cursor-pointer
                ${imageLoading ? 'animate-pulse' : ''}`}
              onClick={() => {
                setSelectedFile(null);
                setImageFileUrl(null);
              }}
            />
          )}
        </div>
        <div className="flex justify-between items-center py-1">
          <TbPhoto
            onClick={handleClick}
            className="text-blue-400 w-10 h-10 rounded-full cursor-pointer hover:bg-blue-100 p-2"
          />
          <input
            type="file"
            ref={imagePickRef}
            accept="image/*"
            className="hidden"
            onChange={addImageToPost}
          />
          <button
            disabled={text.trim() === '' || postLoading || imageLoading}
            onClick={submitHandler}
            className="disabled:opacity-50 bg-blue-400 text-white font-bold px-4 py-1 hover:bg-blue-600 transition-all duration-200 rounded-full shadow"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
