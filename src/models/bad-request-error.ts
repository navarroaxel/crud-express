export default class BadRequestError extends Error {

    protected code = 400;

    constructor() {
        super('Bad Request');
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
