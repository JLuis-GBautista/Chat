import { Test, TestingModule } from '@nestjs/testing';
import UsersService from '../users.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import Users from '../entities/user.entity';
import UsersController from '../users.controller';

describe('UsersService', () => {
  let service: UsersService;

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

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
