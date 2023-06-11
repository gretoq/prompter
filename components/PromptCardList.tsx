import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import React from 'react';
import PromptCard from './PromptCard';
import { Post } from '../types/Post';

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
    <div >
      <TransitionGroup className="mt-16 prompt_layout">
        {posts.map(post => {
          return (
            <CSSTransition
              key={post._id}
              timeout={300}
              // classNames="item"
              classNames={{
                // appear: 'your tailwindcss codes',
                // appearActive: 'your tailwindcss codes',
                // appearDone: 'your tailwindcss codes',
                enter: 'opacity-0',
                enterActive: 'opacity-100 transition-opacity easy-in duration-500',
                // enterDone: 'your tailwindcss codes',
                exit: 'opacity-100',
                exitActive: 'opacity-0 transition-opacity easy-in duration-500',
                // exitDone: 'your tailwindcss codes',
              }}
            >
              <PromptCard
                post={post}
                handleTagClick={handleTagClick}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
};

export default PromptCardList;
