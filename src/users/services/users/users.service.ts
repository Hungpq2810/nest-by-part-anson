import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { User as UserEntity } from 'src/typeorm/User.entity';
import { CreateUserDto } from 'src/users/dtos/CreateUserDto';
import { SerializedUser } from 'src/users/types';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>){}
    private users: UserEntity[] = [];
    getUsers() {
        return this.users.map((user) => plainToClass(SerializedUser, user));
    }
    getUserByUsername(username: string) {
        return this.users.find(user => user.username === username);
    }

    getUserById(id: number) {
        return this.users.find(user => user.id === id);
    }
    createUser(data: CreateUserDto){
        const hashedPassword = encodePassword(data.password);
        const newUser = this.userRepository.create({...data, password: hashedPassword});
        return this.userRepository.save(newUser);
    }

    findUserByUsername(username: string) {
        return this.userRepository.findOne({ where: { username } });
    }

    findUserById(id: number) {
        return this.userRepository.findOne({ where: { id } });
    }

}
