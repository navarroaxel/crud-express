import mongoose from 'mongoose';

class MongoService {
  async connectDb(url: string) {
    try {
      mongoose.set('strictQuery', false);
      await mongoose.connect(url);
      console.log('Connected to mongo');
    } catch (error) {
      console.log(error);
    }
  }
}

export default new MongoService();
