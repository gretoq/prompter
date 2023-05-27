import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';

import { connectToDB } from '@utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
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
      try {
        await connectToDB();

        const userExists = await User.findOne({ email: profile?.email });

        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(' ', '').toLowerCase(),
            image: profile?.image,
          });

        }

        return true;
      } catch (error: any) {
        global.console.log('Error checking if user exists: ', error.message);

        return false;
      }
    },
  },
});

export {handler as GET, handler as POST };
