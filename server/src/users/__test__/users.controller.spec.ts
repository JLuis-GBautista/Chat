import { Test, TestingModule } from '@nestjs/testing';
import UsersController from '../users.controller';
import UsersService from '../users.service';
import { UsersModule } from '../users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import Users from '../entities/user.entity';
import { ConfigModule } from '@nestjs/config';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        UsersModule,
        TypeOrmModule.forFeature([Users]),
      ],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
