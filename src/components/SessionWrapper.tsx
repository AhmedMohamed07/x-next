'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

interface SessionWrapperProps {
  children: ReactNode;
}

const SessionWrapper = ({ children }: SessionWrapperProps) => {
  return (
    <SessionProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </SessionProvider>
  );
};
export default SessionWrapper;
