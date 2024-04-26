import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { comparePassword } from 'src/utils/bcrypt';


@Injectable()
export class AuthService {
    constructor(@Inject('USER_SERVICE') private readonly userService: UsersService) {}
    async validateUser(username: string, password: string){
        const user = await this.userService.findUserByUsername(username); 
        if(user) {
            const isMatch = comparePassword(password, user.password);
            if(isMatch) {
                return user;
            }
            else return null;
        }
        else return null;
    }
}
