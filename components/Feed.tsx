'use client';

import useSWR from 'swr';
import { Post } from '../types/Post';
import React, { ChangeEvent, useEffect, useState } from 'react';
import PromptCardList from './PromptCardList';
import PromptCardSkeleton from './Skeletons/PromptCardSkeleton';

const Feed: React.FC = () => {
  // const [posts, setPosts] = useState<Post[]>([]);
  const {
    data: posts = [],
    error,
    isValidating,
  } = useSWR('/api/prompt', async(url) => {
    const response = await fetch(url);
    const data: Post[] = await response.json();
    return data;
  });

  const [searchText, setSearchText] = useState<string>('');

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  // useEffect(() => {
  //   const fetchPosts = async() => {
  //     const response = await fetch(
  //       '/api/prompt',
  //       { next: { revalidate: 10 }},
  //     );
  //     const data = await response.json();

  //     setPosts(data);
  //   };

  //   fetchPosts();
  // }, []);

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
        <div className="mt-16 prompt_layout">
          {[1, 2, 3, 4, 5, 6].map(element => (
            <PromptCardSkeleton key={element} />
          ))}
        </div>
      )}

      {posts && (
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
