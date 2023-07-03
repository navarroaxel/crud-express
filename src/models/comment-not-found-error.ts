export default class CommentNotFoundError extends Error {
    constructor() {
        super('Comment does not exist.');
        Object.setPrototypeOf(this, CommentNotFoundError.prototype);
    }
}
