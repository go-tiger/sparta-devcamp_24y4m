import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authservice: AuthService) {}

    @Post('signup')
    async createUser(@Body() dto: CreateUserDto) {
        return await this.authservice.createUser(dto);
    }
}
