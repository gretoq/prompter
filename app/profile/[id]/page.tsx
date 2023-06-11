'use client';

import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { useParams } from 'next/navigation';
import useSWR from 'swr';

import Profile from '@components/Profile';
import PromptCardListSkeleton from '@components/Skeletons/PromptCardListSkeleton';

import { getPosts } from '@utils/fetching/post';
import { Post } from '../../../types/Post';
import { getUserById } from '@utils/fetching/user';
import { User } from '../../../types/User';

const PublicProfilePage: React.FC = () => {
  const { id } = useParams();

  const {
    data: creator,
    error: errorCreator,
  } = useSWR<User>(`/api/users/${id}`, getUserById);

  if (errorCreator) {
    toast.error('Failed to find creator in database!');
  }

  const {
    data: posts = [],
    isValidating,
    error: errorPosts,
  } = useSWR<Post[]>(`/api/users/${id}/posts`, getPosts);

  if (errorPosts) {
    toast.error('Failded to find creator`s posts!');
  }

  return (
    <>
      <Toaster toastOptions={{ position: 'bottom-center' }} />

      {isValidating && (
        <section className="w-full">
          <h1 className="head_text text-left">
            <span className="blue_gradient">
              Profile
            </span>
          </h1>

          <p className="desc text-left">
            Welcome to {creator?.username} profile page
          </p>

          <PromptCardListSkeleton />
        </section>
      )}

      {posts && (
        <Profile
          name={creator?.username || ''}
          desc={`Welcome to ${creator?.username} public profile page`}
          myPosts={posts}
        />
      )}
    </>
  );
};

export default PublicProfilePage;
