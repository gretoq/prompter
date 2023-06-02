import NextAuth, { DefaultSession, DefaultProfile } from 'next-auth';

declare module 'next-auth' {
  export interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }

  export interface Profile extends DefaultProfile {
    picture?: string;
    avatar_url?: string;
  }
}
