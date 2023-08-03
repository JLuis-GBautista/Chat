import { PickType } from '@nestjs/mapped-types';
import CreateUserDTO from './createUser.pipe';
import { ApiProperty } from '@nestjs/swagger';

export default class UpdateUserDTO extends PickType(CreateUserDTO, [
  'nombre',
] as const) {
  @ApiProperty()
  nombre: string;
}
