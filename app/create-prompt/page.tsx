'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreatePrompt: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const createPrompt = async(
    prompt: string,
    tag: string,
  ) => {
    setSubmitting(true);

    try {
      const response: Response = await fetch(
        '/api/posts/new',
        {
          method: 'POST',
          body: JSON.stringify({
            userId: session?.user.id,
            prompt,
            tag,
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
      submitting={submitting}
      onSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
