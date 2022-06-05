class Article {
    id: string;
    title: string;
    body: string;
    author: string;

    constructor(id: string, title: string, body: string, author: string) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.author = author;
    }
}

export default Article;
