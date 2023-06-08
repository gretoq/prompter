import Prompt from '@models/post';
import { connectToDB } from '@utils/database';

// export const GET = async (request) => {
//   try {
//     await connectToDB();
//     const prompts = await Prompt.find().populate({
//       path: "creator"
//     });

//     const response = new Response(JSON.stringify(prompts), {
//       status: 200,
//     });

//     // Add a unique identifier to the URL to force a cache-busting reload
//     const url = new URL(request.url);
//     url.searchParams.set("t", Date.now());
//     response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
//     response.headers.set("Pragma", "no-cache");
//     response.headers.set("Expires", "0");
//     response.headers.set("Location", url.toString());

//     return response;
//   } catch (error) {
//     return new Response("Failed to fetch all prompts", { status: 500 })
//   }
// }

export const GET = async(request: Request) => {
  try {
    await connectToDB();

    global.console.log('request:', request);

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

    global.console.log('request:', request);

    return response;
  } catch (error: any) {
    return new Response(
      'Failed to fetch all posts!',
      { status: 500 },
    );
  }
};
