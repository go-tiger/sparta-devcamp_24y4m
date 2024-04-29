import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
    imports: [TypeOrmModule],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [],
})
export class AuthModule {}
