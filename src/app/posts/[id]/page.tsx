import { app } from '../../../firebase';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { HiArrowLeft } from 'react-icons/hi';
import Link from 'next/link';
import Post from '@/components/Post';
import { PostDetails, PostWithID } from '@/types';

interface Params {
  id: string;
}
export default async function PostPage({ params }: { params: Params }) {
  const db = getFirestore(app);
  let data: (PostWithID['post'] & { id: string }) | null = null;
  const querySnapshot = await getDoc(doc(db, 'posts', params.id));
  const docData = querySnapshot.data() as PostDetails;

  if (
    docData &&
    docData.profileImg &&
    docData.name &&
    docData.username &&
    docData.uid
  ) {
    data = {
      id: querySnapshot.id,
      profileImg: docData.profileImg,
      name: docData.name,
      username: docData.username,
      text: docData.text,
      image: docData.image,
      uid: docData.uid,
    };
  }

  if (!data) {
    return <div>Post not found</div>;
  }
  return (
    <div className="max-w-xl mx-auto border-r border-l min-h-screen">
      <div className="flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <Link href={'/'} className="hover:bg-gray-100 rounded-full p-2">
          <HiArrowLeft className="h-5 w-5" />
        </Link>
        <h2 className="sm:text-lg">Back</h2>
      </div>
      <Post post={data} id={data.id} />
    </div>
  );
}
