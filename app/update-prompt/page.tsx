'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';
import FormSkeleton from '@components/Skeletons/FormSkeleton';

import { getPostById, updatePost } from '@utils/fetching/post';

const EditPrompt: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const {
    data: post,
    error,
    isValidating,
    mutate,
  } = useSWR(`/api/posts/${postId}`, getPostById);

  const updatePrompt = async(prompt: string, tag: string) => {
    setSubmitting(true);

    if (!postId) {
      toast.error('Failed to find postId!');

      return;
    }

    try {
      const updatedPost = { ...post, prompt, tag};

      await mutate(updatePost(postId, prompt, tag), {
        optimisticData: updatedPost,
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
      });

      if (updatedPost) {
        toast.success('Successfully updated the post!');
        router.push('/profile');
      }

    } catch (error: any) {
      toast.error('Failed to update a post!');
      router.push('/profile');
    }
  };

  return (
    <>
      <Toaster toastOptions={{ position: 'bottom-center' }} />

      {post && (
        <Form
          type="Edit"
          prompt={post?.prompt}
          tag={post?.tag}
          submitting={submitting}
          onSubmit={updatePrompt}
        />
      )}

      {isValidating && (
        <FormSkeleton type="Edit" />
      )}

      {error && (
        <p>Here must be in future Error page</p>
      )}
    </>
  );
};

export default EditPrompt;
