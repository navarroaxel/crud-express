import mongoose from 'mongoose';
import { ArticleService, MongoService } from '.';
import 'dotenv/config';

describe('Article service', () => {
  let client: typeof mongoose | undefined;

  beforeAll(async () => {
    client = await MongoService.connectDb(process.env.MONGO_URL_TEST as string);
  });

  afterAll(async () => {
    if (client) {
      await client.connection.close();
    }
  });

  afterEach(async () => {
    if (client) {
      await client.connection.dropDatabase();
    }
  });

  it('Fetch - should return 0 articles', async () => {
    const articles = await ArticleService.fetch();

    expect(articles.length).toBe(0);
  });
});
