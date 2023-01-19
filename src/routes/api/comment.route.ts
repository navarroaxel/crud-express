import express from 'express';
import { CommentController } from '../../controllers';

const CommentsRouter = express.Router();

CommentsRouter.get('/', CommentController.fetch);
CommentsRouter.get('/:id', CommentController.find);
CommentsRouter.post('/', CommentController.create);
CommentsRouter.put('/:id', CommentController.update);
CommentsRouter.delete('/:id', CommentController.remove);

export default CommentsRouter;
