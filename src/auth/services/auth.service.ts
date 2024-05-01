import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async createUser(user: CreateUserDto) {
        const findUser = await this.userRepository.findOneBy({ email: user.email });

        if (findUser) {
            throw new ConflictException('이미 존재하는 회원입니다.');
        }

        user.password = await argon2.hash(user.password);
        console.log('🚀  user:', user);

        return this.userRepository.save(user);
    }
}
