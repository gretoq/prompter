import { Post } from '../types/Post';
import React from 'react';
import PromptCard from './PromptCard';

interface Props {
  posts: Post[],
  handleTagClick?: () => void,
  onEdit?: (post: Post) => void,
  onDelete?: (post: Post) => void,
}

const PromptCardList: React.FC<Props> = ({
  posts,
  handleTagClick,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {posts.map(post => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
};

export default PromptCardList;
