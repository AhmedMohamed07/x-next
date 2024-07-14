import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // ...add more providers here
  ],

  callbacks: {
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user = {
          ...session.user,
          username:
            session.user.name?.split(' ').join('').toLocaleLowerCase() || '',
          uid: token.sub || '',
        } as typeof session.user;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
