'use client';

import { Post } from '../types/Post';
import React, { ChangeEvent, useEffect, useState } from 'react';
import PromptCardList from './PromptCardList';

const Feed: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    const fetchPosts = async() => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

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

      <PromptCardList
        posts={posts}
        handleTagClick={() => {}}
      />
    </section>
  );
};

export default Feed;
