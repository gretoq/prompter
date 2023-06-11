export const createPost = async(
  userId: string,
  prompt: string,
  tag: string,
) => {
  try {
    const response = await await fetch(
      '/api/posts/new',
      {
        method: 'POST',
        body: JSON.stringify({
          userId,
          prompt,
          tag,
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to create a new post!');
    }

    return response;
  } catch (error: any) {
    throw new Error(error.message, error);
  }
};

export const removePost = async(postId: string, userId: string) => {
  try {
    const fetcher = await fetch(`/api/posts/${postId}`, { method: 'DELETE' });

    if (!fetcher.ok) {
      throw new Error('Failed to remove the post!');
    }

    const response = await fetch(`/api/users/${userId}/posts`);
    const data = await response.json();

    return data;
  } catch (error: any) {
    throw new Error(error.message, error);
  }
};
