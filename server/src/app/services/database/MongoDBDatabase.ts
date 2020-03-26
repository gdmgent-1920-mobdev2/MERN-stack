import { default as mongoose, Connection } from 'mongoose';
import { default as faker } from 'faker';

import { ILogger } from '../logger';
import { IConfig } from '../config';
import { IMessage, Message, IUser, User } from '../../models/mongoose';

class MongoDBDatabase {
  private config: IConfig;
  private logger: ILogger;
  private db: Connection;

  private users: Array<IUser>;

  constructor(logger: ILogger, config: IConfig) {
    this.logger = logger;
    this.config = config;

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
    await Promise.all([
      (async () => this.messageCreate(faker.lorem.paragraph()))(),
      (async () => this.messageCreate(faker.lorem.paragraph()))(),
      (async () => this.messageCreate(faker.lorem.paragraph()))(),
      (async () => this.messageCreate(faker.lorem.paragraph()))(),
      (async () => this.messageCreate(faker.lorem.paragraph()))(),
      (async () => this.messageCreate(faker.lorem.paragraph()))(),
      (async () => this.messageCreate(faker.lorem.paragraph()))(),
      (async () => this.messageCreate(faker.lorem.paragraph()))(),
      (async () => this.messageCreate(faker.lorem.paragraph()))(),
    ]);
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
  };
}

export default MongoDBDatabase;
