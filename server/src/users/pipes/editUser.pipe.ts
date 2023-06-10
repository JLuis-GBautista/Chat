import { PickType } from '@nestjs/mapped-types';
import CreateUserDTO from './createUser.pipe';

export default class UpdateUserDTO extends PickType(CreateUserDTO, [
  'nombre',
] as const) {}
