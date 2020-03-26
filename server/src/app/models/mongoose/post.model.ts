import { default as mongoose, Schema, Document } from 'mongoose';

interface IPost extends Document {
  title: string;
  synopsis: string;
  body: string;
  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;
}

const postSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    max: 128
  },
  synopsis: {
    type: String,
    required: true,
    max: 512
  },
  body: {
    type: String,
    required: true,
  },
  _createdAt: { type: Number, required: true, default: Date.now() },
  _modifiedAt: { type: Number, required: false, default: null },
  _deletedAt: { type: Number, required: false, default: null },
});

const Post = mongoose.model<IPost>('Post', postSchema);

export { IPost, Post, postSchema };
