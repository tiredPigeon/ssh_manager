import { Request, Response } from 'express';
import { HomeView } from '../views/HomeView';
import { UserModel } from '../models/User';

export class HomeController {
  async index(req: Request, res: Response): Promise<void> {
    const users = UserModel.getAllUsers();

    const homeView = new HomeView(res);
    homeView.render(users);
  }
}
