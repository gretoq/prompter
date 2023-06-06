import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

import User from '@models/user';

import { connectToDB } from '@utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }),
    GitHubProvider({
      clientId: `${process.env.GITHUB_CLIENT_ID}`,
      clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session?.user?.email });

      const updatedSessionUser = {
        ...session?.user,
        id: sessionUser._id.toString(),
      };

      return {
        ...session,
        user: updatedSessionUser,
      };
    },
    async signIn({ profile }) {
      if (!profile) {
        return false;
      }

      try {
        await connectToDB();

        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name,
            image: profile.picture || profile.avatar_url,
          });

        }

        return true;
      } catch (error: any) {
        return false;
      }
    },
  },
});

export {handler as GET, handler as POST };
