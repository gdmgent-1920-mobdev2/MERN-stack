import { default as mongoose, Schema, Document, PaginateModel } from 'mongoose';
import { default as mongoosePaginate } from 'mongoose-paginate';

interface IPost extends Document {
  title: string;
  synopsis: string;
  body: string;
  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;
}

interface IPostModel extends PaginateModel<IPost> {

}

const postSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    max: 128,
  },
  synopsis: {
    type: String,
    required: true,
    max: 512,
  },
  body: {
    type: String,
    required: true,
  },
  _createdAt: { type: Number, required: true, default: Date.now() },
  _modifiedAt: { type: Number, required: false, default: null },
  _deletedAt: { type: Number, required: false, default: null },
});

postSchema.plugin(mongoosePaginate);
const Post = mongoose.model<IPost, IPostModel>('Post', postSchema);

export { IPost, Post, postSchema };
