import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import News from '@/components/News';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'X Clone',
  description: 'A clone of X website built with Next. js and Tailwind CSS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex justify-between max-w-6xl mx-auto ">
          <div className="border-r hidden sm:inline h-screen">
            <Sidebar />
          </div>

          <div className="flex-1">{children}</div>

          <div className="hidden lg:flex lg:flex-col w-[24rem] h-screen p-3">
            <div className="static top-0 py-2 bg-white">
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-100 py-2 px-4 border-gray-300 rounded-3xl w-full text-sm "
              />
            </div>
            <News />
          </div>
        </div>
      </body>
    </html>
  );
}
