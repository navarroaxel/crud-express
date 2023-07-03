export default class ResourceNotFoundError extends Error {
    constructor() {
        super('Resource not found.');
        Object.setPrototypeOf(this, ResourceNotFoundError.prototype);
    }
}
