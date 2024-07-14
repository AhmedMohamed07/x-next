import Input from '@/components/Input';

export default function Home() {
  return (
    <div className="max-w-xl mx-auto border-l border-r min-h-screen">
      <h1 className="font-bold w-full border-b sticky top-0 z-50 p-3 text-lg sm:text-xl bg-white">
        Home
      </h1>
      <div>
        <Input />
      </div>
    </div>
  );
}
