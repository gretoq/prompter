'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import useSWR from 'swr';

import Form from '@components/Form';
import FormSkeleton from '@components/Skeletons/FormSkeleton';

const EditPrompt: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { data: post, error, isValidating } = useSWR(`/api/posts/${postId}`, async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  });

  const updatePrompt = async(prompt: string, tag: string) => {
    setSubmitting(true);

    if (!postId) {
      return alert('Prompt ID not found!');
    }

    try {
      const response = await fetch(
        `/api/prompt/${postId}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            prompt,
            tag,
          }),
        }
      );

      if (response.ok) {
        router.push('/profile');
      }

    } catch (error: any) {
      global.console.log('Failed to update a post!', error.message);
    }
  };

  return (
    <>
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
