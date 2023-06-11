import User from '@models/user';
import { connectToDB } from '@utils/database';

interface Params {
  id: string,
}

export const GET = async(req: Request, { params }: { params: Params}) => {
  try {
    await connectToDB();

    const user = await User.findById(params.id);

    if (!user) {
      return new Response(
        'User is not found!',
        { status: 404 },
      );
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error: any) {
    return new Response(
      'Failed to fetch user`s info!',
      { status: 500 },
    );
  }
};
