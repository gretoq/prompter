import { User } from './User';

export interface Post {
  _id: string,
  creator: User,
  prompt: string,
  tag: string,
}
