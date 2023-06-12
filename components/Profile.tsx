import { Post } from '../types/Post';
import React from 'react';
import PromptCardList from './PromptCardList';

interface Props {
  name: string,
  desc: string,
  myPosts: Post[],
  onEdit?: (post: Post) => void,
  onDelete?: (post: Post) => void,
}

const Profile: React.FC<Props> = ({
  name,
  desc,
  myPosts,
  onEdit,
  onDelete,
}) => (
  <section className="w-full">
    <h1 className="head_text text-left">
      <span className="blue_gradient">
        {`${name} Profile`}
      </span>
    </h1>

    <p className="desc text-left">
      {desc}
    </p>

    <PromptCardList
      posts={myPosts}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  </section>
);

export default Profile;
