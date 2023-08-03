import { Module } from '@nestjs/common';
import UsersService from './users.service';
import UsersController from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Users from './entities/user.entity';
import { TokenModule } from './auth/token.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), TokenModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, UsersModule],
})
export class UsersModule {}
