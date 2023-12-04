/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from './user/user';

@Injectable()
export class UserService {

    private users: User[] = [
        new User(1, "admin", "admin", ["admin"]),
        new User(2, "userread", "admin", ["read_only"]),
        new User(3, "userrecetaread", "admin", ["receta_read_only"]),
        new User(4, "userwrite", "admin", ["write_only"]),
        new User(5, "userdelete", "admin", ["delete_only"]),
    ];
 
    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
