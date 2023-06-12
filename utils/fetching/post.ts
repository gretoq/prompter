import { ENDPOINT_POSTS, ENDPOINT_USERS } from '@utils/constants/endpoints';

export const getPosts = async(url: string) => {
  try {
    return await (await fetch(url)).json();
  } catch (error: any) {
    throw new Error(error.message, error);
  }
};

export const createPost = async(
  userId: string,
  prompt: string,
  tag: string,
) => {
  try {
    const response = await await fetch(
      `${ENDPOINT_POSTS}new`,
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

export const updatePost = async(
  postId: string,
  prompt:string,
  tag: string,
) => {
  try {
    const response = await fetch(
      `${ENDPOINT_POSTS}${postId}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          prompt,
          tag,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update the post!');
    }

    return await getPosts(`${ENDPOINT_POSTS}${postId}`);
  } catch (error: any) {
    throw new Error(error.message, error);
  }
};

export const removePost = async(postId: string, userId: string) => {
  try {
    const fetcher = await fetch(`${ENDPOINT_POSTS}${postId}`, { method: 'DELETE' });

    if (!fetcher.ok) {
      throw new Error('Failed to remove the post!');
    }

    return getPosts(`${ENDPOINT_USERS}${userId}/posts`);
  } catch (error: any) {
    throw new Error(error.message, error);
  }
};
