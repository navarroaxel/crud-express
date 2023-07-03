import { describe, beforeAll, afterAll, it, expect } from '@jest/globals';
import { App } from '../../../app';
import { Article } from '../../../models';
import ArticleNotFoundError from '../../../models/article-not-found-error';
import mongoose from 'mongoose';
import request from 'supertest';
import newArticleJson from '../../mocks/article/mock-new-article.json';
import updateArticleJson from '../../mocks/article/mock-update-article.json';
import 'dotenv/config';

const app = new App().createApp();

beforeAll(async () => {
  await mongoose.connect(process.env.DB_MONGO_URI || '');
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe('GET All Controller /articles', () => {
    it('should return a 200', async () => {
      const responsePost = await request(app).post('/api/articles').send({article: newArticleJson});
      expect(responsePost.statusCode).toBe(201);

      const { body, statusCode } = await request(app).get('/api/articles');
      expect(statusCode).toBe(200);
      expect(typeof body.pop()).toEqual(typeof new Article());
    });
});

describe('GET by Id Controller /article/:id', () => {
  it('should return a 200', async () => {
    const responsePost = await request(app).post('/api/articles').send({article: newArticleJson});
    expect(responsePost.statusCode).toBe(201);

    const responseGet = await request(app)
      .get(`/api/articles/${responsePost.body._id}`);
    
    expect(responseGet.statusCode).toBe(200);
    expect(responseGet.body._id).toBe(responsePost.body._id);
    expect(responseGet.body.body).toBe(newArticleJson.body);
  });
  
  it('should return a 400 with', async () => {
    const responseGet = await request(app)
      .get(`/api/articles/${new mongoose.Types.ObjectId().toString()}`);
    
    expect(responseGet.statusCode).toBe(400);
    expect(responseGet.body.message).toBe(new ArticleNotFoundError().message);
  });
});

describe('POST Controller /article', () => {
  it('should return a 201', async () => {
    const { body, statusCode} = await request(app).post('/api/articles').send({article: newArticleJson});
    expect(statusCode).toBe(201);
    expect(body.title).toBe(newArticleJson.title);
    expect(body.body).toBe(newArticleJson.body);
    expect(body.author).toBe(newArticleJson.author);
  });

  it('should return a 400', async () => {
    const { body, statusCode} = await request(app).post('/api/articles').send({article: {}});
    expect(statusCode).toBe(400);
    expect(body.message).toContain('Article validation failed:');
  });
});

describe('PUT Controller /article', () => {
  it('should return a 201', async () => {
    const responsePost = await request(app).post('/api/articles').send({article: newArticleJson});
    expect(responsePost.statusCode).toBe(201);

    const responsePut = await request(app)
      .put(`/api/articles/${responsePost.body._id}`)
      .send({article: updateArticleJson});
    
    expect(responsePut.statusCode).toBe(200);
    expect(responsePut.body.body).toBe('Edited Body!');
  });
  
  it('should return a 400', async () => {
    const { body, statusCode } = await request(app)
      .put(`/api/articles/${new mongoose.Types.ObjectId().toString()}`)
      .send({article: updateArticleJson});
    
    expect(statusCode).toBe(400);
    expect(body.message).toBe(new ArticleNotFoundError().message);
  });
});

describe('DELETE Controller /article', () => {
  it('should return a 200', async () => {
    const responsePost = await request(app).post('/api/articles').send({article: newArticleJson});
    expect(responsePost.statusCode).toBe(201);

    const responseDel = await request(app)
      .delete(`/api/articles/${responsePost.body._id}`);
    expect(responseDel.statusCode).toBe(200);

    const responseGet = await request(app)
      .get(`/api/articles/${responsePost.body._id}`);
      
    expect(responseGet.statusCode).toBe(400);
    expect(responseGet.body.message).toBe(new ArticleNotFoundError().message);
  });
  
  it('should return a 400', async () => {
    const { body, statusCode } = await request(app)
      .delete(`/api/articles/${new mongoose.Types.ObjectId().toHexString()}`);
    
    expect(statusCode).toBe(400);
    expect(body.message).toBe(new ArticleNotFoundError().message);
  });
});