import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async createUser(user: CreateUserDto) {
        const findUser = await this.userRepository.findOneBy({ email: user.email });

        if (findUser) {
            throw new ConflictException('이미 존재하는 회원입니다.');
        }

        user.password = await argon2.hash(user.password);

        return this.userRepository.save(user);
    }

    async login(user: LoginDto) {
        const { email, password } = user;
        const userData = await this.userRepository.findOneBy({ email });

        if (userData && (await argon2.verify(userData.password, password))) {
            const payload = { id: userData.id };
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken };
        } else {
            throw new UnauthorizedException('로그인 실패');
        }
    }
}
