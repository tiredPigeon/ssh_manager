// controllers/UserController.ts
import { Context } from 'telegraf';
import { UserService } from './services/UserService';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async listUsers(ctx: Context) {
    // با استفاده از userService کاربران را لیست کنید و در تلگرام نمایش دهید
  }

  async addUser(ctx: Context) {
    // دریافت اطلاعات کاربر از کاربر در تلگرام و اضافه کردن به دیتابیس با استفاده از userService
  }

  async deleteUser(ctx: Context) {
    // دریافت شناسه کاربر از کاربر در تلگرام و حذف کاربر با استفاده از userService
  }
}
