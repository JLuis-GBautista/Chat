import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsPositive,
} from 'class-validator';

export default class CreateChatDTO {
  @ArrayMinSize(2, {
    message: 'Cada chat debe contener 2 usuarios',
  })
  @ArrayMaxSize(2, {
    message: 'Cada chat debe contener 2 usuarios',
  })
  @ArrayUnique({
    message: 'El chat debe pertenecer a dos usuarios diferentes',
  })
  @IsPositive({
    each: true,
    message: 'Error al seleccionar un chat',
  })
  usuarios: number[];
}
