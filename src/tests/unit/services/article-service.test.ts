import { describe, beforeAll, afterAll, it, expect } from '@jest/globals';
import ArticleService  from '../../../services/article-service';
import newArticleJson from '../../mocks/article/mock-new-article.json';
import mongoose from 'mongoose';
import 'dotenv/config';

beforeAll(async () => {
  await mongoose.connect(process.env.DB_MONGO_URI || '');
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe('Find all Articles ', () => {
  it('should find all articles', async () => {
    const articleID = new mongoose.Types.ObjectId().toString();
    const article = await ArticleService.create({ id: articleID, ...newArticleJson});
    expect(mongoose.Types.ObjectId.isValid(article.id)).toBeTruthy();

    const articles = await ArticleService.fetch();
    expect(typeof articles.pop()).toEqual(typeof article);
  });
});

describe('Find Articles by id', () => {
  it('should find Article by id', async () => {
    const articleID = new mongoose.Types.ObjectId().toString();
    const article = await ArticleService.create({ id: articleID, ...newArticleJson});
    expect(mongoose.Types.ObjectId.isValid(article.id)).toBeTruthy();

    const findArticle = await ArticleService.find(article.id);
    expect(typeof findArticle).toEqual(typeof article);
  });
  
  it('should not find Article by id', async () => {
    const findArticle = await ArticleService.find(new mongoose.Types.ObjectId().toString());
    expect(findArticle).toBeNull();
  });
});

describe('Create Article', () => {
    it('should create new Article', async () => {
      const articleID = new mongoose.Types.ObjectId().toString();
      const article = await ArticleService.create({ id: articleID, ...newArticleJson});
      expect(mongoose.Types.ObjectId.isValid(article.id)).toBeTruthy();
    });
    
    it('should not create new Article', async () => {
      await expect(ArticleService.create({ id: '', body: '', author: '', title: ''}))
        .rejects.toThrow(mongoose.Error.ValidationError);
    });
});

describe('Update Article', () => {
    it('should update Article', async () => {
      const articleID = new mongoose.Types.ObjectId().toString();
      const article = await ArticleService.create({ id: articleID, ...newArticleJson});
      expect(mongoose.Types.ObjectId.isValid(article.id)).toBeTruthy();
      
      article.body = 'Just edited body.';
      const updatedArticle = await ArticleService.update(article.id, article);
      expect(typeof updatedArticle).toEqual(typeof article);
      expect(updatedArticle?.body).toEqual('Just edited body.');
    });
    
    it('should not update Article', async () => {
      const article  = await ArticleService.update(
        new mongoose.Types.ObjectId().toString(), 
        { id: '', body: '', author: '', title: ''});
      expect(article).toBeNull();
    });
});

describe('DELETE Article', () => {
  it('should delete Article', async () => {
    const articleID = new mongoose.Types.ObjectId().toString();
    const article = await ArticleService.create({ id: articleID, ...newArticleJson});
    expect(mongoose.Types.ObjectId.isValid(article.id)).toBeTruthy();

    const delArticle = await ArticleService.remove(article.id);
    expect(typeof  delArticle).toEqual(typeof article);
  });
  
  it('should not delete Article', async () => {
    const article = await ArticleService.remove(new mongoose.Types.ObjectId().toString());
    expect(article).toBeNull();
  });
});
