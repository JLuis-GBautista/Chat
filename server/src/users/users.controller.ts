import {
  Controller,
  Post,
  Body,
  HttpException,
  Res,
  Get,
  Req,
  Patch,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

import UsersService from './users.service';
import SessionTokenService from './auth/jwt/sessionToken.service';

import CreateUserDTO from './pipes/createUser.pipe';
import UpdateUserDTO from './pipes/editUser.pipe';
import LoginUserDTO from './pipes/loginUser.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('users')
export default class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly sessionTokenService: SessionTokenService,
  ) {}

  @Post('register')
  async UserRegister(
    @Body() data: CreateUserDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const usuario = await this.usersService.Register(data);
      await this.sessionTokenService.generateRefreshToken(usuario.id, res);
      return { ok: true, message: 'usuario creado exitosamente' };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('login')
  async UserLogin(
    @Body() data: LoginUserDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const usuario = await this.usersService.Login(data);
      await this.sessionTokenService.generateRefreshToken(usuario.id, res);
      return { ok: true };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  async Refresh(@Req() req: Request) {
    try {
      const usuario = req.user;
      const accessToken = await this.sessionTokenService.generateAccessToken(
        usuario['id'],
      );
      return { ok: true, accessToken, seconds: 900 };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @ApiHeader({
    name: 'authorization',
    description: 'Auth token',
  })
  @Get('session')
  @ApiResponse({ status: 200, description: 'Sesión obtenida correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async Session(@Req() req: Request) {
    try {
      return await this.usersService.Session(req.user['id']);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch('update')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async EditUser(@Req() req: Request, @Body() data: UpdateUserDTO) {
    try {
      const id = req.user['id'];
      return await this.usersService.UpdateUser(id, data);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch('imagen')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('foto'))
  async EditImage(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const id = req.user['id'];
    return this.usersService.EditImagen(id, file.buffer);
  }

  @Delete('delete')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async DeleteUser(@Req() req: Request) {
    try {
      return await this.usersService.DeleteUser(req.user['id']);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('close')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  Logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refresh_token');
    return { ok: true, message: 'Sesion terminada' };
  }
}
