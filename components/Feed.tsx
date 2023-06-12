'use client';

import React, { ChangeEvent, useState } from 'react';
import useSWR from 'swr';

import PromptCardList from './PromptCardList';
import PromptCardListSkeleton from './Skeletons/PromptCardListSkeleton';

import { Post } from '../types/Post';
import { getPosts } from '@utils/fetching/post';
import { ENDPOINT_POSTS } from '@utils/constants/endpoints';

const Feed: React.FC = () => {
  const {
    data: posts = [],
    error,
    isValidating,
  } = useSWR<Post[]>(ENDPOINT_POSTS, getPosts);

  const [searchText, setSearchText] = useState<string>('');

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const filteredPosts = posts?.filter(({ prompt, tag }) => {
    return prompt.includes(searchText) || tag.includes(searchText);
  });

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          className="search_input peer"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearch}
          required
        />
      </form>

      {isValidating && (
        <PromptCardListSkeleton />
      )}

      {filteredPosts && (
        <PromptCardList
          posts={filteredPosts}
          handleTagClick={() => {}}
        />
      )}

      {error && (
        <p>Here must be in future error message for a user</p>
      )}
    </section>
  );
};

export default Feed;
