import { Comment } from '../models';

class CommentService {
  fetch() {
    return Comment.CommentModel.find().lean().exec();
  }

  find(id: string) {
    return Comment.CommentModel.findById(id).lean().exec();
  }

  create(comment: Comment.IComment) {
    return Comment.CommentModel.create(comment);
  }

  update(id: string, comment: Comment.IComment) {
    return Comment.CommentModel.findByIdAndUpdate(id, comment).lean().exec();
  }

  delete(id: string) {
    return Comment.CommentModel.findByIdAndDelete(id).lean().exec();
  }
}

export default new CommentService();
