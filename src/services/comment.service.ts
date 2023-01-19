import { Comment, IComment } from '../models/comment.model';

class CommentService {
  fetch() {
    return Comment.find().lean().exec();
  }

  find(id: string) {
    return Comment.findById(id).lean().exec();
  }

  create(comment: IComment) {
    return Comment.create(comment);
  }

  update(id: string, comment: IComment) {
    return Comment.findByIdAndUpdate(id, comment).lean().exec();
  }

  delete(id: string) {
    return Comment.findByIdAndDelete(id).lean().exec();
  }
}

export default new CommentService();
