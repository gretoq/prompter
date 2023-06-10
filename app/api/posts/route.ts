import Prompt from '@models/post';
import { connectToDB } from '@utils/database';

export const GET = async(request: Request) => {
  try {
    await connectToDB();

    const posts = await Prompt
      .find({})
      .populate('creator');

    const response = new Response(
      JSON.stringify(posts),
      { status: 200 },
    );

    const url = new URL(request.url);
    url.searchParams.set('t', `${Date.now()}`);
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Location', url.toString());

    return response;
  } catch (error: any) {
    return new Response(
      'Failed to fetch all posts!',
      { status: 500 },
    );
  }
};
