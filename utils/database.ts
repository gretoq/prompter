import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDB = async() => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    global.console.log('MongoDB is already connected');

    return;
  }

  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`, {
      dbName: 'share_prompt',
      autoIndex: false, // Disable automatic index building
      maxPoolSize: 10, // Limit the number of socket connections
      serverSelectionTimeoutMS: 5000, // Retry sending operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
    });

    isConnected = true;

    global.console.log('MongoDB connected');
  } catch (error: any) {
    global.console.log(error.message);
  }
};
