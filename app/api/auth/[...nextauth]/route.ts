import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';

import { connectToDB } from '@utils/database';

global.console.log({
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

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

      const newSession = {
        ...session,
      };

      global.console.log('session user:', sessionUser);
      global.console.log('session user before:', session.user);

      newSession.user.id = sessionUser._id.toString();

      global.console.log('session user after:', session.user);
      global.console.log('session:', session);

      return newSession;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        const userExists = await User.findOne({ email: profile?.email });

        global.console.log('profile:', profile);
        global.console.log('user exists:', userExists);

        if (!userExists) {
          const createdUser = await User.create({
            email: profile?.email,
            username: profile?.name?.replace(' ', '').toLowerCase(),
            image: profile?.image,
          });

          global.console.log('created User:', createdUser);
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
