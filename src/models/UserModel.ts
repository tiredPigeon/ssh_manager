export class UserModel {
    private static users: string[] = [];
  
    static getAllUsers(): string[] {
      return this.users;
    }
  
    static addUser(username: string): void {
      this.users.push(username);
    }
  }
  