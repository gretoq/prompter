import React from 'react';
import PromptCardSkeleton from './PromptCardSkeleton';

const PromptCardListSkeleton: React.FC = () => (
  <div className="mt-16 prompt_layout">
    {[1, 2, 3, 4, 5, 6].map(element => (
      <PromptCardSkeleton key={element} />
    ))}
  </div>
);

export default PromptCardListSkeleton;
