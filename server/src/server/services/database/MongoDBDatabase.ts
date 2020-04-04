import { default as mongoose, Connection } from 'mongoose';
import { default as faker } from 'faker';

import { ILogger } from '../logger';
import { IConfig } from '../config';
import {
  IBlog,
  Blog,
  IMessage,
  Message,
  IUser,
  User,
  Post,
  IPost,
  ICategory,
  Category,
} from '../../models/mongoose';

class MongoDBDatabase {
  private config: IConfig;
  private logger: ILogger;
  private db: Connection;

  private blogs: Array<IBlog>;
  private categories: Array<ICategory>;
  private posts: Array<IPost>;
  private users: Array<IUser>;

  constructor(logger: ILogger, config: IConfig) {
    this.logger = logger;
    this.config = config;

    this.blogs = [];
    this.categories = [];
    this.posts = [];
    this.users = [];
  }

  public connect(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      mongoose
        .connect(this.config.mongoDBConnection, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(data => {
          this.db = mongoose.connection;

          this.logger.info('Connected to the mongodb database', {});

          resolve(true);
        })
        .catch(error => {
          this.logger.error("Can't connect to the database", error);

          reject(error);
        });
    });
  }

  public disconnect(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.db
        .close(true)
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          this.logger.error("Can't disconnect the database", error);

          reject(error);
        });
    });
  }

  private messageCreate = async (body: string) => {
    const message = new Message({ body });

    try {
      const newMessage = await message.save();

      this.logger.info(`Message created with id ${newMessage._id}`, {});
    } catch (error) {
      this.logger.error('An error occurred when creating a message', error);
    }
  };

  private createMessages = async () => {
    const promises = [];
    for (let i = 0; i < 100; i++) {
      promises.push(this.messageCreate(faker.lorem.paragraph()));
    }
  };

  private userCreate = async (
    email: string,
    password: string,
    role: string,
    firstName: string,
    lastName: string,
    avatar: string,
  ) => {
    const userDetail = {
      email,
      localProvider: {
        password,
      },
      role,
      profile: {
        firstName,
        lastName,
        avatar,
      },
    };

    const user: IUser = new User(userDetail);

    try {
      const createdUser = await user.save();
      this.users.push(createdUser);

      this.logger.info(`User created with id: ${createdUser._id}`, {});
    } catch (err) {
      this.logger.error(`An error occurred when creating a user ${err}`, err);
    }
  };

  private createUsers = async () => {
    const promises = [];

    this.userCreate(
      'drdynscript@gmail.com',
      'nmdgent007!',
      'administrator',
      'Philippe',
      'De Pauw - Waterschoot',
      'https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/42580828_10214673932035654_3017264055002857472_n.jpg?_nc_cat=104&_nc_sid=85a577&_nc_oc=AQkUCFAyscOEkhhfuiS4Fq4sY8_1_l56xU0xQurtXuVXLu3ipVfwpCB0eSPIcRhoFLI&_nc_ht=scontent-bru2-1.xx&oh=b032a18ceb8fc6e7e678f676cf356a4e&oe=5EA14E2B',
    );

    for (let i = 0; i < 30; i++) {
      const gender = Math.round(Math.random());
      promises.push(
        this.userCreate(
          faker.internet.email(),
          'nmdgent007!',
          'user',
          faker.name.firstName(gender),
          faker.name.lastName(gender),
          faker.internet.avatar(),
        ),
      );
    }

    return await Promise.all(promises);
  };

  private getRandomCategory = () => {
    let category: ICategory = null;
    if (this.categories && this.categories.length > 0) {
      category = this.categories[
        Math.floor(Math.random() * this.categories.length)
      ];
    }
    return category;
  };

  private postCreate = async (
    title: string,
    synopsis: string,
    body: string,
    imageUrl: string,
  ) => {
    const postDetail = {
      title,
      synopsis,
      body,
      imageUrl,
      _categoryId: this.getRandomCategory()._id,
    };

    const post: IPost = new Post(postDetail);

    try {
      const createdPost = await post.save();
      this.posts.push(createdPost);

      this.logger.info(`Post created with id: ${createdPost._id}`, {});
    } catch (err) {
      this.logger.error(`An error occurred when creating a post ${err}`, err);
    }
  };

  private createPosts = async () => {
    const promises = [];

    for (let i = 0; i < 28; i++) {
      promises.push(
        this.postCreate(
          faker.lorem.sentence(),
          faker.lorem.paragraph(),
          `<p>${faker.lorem.paragraphs(10, '</p><p>')}</p>`,
          `https://picsum.photos/seed/${i}/800/450`,
        ),
      );
    }

    return await Promise.all(promises);
  };

  private categoryCreate = async (name: string, description: string) => {
    const categoryDetail = {
      name,
      description,
    };

    const category: ICategory = new Category(categoryDetail);

    try {
      const createdCategory = await category.save();
      this.categories.push(createdCategory);

      this.logger.info(`Category created with id: ${createdCategory._id}`, {});
    } catch (err) {
      this.logger.error(
        `An error occurred when creating a category ${err}`,
        err,
      );
    }
  };

  private createCategories = async () => {
    const promises = [];

    for (let i = 0; i < 8; i++) {
      promises.push(
        this.categoryCreate(faker.lorem.word(), faker.lorem.paragraph()),
      );
    }

    return await Promise.all(promises);
  };

  private getRandomPostsAsArrayOfIds(nPosts: number) {
    const tempPosts = JSON.parse(JSON.stringify(this.posts)) as Array<IPost>;
    const arrayOfIds = [];
    while (arrayOfIds.length < nPosts) {
      const removedPost = tempPosts.splice(
        Math.floor(Math.random() * nPosts),
        1,
      )[0];
      arrayOfIds.push(removedPost._id);
    }
    return arrayOfIds;
  }

  private blogCreate = async (title: string, synopsis: string) => {
    const blogDetail = {
      title,
      synopsis,
      _postIds: this.getRandomPostsAsArrayOfIds(
        Math.floor(Math.random() * this.posts.length),
      ),
    };

    const blog: IBlog = new Blog(blogDetail);

    try {
      const createdBlog = await blog.save();
      this.blogs.push(createdBlog);

      this.logger.info(`Blog created with id: ${createdBlog._id}`, {});
    } catch (err) {
      this.logger.error(`An error occurred when creating a blog ${err}`, err);
    }
  };

  private createBlogs = async () => {
    const promises = [];

    for (let i = 0; i < 1; i++) {
      promises.push(
        this.blogCreate(faker.lorem.word(), faker.lorem.paragraph()),
      );
    }

    return await Promise.all(promises);
  };

  public seed = async () => {
    const messages = await Message.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createMessages();
        }
        return Message.find().exec();
      });

    this.users = await User.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createUsers();
        }
        return User.find().exec();
      });

    this.categories = await Category.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createCategories();
        }
        return Category.find().exec();
      });

    this.posts = await Post.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createPosts();
        }
        return Post.find().exec();
      });

    this.blogs = await Blog.estimatedDocumentCount()
      .exec()
      .then(async count => {
        if (count === 0) {
          await this.createBlogs();
        }
        return Blog.find().exec();
      });
  };
}

export default MongoDBDatabase;
