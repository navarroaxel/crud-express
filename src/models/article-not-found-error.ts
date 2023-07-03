export default class ArticleNotFoundError extends Error {
    constructor() {
        super('Article does not exist.');
        Object.setPrototypeOf(this, ArticleNotFoundError.prototype);
    }
}
