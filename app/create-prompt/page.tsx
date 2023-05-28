'use client';

import React, { FormEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';
import { Post } from '../../types/Post';

const CreatePrompt: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
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

  const createPrompt = async(event: FormEvent) => {
    event.preventDefault();

    setSubmitting(true);

    try {
      const response: Response = await fetch(
        '/api/prompt/new',
        {
          method: 'POST',
          body: JSON.stringify({
            prompt: post.prompt,
            userId: session?.user.id,
            tag: post.tag,
          }),
        },
      );

      if (response.ok) {
        router.push('/');
      }
    } catch (error: any) {
      global.console.log('Error creating new post:', error.message);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      onSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
