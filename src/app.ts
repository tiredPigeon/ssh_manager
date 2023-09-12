import express from 'express';
import { HomeController } from './controllers/HomeController';

const app = express();
const port = 3000;

const homeController = new HomeController();

app.get('/', homeController.index.bind(homeController));

app.listen(port, () => {
  console.log(`سرور در پورت ${port} اجرا شد.`);
});
