import Prompt from '@models/post';
import { connectToDB } from '@utils/database';

export const GET = async(request: Request) => {
  try {
    await connectToDB();

    global.console.log('request:', request);

    const posts = await Prompt
      .find({})
      .populate('creator');

    const response = new Response(
      JSON.stringify(posts),
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Content-Type': 'application/json',
        },
      },
    );

    global.console.log('request:', request);

    return response;
  } catch (error: any) {
    return new Response(
      'Failed to fetch all posts!',
      { status: 500 },
    );
  }
};
