import { describe, beforeAll, afterAll, it, expect } from '@jest/globals';
import ArticleService from '../../../services/article-service';
import CommentService from '../../../services/comment-service';
import newArticleJson from '../../mocks/article/mock-new-article.json';
import mongoose from 'mongoose';
import { Article } from '../../../models';
import 'dotenv/config';

beforeAll(async () => {
  await mongoose.connect(process.env.DB_MONGO_URI || '');
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe('Find Comment by Article Id', () => {
  it('should find a Comment by Article Id', async () => {
    const articleID = new mongoose.Types.ObjectId().toString();
    const article = await ArticleService.create({ id: articleID, ...newArticleJson});
    expect(mongoose.Types.ObjectId.isValid(article.id)).toBeTruthy();

    const commentID = new mongoose.Types.ObjectId().toString();
    const comment = await CommentService.create({ id: commentID, body: 'body', author: 'some author', article: article});
    
    expect(mongoose.Types.ObjectId.isValid(comment.id)).toBeTruthy();

    const commentFinded = await CommentService.find(comment.id);
    expect(typeof commentFinded.pop()).toEqual(typeof comment);
  });
  
  it('should not find a Comment by Article Id', async () => {
    const commentFinded = await CommentService.find(new mongoose.Types.ObjectId().toString());
    expect(commentFinded.length).toBe(0);
  });
});

describe('Create Comment', () => {
    it('should create new Comment', async () => {
      const articleID = new mongoose.Types.ObjectId().toString();
      const article = await ArticleService.create({ id: articleID, ...newArticleJson});
      expect(mongoose.Types.ObjectId.isValid(article.id)).toBeTruthy();

      const commentID = new mongoose.Types.ObjectId().toString();
      const comment = await CommentService.create({ id: commentID, body: 'body', author: 'some author', article: article});
      expect(mongoose.Types.ObjectId.isValid(comment.id)).toBeTruthy();
    });

    it('should not create new Comment', async () => {
      await expect(CommentService.create({ id: '', body: '', author: '', article: new Article()}))
        .rejects.toThrow(mongoose.Error.ValidationError);
    });
});

describe('Update Comment', () => {
  it('should update a Comment', async () => {
    const articleID = new mongoose.Types.ObjectId().toString();
    const article = await ArticleService.create({ id: articleID, ...newArticleJson});
    expect(mongoose.Types.ObjectId.isValid(article.id)).toBeTruthy();

    const commentID = new mongoose.Types.ObjectId().toString();
    const comment = await CommentService.create({ id: commentID, body: 'body', author: 'some author', article: article});
    expect(mongoose.Types.ObjectId.isValid(comment.id)).toBeTruthy();

    comment.body = 'Just edited body!';
    const commentUpdated = await CommentService.update(comment.id, comment);
    expect(mongoose.Types.ObjectId.isValid(comment.id)).toBeTruthy();
    expect(commentUpdated?.body).toBe('Just edited body!');
  });

  it('should not update a Comment', async () => {
    const commentUpdated = await CommentService.update(
      new mongoose.Types.ObjectId().toString(),
      {id: '', author: '', body: '', article: new Article()});
    expect(commentUpdated).toBeNull();
  });
});

describe('DELETE Comment', () => {
  it('should delete a comment', async () => {
    const articleID = new mongoose.Types.ObjectId().toString();
    const article = await ArticleService.create({ id: articleID, ...newArticleJson});
    expect(mongoose.Types.ObjectId.isValid(article.id)).toBeTruthy();

    const commentID = new mongoose.Types.ObjectId().toString();
    const comment = await CommentService.create({ id: commentID, body: 'body', author: 'some author', article: article});
    expect(mongoose.Types.ObjectId.isValid(comment.id)).toBeTruthy();

    const commentDeleted = await CommentService.remove(comment.id);
    expect(mongoose.Types.ObjectId.isValid((commentDeleted) ? commentDeleted.id : '')).toBeTruthy();
  });

  it('should not delete a comment', async () => {
    const commentDeleted = await CommentService.remove(new mongoose.Types.ObjectId().toString());
    expect(commentDeleted).toBeNull();
  });
});