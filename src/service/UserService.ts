// services/UserService.ts
import { User } from '../models/User';
import sqlite3 from 'sqlite3';
import { getRepository, Repository } from 'typeorm';

export class UserService {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database('user.db');
    this.initializeDatabase();
  }

  private initializeDatabase() {
    // ایجاد جدول کاربران اگر وجود نداشته باشد
  }

  async getAllUsers(): Promise<User[]> {
    // بازیابی همه کاربران از دیتابیس
  }

  async addUser(user: User): Promise<void> {
    // افزودن کاربر به دیتابیس
  }

  async deleteUser(userId: number): Promise<void> {
    // حذف کاربر از دیتابیس
  }
}