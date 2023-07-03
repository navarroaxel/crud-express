import { describe, beforeAll, afterAll, it, expect } from '@jest/globals';
import { App } from '../../../app';
import { Comment } from '../../../models';
import newArticleJson from '../../mocks/article/mock-new-article.json';
import newCommentJson from '../../mocks/comment/mock-new-comment.json';
import updateCommentJson from '../../mocks/comment/mock-update-comment.json';
import request from 'supertest';
import mongoose from 'mongoose';
import CommentNotFoundError from '../../../models/comment-not-found-error';
import 'dotenv/config';

const app = new App().createApp();

beforeAll(async () => {
    await mongoose.connect(process.env.DB_MONGO_URI || '');
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
});

describe('POST Controller /comments', () => {
    it('should return a 200', async () => {
        const resPostArticle = await request(app).post('/api/articles').send({article: newArticleJson});
        expect(resPostArticle.statusCode).toBe(201);
        
        newCommentJson.article = resPostArticle.body._id;
        const  response = await request(app)
            .post('/api/comments')
            .send({comment: newCommentJson});
    
        expect(response.statusCode).toBe(201);
        expect(typeof response.body).toEqual(typeof new Comment());
    });
    
    it('should return a 400', async () => {
        const resPostArticle = await request(app).post('/api/articles').send({article: newArticleJson});
        expect(resPostArticle.statusCode).toBe(201);
        
        const jsonErr = {article: resPostArticle.body._id};
        const response = await request(app)
            .post('/api/comments')
            .send({comment: jsonErr});
    
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toContain('Comment validation failed:');
    });
});

describe('GET by Id Controller /comments?article=:id', () => {
    it('should return a 200 with a Comment', async () => {
        const resPostArticle = await request(app).post('/api/articles').send({article: newArticleJson});
        expect(resPostArticle.statusCode).toBe(201);

        const  { body, statusCode } = await request(app)
            .get(`/api/comments?article=${resPostArticle.body._id}`);

        expect(statusCode).toBe(200);
        expect(typeof body).toEqual(typeof new Comment());
    });

    it('should return a 200 empty body', async () => {
        const  { body, statusCode } = await request(app)
            .get(`/api/comments?article=${new mongoose.Types.ObjectId().toString()}`);
        expect(statusCode).toBe(200);
        expect(body.length).toBe(0);
    });
});

describe('PUT Controller /comments', () => {
    it('should return a 201', async () => {
        const resPostArticle = await request(app).post('/api/articles').send({article: newArticleJson});
        expect(resPostArticle.statusCode).toBe(201);
        
        newCommentJson.article = resPostArticle.body._id;
        const resPostComment = await request(app)
            .post('/api/comments')
            .send({comment: newCommentJson});
        expect(resPostComment.statusCode).toBe(201);

        const  { body, statusCode } = await request(app)
            .put(`/api/comments/${resPostComment.body._id}`)
            .send(updateCommentJson);

        expect(statusCode).toBe(200);
        expect(typeof body).toEqual(typeof new Comment());
        expect(body.body).toBe('Edited Body!');
    });

    it('should return a 400', async () => {
        const  { body, statusCode } = await request(app)
            .put(`/api/comments/${new mongoose.Types.ObjectId().toString()}`)
            .send(updateCommentJson);
        expect(statusCode).toBe(400);
        expect(body.message).toBe(new CommentNotFoundError().message);
    });
});

describe('DELETE Controller /comments', () => {
    it('should return a 201', async () => {
        const resPostArticle = await request(app).post('/api/articles').send({article: newArticleJson});
        expect(resPostArticle.statusCode).toBe(201);

        newCommentJson.article = resPostArticle.body._id;
        const resPostComment = await request(app)
            .post('/api/comments')
            .send({comment: newCommentJson});
        expect(resPostComment.statusCode).toBe(201);
        
        const resDelComment = await request(app)
            .delete(`/api/comments/${resPostComment.body._id}`);
        expect(resDelComment.statusCode).toBe(200);
        expect(typeof resDelComment.body).toEqual(typeof new Comment());

        const  {statusCode, body } = await request(app)
            .get(`/api/comments?article=${resPostComment.body._id}`);
        expect(statusCode).toBe(200);
        expect(body.length).toEqual(0);
    });

    it('should return a 400', async () => {
        const { body, statusCode } = await request(app)
            .delete(`/api/comments/${new mongoose.Types.ObjectId().toString()}`);
            
        expect(statusCode).toBe(400);
        expect(body.message).toBe(new CommentNotFoundError().message);
    });
});