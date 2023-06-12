import React from 'react';

import Skeleton from 'react-loading-skeleton';

const PromptCardSkeleton: React.FC = () => (
  <div className="prompt_card">
    <div className="flex justify-between items-start gap-5">
      <div
        className="flex-1 flex justify-start items-center gap-3"
      >
        <Skeleton
          width={40}
          height={40}
          borderRadius={20}
          containerClassName="rounded-full object-contain"
        />

        <div className="flex flex-col w-full">
          <Skeleton count={2} />
        </div>
      </div>

      <Skeleton borderRadius={14} containerClassName='copy_btn' />
    </div>

    <Skeleton className="mt-4" />

    <Skeleton count={4} />
  </div>
);

export default PromptCardSkeleton;
