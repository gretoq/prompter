import Prompt from '@models/post';
import { connectToDB } from '@utils/database';

interface Params {
  id: string,
}

export const GET = async(reqest: Request, { params }: { params: Params}) => {
  try {
    await connectToDB();

    const prompts = await Prompt
      .find({creator: params.id})
      .populate('creator');

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error: any) {
    return new Response(
      'Failed to fetch prompts for selected user',
      { status: 500 },
    );
  }
};
