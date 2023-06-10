import { OmitType } from '@nestjs/mapped-types';
import CreateUserDTO from './createUser.pipe';

export default class LoginUserDTO extends OmitType(CreateUserDTO, [
  'nombre',
  'fecha_nacimiento',
] as const) {}
