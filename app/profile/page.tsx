'use client';

import Profile from '@components/Profile';
import { Post } from '../../types/Post';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import PromptCardListSkeleton from '@components/Skeletons/PromptCardListSkeleton';

const ProfilePage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const {
    data = [],
    error,
    isValidating,
  } = useSWR(
    `/api/users/${session?.user.id}/posts`,
    async(url) => {
      const response = await fetch(url);
      const data = await response.json();

      return data;
    }
  );
  const [posts, setPosts] = useState<Post[]>(data);

  // useEffect(() => {
  //   const fetchPosts = async() => {
  //     const response = await fetch(
  //       `/api/users/${session?.user.id}/posts`,
  //     );
  //     const data = await response.json();

  //     setPosts(data);
  //   };

  //   if (session?.user.id) {
  //     fetchPosts();
  //   }
  // }, [session?.user.id]);

  const handleEdit = (post: Post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async(post: Post) => {
    const hasConfirmed
      = confirm('Are you sure you want to delete this prompt?');

    if (!hasConfirmed) {
      return;
    }

    try {
      await fetch(
        `/api/posts/${post._id}`,
        { method: 'DELETE' }
      );

      setPosts(prev => {
        const filteredPosts = prev.filter(prevPost => post._id !== prevPost._id);

        return filteredPosts;
      });

      // router.push('/profile');
    } catch (error: any) {
      global.console.log('Faild to remove a prompt: ', error.message);
    }
  };

  return (
    <>
      {isValidating && (
        <section className="w-full">
          <h1 className="head_text text-left">
            <span className="blue_gradient">
              Profile
            </span>
          </h1>

          <p className="desc text-left">
            Welcome to your personalized profile page
          </p>

          <PromptCardListSkeleton />
        </section>
      )}

      {posts && (
        <Profile
          name={session?.user.name || ''}
          desc="Welcome to your personalized profile page"
          myPosts={posts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default ProfilePage;
