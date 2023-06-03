import Prompt from '@models/prompt';
// import { Post } from '../../../types/Post';
import { connectToDB } from '@utils/database';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export const GET = async (
  request: NextApiRequest,
  // response: NextApiResponse<Post[]>,
) => {
  try {
    await connectToDB();

    const prompts = await Prompt
      .find({})
      .populate('creator');

    // global.console.log('prompts', prompts);

    // response.setHeader('Cache-Control', 'no-store');
    // response.setHeader

    // return response.status(200).json(prompts);

    return NextResponse.json(prompts);
  } catch (error: any) {
    global.console.log('Failed to fetch data!', error.message);
    // throw new Error ('Failed to fetch data!');
  }
};
