import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDB = async() => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(
      `${process.env.MONGODB_URI}`,
      { dbName: 'share_prompt' },
    );

    isConnected = true;

    global.console.log('MongoDB connected');
  } catch (error: any) {
    throw new Error(error);
  }
};
