import { Article } from '../models';

const fetch = () => {
  return Article.ArticleModel.find().lean().exec();
};

const find = (id: string) => {
  return Article.ArticleModel.findById(id).lean().exec();
};

const create = (article: Article.IArticle) => {
  return Article.ArticleModel.create(article);
};

const update = (id: string, article: Article.IArticle) => {
  return Article.ArticleModel.findByIdAndUpdate(id, article).lean().exec();
};

const remove = (id: string) => {
  return Article.ArticleModel.findByIdAndDelete(id).lean().exec();
};

const ArticleService = {
  fetch,
  find,
  create,
  update,
  remove,
};

export default ArticleService;
