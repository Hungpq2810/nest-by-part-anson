import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "src/typeorm/User.entity";
import { UsersService } from "src/users/services/users/users.service";

export class SessionSerializer extends PassportSerializer {

    constructor(
        @Inject('USER_SERVICE') private userService: UsersService
    ) {
        super();
    }
  serializeUser(user: any, done: (err: Error, user: User) => void): any {
    done(null, user);
  }

  async deserializeUser(user: User, done: (err, user: User) => void) {
    const userDB = await this.userService.findUserById(user.id);
    if (userDB) {
      return done(null, userDB);
    }
    done(null, null);
  }
}