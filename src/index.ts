import { Telegraf, Context } from 'telegraf';
import { createConnection, Connection } from 'typeorm';
import { Container } from 'typedi';
import { User } from './models/user';

import * as dotenv from 'dotenv';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// ایجاد اتصال به دیتابیس
let dbConnection: Connection;

createConnection().then((connection) => {
  dbConnection = connection;

  // اجرای ربات
  bot.launch();
});

// کلاس کنترلر کاربران
class UserController {
  private userRepository = dbConnection.getRepository(User);

  // تابع برای افزودن کاربر به دیتابیس
  public async addUser(chatId: number, username: string): Promise<User> {
    const user = new User();
    user.chatId = chatId;
    user.username = username;
    return this.userRepository.save(user);
  }

  // تابع برای حذف کاربر از دیتابیس
  public async removeUser(chatId: number): Promise<void> {
    await this.userRepository.delete({ chatId });
  }

  // تابع برای دریافت لیست کاربران
  public async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}

// کلاس سرویس کاربران
class UserService {
  private userController = Container.get(UserController);

  public async addUser(chatId: number, username: string): Promise<User> {
    return this.userController.addUser(chatId, username);
  }

  public async removeUser(chatId: number): Promise<void> {
    return this.userController.removeUser(chatId);
  }

  public async getUsers(): Promise<User[]> {
    return this.userController.getUsers();
  }
}

// کلاس مدل کاربر
@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chatId: number;

  @Column()
  username: string;
}

// کلاس DAO کاربران
class UserDao {
  private userService = Container.get(UserService);

  public async addUser(chatId: number, username: string): Promise<User> {
    return this.userService.addUser(chatId, username);
  }

  public async removeUser(chatId: number): Promise<void> {
    return this.userService.removeUser(chatId);
  }

  public async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }
}

// ایجاد دستورات ربات
bot.start((ctx) => ctx.reply('Welcome!'));
bot.help((ctx) => ctx.reply('Send /menu to access the management menu'));
bot.command('menu', async (ctx) => {
  const keyboard = [['List Users'], ['Add User', 'Remove User']];
  ctx.reply('Management Menu', {
    reply_markup: {
      keyboard,
      resize_keyboard: true,
    },
  });
});

bot.command('list', async (ctx) => {
  try {
    const userDao = Container.get(UserDao);
    const users = await userDao.getUsers();
    let message = '';
    users.forEach((user) => {
      message += `${user.username} (Chat ID: ${user.chatId})\n`;
    });
    ctx.reply(message);
  } catch (error) {
    console.error(error);
    ctx.reply('An error occurred');
  }
});

bot.command('add', (ctx) => {
  ctx.reply('Please enter the username of the user you want to add');
});

bot.command('remove', (ctx) => {
  ctx.reply('Please enter the username of the user you want to remove');
});

// دریافت پیام ها از کاربران
bot.on('message', async (ctx) => {
  const { text } = ctx.message;
  const chatId = ctx.message.chat.id;
  const username = ctx.message.from.username;

  if (text.startsWith('/add')) {
    const parts = text.split(' ');
    const newUser = parts[1];
    const userDao = Container.get(UserDao);
    await userDao.addUser(chatId, newUser);
    ctx.reply(`User ${newUser} has been added`);
  } else if (text.startsWith('/remove')) {
    const parts = text.split(' ');
    const userToRemove = parts[1];
    const userDao = Container.get(UserDao);
    await userDao.removeUser(userToRemove);
    ctx.reply(`User ${userToRemove} has been removed`);
  } else {
    ctx.reply('Invalid command');
  }
});