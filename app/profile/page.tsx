'use client';

import Profile from '@components/Profile';
import { Post } from '../../types/Post';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ProfilePage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async() => {
      const response = await fetch(
        `/api/users/${session?.user.id}/posts`,
      );
      const data = await response.json();

      setPosts(data);
    };

    if (session?.user.id) {
      fetchPosts();
    }
  }, [session?.user.id]);

  const handleEdit = (post: Post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async(post: Post) => {
    const hasConfirmed
      = confirm('Are you sure you want to delete this prompt?');

    if (!hasConfirmed) {
      return;
    }

    try {
      await fetch(
        `/api/prompt/${post._id}`,
        { method: 'DELETE' }
      );

      setPosts(prev => {
        const filteredPosts = prev.filter(prevPost => post._id !== prevPost._id);

        return filteredPosts;
      });
    } catch (error: any) {
      global.console.log('Faild to remove a prompt: ', error.message);
    }
  };

  return (
    <Profile
      name={session?.user.name || ''}
      desc="Welcome to your personalized profile page"
      myPosts={posts}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default ProfilePage;
