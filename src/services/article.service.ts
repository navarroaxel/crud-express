import { Article, IArticle } from '../models';

const fetch = () => {
  return Article.find().lean().exec();
};

const find = (id: string) => {
  return Article.findById(id).lean().exec();
};

const create = (article: IArticle) => {
  return Article.create(article);
};

const update = (id: string, article: IArticle) => {
  return Article.findByIdAndUpdate(id, article).lean().exec();
};

const remove = (id: string) => {
  return Article.findByIdAndDelete(id).lean().exec();
};

const ArticleService = {
  fetch,
  find,
  create,
  update,
  remove,
};

export default ArticleService;
