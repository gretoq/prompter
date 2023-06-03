import Prompt from '@models/prompt';
// import { Post } from '../../../types/Post';
import { connectToDB } from '@utils/database';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  request: NextRequest,
) => {
  try {
    await connectToDB();

    const prompts = await Prompt
      .find({})
      .populate('creator');

    return new Response(JSON.stringify(prompts), { status: 200 });

    // return NextResponse.json(prompts);
  } catch (error: any) {
    global.console.log('Failed to fetch data!', error.message);
    // throw new Error ('Failed to fetch data!');
  }
};
