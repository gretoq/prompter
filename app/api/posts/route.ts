import Prompt from '@models/prompt';
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

    return response;
  } catch (error: any) {
    return new Response(
      'Failed to fetch all posts!',
      { status: 500 },
    );
  }
};
