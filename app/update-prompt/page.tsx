'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';
import { Post } from '../../types/Post';

const EditPrompt: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<Post>({
    _id: '',
    creator: {
      _id: '',
      username: '',
      image: '',
      email: '',
    },
    prompt: '',
    tag: '',
  });

  useEffect(() => {
    const getPromptDetails = async() => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost(data);
    };

    if (promptId) {
      getPromptDetails();
    }
  }, [promptId]);

  const updatePrompt = async(event: FormEvent) => {
    event.preventDefault();

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
            prompt: post.prompt,
            tag: post.tag,
          }),
        }
      );

      if (response.ok) {
        router.push('/profile');
      }

    } catch (error: any) {

    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      onSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
