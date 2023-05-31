import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';

// eslint-disable-next-line no-unused-vars
export const GET = async(request: Request) => {
  try {
    await connectToDB();

    const prompts = await Prompt
      .find({})
      .populate('creator');

    const response = new Response(JSON.stringify(prompts), {
      status: 200,
    });

    return response;
  } catch (error: any) {
    return new Response(
      'Failed to fetch all prompts!',
      { status: 500 },
    );
  }
};
