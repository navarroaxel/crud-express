import mongoose from 'mongoose';

const connectDb = async function (url: string) {
  try {
    mongoose.set('strictQuery', false);
    const connection = await mongoose.connect(url);
    return connection;
  } catch (error) {
    console.log(error);
  }
};

export { connectDb };
