import { NextFunction, Request, Response } from 'express';
import { IPost, Post } from '../../models/mongoose';

class PostController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await Post.find()
        .sort({ _createdAt: -1 })
        .exec();
      return res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const post = await Post.findById(id).exec();
      return res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  };
}

export default PostController;
