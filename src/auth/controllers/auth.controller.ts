import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginDto } from '../dtos/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUserId } from 'src/common/get-user-id.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authservice: AuthService) {}

    @Post('signup')
    async createUser(@Body() dto: CreateUserDto) {
        return await this.authservice.createUser(dto);
    }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        return await this.authservice.login(dto);
    }

    @Post('me')
    @UseGuards(AuthGuard())
    async authMe(@GetUserId() userId: number) {
        console.log('🚀  userId:', userId);
    }
}
