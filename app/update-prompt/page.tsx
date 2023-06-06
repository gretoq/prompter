'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import useSWR from 'swr';

import Form from '@components/Form';
import { Post } from '../../types/Post';
import FormSkeleton from '@components/Skeletons/FormSkeleton';

const EditPrompt: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { data: post, error, isValidating } = useSWR(`/api/prompt/${promptId}`, async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  });

  // const [post, setPost] = useState<Post | null>(null);

  // useEffect(() => {
  //   const getPromptDetails = async() => {
  //     try {
  //       const response = await fetch(`/api/prompt/${promptId}`);
  //       const data = await response.json();

  //       setPost(data);
  //     } catch (error: any) {
  //       global.console.log('error:', error.message);
  //     }
  //   };

  //   if (promptId) {
  //     getPromptDetails();
  //   }
  // }, [promptId]);

  const updatePrompt = async(prompt: string, tag: string) => {
    setSubmitting(true);

    if (!promptId) {
      return alert('Prompt ID not found!');
    }

    try {
      const response = await fetch(
        `/api/prompt/${promptId}`,
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
      global.console.log('Failed to update prompt!', error.message);
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

      {/* {true && (
        // <FormSkeleton />
      )} */}

      {error && (
        <p>Here must be in future Error page</p>
      )}
    </>
  );
};

export default EditPrompt;
