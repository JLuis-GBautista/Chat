import { OmitType } from '@nestjs/mapped-types';
import CreateUserDTO from './createUser.pipe';
import { ApiProperty } from '@nestjs/swagger';

export default class LoginUserDTO extends OmitType(CreateUserDTO, [
  'nombre',
  'fecha_nacimiento',
] as const) {
  @ApiProperty()
  correo: string;

  @ApiProperty()
  clave_acceso: string;
}
