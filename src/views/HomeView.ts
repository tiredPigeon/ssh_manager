import { Response } from 'express';

export class HomeView {
  constructor(private response: Response) {}

  render(users: string[]): void {
    this.response.send(`
      <html>
        <head>
          <title>لیست کاربران</title>
        </head>
        <body>
          <h1>لیست کاربران</h1>
          <ul>
            ${users.map((user) => `<li>${user}</li>`).join('')}
          </ul>
        </body>
      </html>
    `);
  }
}
