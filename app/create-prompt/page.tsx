'use client';

import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

import { createPost } from '@utils/fetching/post';
import { ROUTE_PROFILE } from '@utils/constants/routes';
import { FormType } from '../../types/FormType';

const CreatePrompt: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleCreatePrompt = async(
    prompt: string,
    tag: string,
  ) => {
    setSubmitting(true);

    if (!session) {
      toast.error('Failed to find user id.');
      return;
    }

    try {
      const response = await createPost(session.user.id, prompt, tag);

      if (response.ok) {
        toast.success('Successfully created the new post!');

        router.push(ROUTE_PROFILE);
      }
    } catch (error: any) {
      toast.error('Failed to create a new post!');
    }
  };

  return (
    <>
      <Toaster toastOptions={{ position: 'bottom-center' }} />

      <Form
        type={FormType.CREATE}
        submitting={submitting}
        onSubmit={handleCreatePrompt}
      />
    </>
  );
};

export default CreatePrompt;
