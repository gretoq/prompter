'use client';

import React, { FormEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

export interface Post {
  prompt: string,
  tag: string,
}

const CreatePrompt: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<Post>({
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

      global.console.log('response create new post:', response);
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
