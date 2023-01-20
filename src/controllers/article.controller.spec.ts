import { Request, Response } from 'express';
import ArticleController from './article.controller';
import { ArticleService } from '../services';

describe('Article controller', () => {
  it('Fetch - Service should be called one', async () => {
    const mockRequest = {} as Request;
    const mockResponse = {} as Response;
    const mNext = jest.fn();
    jest.spyOn(ArticleService, 'fetch').mockReturnThis();
    await ArticleController.fetch(mockRequest, mockResponse, mNext);
    expect(ArticleService.fetch).toBeCalledTimes(1);
  });

  it('Find - Service should be called one', async () => {
    const mockRequest = {} as Request;
    mockRequest.params = { id: '1' };
    const mockResponse = {} as Response;
    const mNext = jest.fn();
    jest.spyOn(ArticleService, 'find').mockReturnThis();
    await ArticleController.find(mockRequest, mockResponse, mNext);
    expect(ArticleService.find).toBeCalledTimes(1);
  });
});
