import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Users from './entities/user.entity';
import { Repository } from 'typeorm';
import CreateUserDTO from './pipes/createUser.pipe';
import { compararClaves, encriptarClave } from './auth/libs/bcrypt';
import LoginUserDTO from './pipes/loginUser.pipe';
import UpdateUserDTO from './pipes/editUser.pipe';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly UsersRepository: Repository<Users>,
  ) {}
  // -------------- Servicios para controladores de usuario -------------------
  async Register(data: CreateUserDTO) {
    const usuario = data;
    const existUser = await this.UsersRepository.findOne({
      where: { correo: data.correo },
      select: ['correo'],
    });
    if (existUser)
      throw new HttpException(
        `El correo ${existUser.correo} ya esta registrado`,
        HttpStatus.CONFLICT,
      );
    const claveEncriptada = await encriptarClave(data.clave_acceso);
    usuario.clave_acceso = claveEncriptada;
    const user = this.UsersRepository.create(usuario);
    return await this.UsersRepository.save(user);
  }

  async Login(data: LoginUserDTO) {
    const usuario = await this.UsersRepository.findOne({
      where: { correo: data.correo },
    });
    if (!usuario)
      throw new HttpException('Error de credenciales', HttpStatus.CONFLICT);
    const claveVerdadera = await compararClaves(
      data.clave_acceso,
      usuario.clave_acceso,
    );
    if (claveVerdadera === false)
      throw new HttpException('Error de credenciales', HttpStatus.CONFLICT);
    return usuario;
  }

  async Session(id: number) {
    const usuario = await this.UsersRepository.findOne({
      where: { id },
    });
    if (!usuario)
      throw new HttpException('Error de sesion', HttpStatus.NOT_FOUND);
    console.log(usuario);
    usuario.foto = undefined;
    return usuario;
  }

  async UpdateUser(id: number, data: UpdateUserDTO) {
    await this.UsersRepository.update({ id }, data);
    const usuario = await this.Session(id);
    return {
      ok: true,
      usuario,
      message: 'Tu información ha sido actualizada',
    };
  }

  async DeleteUser(id: number) {
    await this.UsersRepository.delete({ id });
    return { ok: true, message: 'Tu usuario se elimino exitosamente' };
  }

  async EditImagen(idUser: number, img: Buffer) {
    await this.UsersRepository.update({ id: idUser }, { foto: img });
    const usuario = await this.Session(idUser);
    return { ok: true, usuario, message: 'Imagen guardada con exito' };
  }

  async ConnectUser(idUser: number, connect: boolean) {
    await this.UsersRepository.update({ id: idUser }, { conectado: connect });
    const usuario = await this.Session(idUser);
    return usuario;
  }
  // ------------ Servicios de usuario para otros controladores -------------------
}
