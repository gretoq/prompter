'use client';

import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';

import Profile from '@components/Profile';
import PromptCardListSkeleton from '@components/Skeletons/PromptCardListSkeleton';

import { getPosts, removePost } from '@utils/fetching/post';
import { Post } from '../../types/Post';
import { ROUTE_HOME, ROUTE_UPDATE } from '@utils/constants/routes';
import { ENDPOINT_USERS } from '@utils/constants/endpoints';

const ProfilePage: React.FC = () => {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push(ROUTE_HOME);
    }

  }, [session, router]);

  const {
    data: posts = [],
    isValidating,
    mutate,
  } = useSWR<Post[]>(`${ENDPOINT_USERS}${userId}/posts`, getPosts);

  const handleEdit = (post: Post) => {
    router.push(`${ROUTE_UPDATE}?id=${post._id}`);
  };

  const handleDelete = async(post: Post) => {
    const hasConfirmed
      = confirm('Are you sure you want to delete this prompt?');

    if (!hasConfirmed) {
      return;
    }

    if (!session) {
      toast.error('Failed to find user id.');
      return;
    }

    const optimisticData = posts.filter(p => post._id !== p._id);

    try {
      await mutate(removePost(post._id, session.user.id), {
        optimisticData,
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
      });

      toast.success('Successfully deleted the post.');
    } catch (error: any) {
      toast.error('Failed to delete the post.');
    }
  };

  return (
    <>
      <Toaster toastOptions={{ position: 'bottom-center' }} />

      {isValidating && !posts && (
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
